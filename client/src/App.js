import React, {useState} from 'react';
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";


 const App = () => {
     const [data, setData] = useState([]);
     function handleData(data) {
         setData(data)
     }
     return (
       <>
           <Form handleData={(data)=> handleData(data)}/>
           <Table data={data}/>
       </>
   );
 };

 export default App;

