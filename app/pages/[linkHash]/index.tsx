import { useEffect, FC } from "react";
import { GetServerSideProps } from "next";
import { BlockedMessage } from "../../components/BlockedMessage";

interface Props {
    path: string | null;
    uuid: string | null;
    isBlocked?: boolean;
}

const LinkHashPage:FC<Props> = ({ path, isBlocked, uuid }) => {

    useEffect(() => {
        if(window && path && !isBlocked) {
            window.location.href = path;
            // add cookie 
            window.document.cookie = `uuid=${uuid};`;
        }
    }, [isBlocked, path, uuid]);

    if(isBlocked) {
        return <BlockedMessage />
    }

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
                isBlocked: data.isBlocked ?? false,
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