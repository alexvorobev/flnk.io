import { useEffect, FC } from "react";
import { GetServerSideProps } from "next";

interface Props {
    path: string | null;
}

const LinkHashPage:FC<Props> = ({ path }) => {

    useEffect(() => {
        if(window && path) {
            window.location.href = path;
        }
    }, [path]);

    return <>
        {path}
    </>;
};

export const getServerSideProps:GetServerSideProps = async (context) => {
    const { req, query } = context;
    const { linkHash } = query;
    const host = req.headers.host;

    const result = await fetch(`http://${host}/api`, {
        method: 'POST',
        body: JSON.stringify({ hash: linkHash, headers: req.headers, cookies: req.cookies}),
    });
    
    return result.json().then((data) => {
        console.log({data});

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