import { useEffect } from "react";

const LinkHashPage = () => {

    useEffect(() => {
        if(window) {
            console.log(window.navigator)
        }
    }, [])

};

export default LinkHashPage;