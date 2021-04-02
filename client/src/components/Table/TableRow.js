import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import {findState} from "../../utils/usStates";
import "./Table.css"
import {re} from "../../utils/regex";

const TableRow = props => {
    const {columns, index, row} = props;

    function validateCell(fieldtype, cell, cb){
        switch (fieldtype){
            case "Phone":
                return cb(true, cell);
                break;
            case "Email":
                return re.test(cell.toLowerCase()) ?  cb(true, cell) :  cb(false, cell);
                break;
            case "Age":
                if (!isNaN(Number.parseInt(cell)) && cell >= 21){
                    return cb(true, cell);
                } else {
                    return cb(false, cell);
                }
                break;
            case "Experience":
                if (!isNaN(Number.parseInt(cell)) && cell >= 0 && cell < row.age){
                    return cb(true, cell);
                }else {
                     return cb(false, cell);
                }
                break;
            case "Yearly Income":
                if (!isNaN(Number.parseFloat(cell)) && cell >= 0 && cell < 1000000){
                    return cb(true, Number.parseFloat(cell).toFixed(2));
                }else {
                    return cb(false, Number.parseFloat(cell).toFixed(2));
                }
                break;
            case "Has children":
                if (cell === "TRUE" || cell === "FALSE"){
                    return cb(true, cell);
                }else if(cell === undefined || cell === ""){
                    return cb(false, cell);
                }
                break;
            case "License states":
                const states = cell.trim().split("|");
                const filteredStates = states.map(state=> {
                    return findState(state);
                })
                if (filteredStates.length > 0){
                    return cb(true, filteredStates.join(" | "));
                } else {
                    return cb(false, filteredStates.join(""));
                }
                break;
            case "Expiration date":
                if (moment(cell, "YYYY-MM-DD",true).isValid() || moment(cell, "MM/DD/YYYY",true).isValid()){
                    return cb(true, cell);
                } else {
                    return cb(false, cell);
                }
                break;
            case "License number":
                if (cell.length === 6){
                    return cb(true, cell);
                } else {
                    return cb(false, cell);
                }
                break;
            default: return cb(true, cell);
                break;
        }
    }



    function renderRow(){
        return columns.map( c=> validateCell(c,row[c], (predicate, value)=>(<td className={predicate ? "cell" : "cell-error"}>{value}</td>)));
    }

    return (
        <tr key={index}>
            <th>{index + 1}</th>
            {renderRow()}
        </tr>
    );
};

TableRow.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    index: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired
};

export default TableRow;