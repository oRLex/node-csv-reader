import React, {useState} from 'react';
import PropTypes from 'prop-types';
import "./Table.css"
import TableRow from "./TableRow";
import Button from "../Button/Button";

const Table = ({data}) => {
    /*
       Constants for the first three columns of the table
    */
    const FULL_NAME = data[0] && Object.keys(data[0])[0];
    const AGE = data[0] && Object.keys(data[0])[1];
    const PHONE_NUMBER = data[0] && Object.keys(data[0])[2];

    const columns = data[0] && Object.keys(data[0]);

    const [isAll, setShowAll] = useState(false);

    function renderHead() {
        const modifiedcolumns = ["ID", ...columns, "Duplicate width"];
        return modifiedcolumns.map((h) => <th>{h}</th>)
    }

    function renderAll() {
        const result = [...data.reduce((mp, obj) => {
            const key = JSON.stringify([obj[FULL_NAME], obj[AGE], obj[PHONE_NUMBER]].map(item => item.toLowerCase()));
            if (!mp.has(key)) {
                mp.set(key, {...obj, count: 0});
            } else {
                mp.get(key).count++;
            }
            return mp;
        }, new Map).values()];

        return result.map((row, index) => (<TableRow row={row} key={index} index={index} columns={columns}/>));
    }


    function renderHide() {
        const result = data.reduce((filteredArr = [], obj) => {
            let bool = false;
            filteredArr.forEach((a) => {
                if (a[FULL_NAME] === obj[FULL_NAME] && a[AGE] === obj[AGE] && a[PHONE_NUMBER] === obj[PHONE_NUMBER]) {
                    a.count++;
                    const nEl = {...a}
                    filteredArr.push(nEl)
                    bool = true;
                }
            });
            if (!bool) {
                obj.count = 0;
                filteredArr.push(obj);
            }
            return filteredArr;
        }, []);

        return result.map((row, index) => (<TableRow row={row} key={index} index={index} columns={columns}/>));
    }

    return (
        <div className="wrap">
            {
                data[0] &&
                <div className="">
                    <Button handleClick={()=> setShowAll(!isAll)} text={isAll ? "show all": "collapse"}/>
                </div>
            }

            <div className="table-wrap">
                <table className="main-table">
                    <thead>
                    <tr>
                        {data[0] && renderHead()}
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        {data[0] && renderHead()}
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        isAll ? renderAll() : renderHide()
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Table.propTypes = {
    data: PropTypes.array
};

Table.defaultProps = {
    data: []
}


export default Table;