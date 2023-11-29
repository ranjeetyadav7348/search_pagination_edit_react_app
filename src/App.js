
import axios from 'axios'
import {useEffect ,useState} from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory ,{Type, type} from "react-bootstrap-table2-editor"
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter'

function App() {

  const [data,setData]=useState([]);
  useEffect(()=>{
    getData();
  },[]);
  const getData=()=>{
    axios("https://jsonplaceholder.typicode.com/comments").then((res)=>
    setData(res.data)
    //console.log(res.data)
    );
   
  };
  const emailFormatter=(data,row)=>{
    return <span>Email={data}</span>
    // return <span onClick={()=>alert("you just clicked")}>Email={data}</span>
  }
 const selectRow={
  mode:"checkbox",
  clickToSelect:true,
 // selected:[1,3],
  clickToEdit:true,

 }




  const columns=[
    {
      dataField:"email",
      text:"Email",
      sort:true,
      formatter:emailFormatter,
      filter:textFilter()
    },
    {
      dataField:"postId",
      text:"Product ID",
      sort:true,
      validator:(newValue,row,columns)=>{
        if(isNaN(newValue))
        {
          return{
            valid:false,
            message:"please fill the number only"
          }
        }
        return true;
      }
    },
    {
      dataField:"name",
      text:"Name",
      sort:true,
      editable:false,
     
    },
    {
      dataField:"dropdown",
      text:"Dropdown",
      editor: {
        type: Type.SELECT,
        options:[{
          value:"A",
          label:"A"
        },
        {
          value:"A",
          label:"A"
        }
      
      ],

      }
    }
  ]
  return (
    <div className="App">
     <BootstrapTable keyField="id" data={data} columns={columns}
      striped
      hover
      condensed
      pagination={paginationFactory()}
      cellEdit={cellEditFactory({
        mode:"click",
        blurTosave: true,
        nonEditableRows:()=>[1,2,3]
      })}
      selectRow={selectRow}
      filter={filterFactory()}
     />
    </div>
  );
}

export default App;
