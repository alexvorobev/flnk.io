import { useEffect, FC } from "react";
import { GetServerSideProps } from "next";
import { UAParser } from 'ua-parser-js';
import { lookup } from 'geoip-lite';

interface Props {
    path: string | null;
}

const LinkHashPage:FC<Props> = ({ path }) => {

    useEffect(() => {
        if(window && path) {
            window.location.href = path;
        }
    }, [path]);

    return null;
};

export const getServerSideProps:GetServerSideProps = async (context) => {
    const { req, query } = context;
    const userAgent = req.headers["user-agent"];
    const userAddress = req.socket.remoteAddress
    let parser = new UAParser(userAgent);
    const parserResults = parser.getResult();
    const { linkHash } = query;
    const host = req.headers.host;
    console.log({...parserResults, userAddress, location: lookup(userAddress ?? '')});

    const result = await fetch(`http://${process.env.API_URL}/api`, {
        method: 'POST',
        body: JSON.stringify({ hash: linkHash, headers: req.headers, cookies: req.cookies}),
    });

    return result.json().then((data) => {
        return {
            props: {
                path: data.path ?? null,
            }
        }
    }).catch(() => {
        return {
            props: {
                path: null,
            }
        }
    });
}

export default LinkHashPage;