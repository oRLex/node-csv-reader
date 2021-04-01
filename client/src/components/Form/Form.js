import React, {useRef, useState} from 'react';
import Alert from "../Alert/Alert";
import {sendFile} from "../../utils/fetchToServer";
import "./Form.css"
import Button from "../Button/Button";

const Form = ({handleData}) => {
    const [errors, setErrors] = useState(null);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState("")
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFilename(file.name);
        if (file.name.includes(".csv") || file.type === "text/csv"){
            setFile(file);
        } else {
            setErrors("Can not read a non-csv file! Please upload a csv file")
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (file){
            const formData = new FormData();
            formData.append("csvfile", file);
            const response = await sendFile(formData)
            if (response.success){
                handleData(response.data.result)
            } else {
                setErrors(response.error)
            }
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form__file">
                <Button handleClick={() => fileInput.current.click()} text={"choose a file"} />
                <span>{filename? filename: "No file"}</span>
                <input className="form__input" type="file" name="file" ref={fileInput} onChange={handleFileInput}/>
            </div>
                <Button text={"send"}/>

            <Alert message={errors}/>
        </form>
    );
};

export default Form;