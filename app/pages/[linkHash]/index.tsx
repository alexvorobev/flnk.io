import { useEffect, FC } from "react";
import { GetServerSideProps } from "next";
import { UAParser } from 'ua-parser-js';
import { lookup } from 'geoip-lite';

interface Props {
    path: string | null;
    uuid: string | null;
}

const LinkHashPage:FC<Props> = ({ path, uuid }) => {

    useEffect(() => {
        if(window && path) {
            window.location.href = path;
        }
        // add cookie 
        window.document.cookie = `uuid=${uuid};`;
    }, [path, uuid]);

    return null;
};

export const getServerSideProps:GetServerSideProps = async (context) => {
    const { req, query } = context;
    const userAgent = req.headers["user-agent"];
    const userAddress = req.socket.remoteAddress;
    const { linkHash } = query;
    const host = req.headers.host;

    const linkData = await fetch(`http://${host}/api`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
            hash: linkHash,
            userAgent,
            cookies: req.cookies,
            address: userAddress,
        })
    });

    return linkData.json().then((data) => {
        return {
            props: {
                path: data.path ?? null,
                uuid: data.uuid ?? null,
            }
        }
    }).catch(() => {
        return {
            props: {
                path: null,
                uuid: null,
            }
        }
    });
}

export default LinkHashPage;