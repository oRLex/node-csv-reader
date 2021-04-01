import React, {useEffect, useState} from 'react';
import "./Alert.css"

const Alert = ({message}) => {
    const [toggle, setToggle] = useState(false);


    function handleToggle() {
        setToggle(false)
    }


    useEffect(()=> {
        let timeout;

        if (message){
            setToggle(true);
            timeout = setTimeout(()=> {
                setToggle(false)
            },5000)
        }
        return ()=> clearTimeout(timeout)
    }, [message])

    return (
        <>
            {toggle && <div className="alert">
                <span className="closebtn" onClick={handleToggle}>&times;</span>
                <strong>Error!</strong> <span>{message}</span>
            </div>}
        </>

    );
};

export default Alert;