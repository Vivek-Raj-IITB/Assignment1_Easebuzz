// import logo from './logo.svg';
import './App.css';
// import Greet from './components/Greet';
// import axios from 'axios'
import swal from 'sweetalert'
import {Button, Table, Form, Input } from "antd"
import "antd/dist/reset.css";

// import {Button, Table, Form, Input } from "antd"
import React, { useEffect, useState } from 'react';
// import UserData from './components/UserData';
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import { Download_and_save } from './components/Download_and_save';
// import { download_and_save } from "./components/download_and_save";

const API  = "http://127.0.0.1:8000/api/"
// import { useState } from "react/cjs/react.development";


const App = () => {
  const [dataSource, setUsers] = useState([]);
  const [dataSourceCur, setUsersCurrentValue ] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();  
  
  // delete funtion starts
  const deleteRecord = (curUser) => {
    // console.log(curUser.code + " here we are logging");

    swal({
        title: "Confirm",
        text: "Are you sure you want to delete : " + curUser.name,
        icon: "info",
        buttons: ['CANCEL','CONFIRM',],
        dangerMode: true,
      })
      .then(function(result){
        if(result){
            try{
                fetch(`http://127.0.0.1:8000/api/${curUser.code}`,{method:'DELETE'}).then((result)=>{
                fetchUsers(API);
                swal({
                    title: "Deleted",
                    text: curUser.name+" is deleted from the record",
                    icon: "info",
                    dangerMode: true,
                });
                
                // window.location.reload();
                    
                });
                
               
            }catch(e){
                console.error(e)
            }
        }
      });

    }

  // delete funtion ends
  //update starts
  const onFinish = (values) => {
    // console.log(values, " here we are printing values updated");
    // let resStatus;
    const API1  = "http://127.0.0.1:8000/api/"
    console.log(values.code, "checing the code of upating");
    // fetch(API1+values.code+'/')
    // .then(response=>{ localStorage.setItem('storedData',response.status)});
    
    // let resStatus = localStorage.getItem('storedData');
    let present = false;

    for(let x in dataSource){
      if(dataSource[x].code===values.code){
        present=true;
      }
    }
    console.log(present," hohohohohohoho");
    if(present){ 
      // console.log(resStatus, " hihihihihihih");
      fetch(API1+values.code+'/',{
        method:'PUT',
        body:JSON.stringify(values),
        headers:{
          'Content-type':'application/json; charset=UTF-8',
        },
      })
      .then(response=>{
        response.json()
        // console.log(response,"check")
        if(response.status === 200){
          fetchUsers(API);
            swal({
              title: "Updated",
              text: values.code+" is updated in the record",
              icon: "info",
              dangerMode: true,
          });
        }
      });
    }
    else{
      fetch('http://127.0.0.1:8000/api/',{
        method:'POST',
        body:JSON.stringify( values),
        headers:{
          'Content-type':'application/json; charset=UTF-8',
        },
      })
      .then(response=>{
        response.json()
        if(response.status===200){
      fetchUsers(API);
        swal({
          title: "Added a new",
          text: values.code+" is added in the record",
          icon: "info",
          dangerMode: true,
      });
    }
    });
    }
      
      setEditingRow(null);
    //   }
    //   catch(e){
    //     alert("Given Code already exits");
    //     console.error(e, "here is the error");
    // }
    // this.setState({
    //   code:'',
    //   name:'',
    //   open:'',
    //   high:'',
    //   low:'',
    //   close:''
    // });
    // window.location.reload();
    
    

  };
  // ant end

  //updateends
  const fetchUsers =  async(url) => {
    try{
      const res  = await fetch(url);

      // console.log(res.status, "hwre is startus")
      const data = await res.json();
      // console.log("data: ",data, "type of data: ",typeof(data), data.length)
      if(data.length >  0){
        setUsers(data);
        setUsersCurrentValue(data);
      }
      // console.log(data);

    }catch(e){
      console.error(e)
    }
    ////////////////////////////
    //   try{
    //     fetch(url,{method:'GET'}).then((result)=>{
    //       console.log(result.body, "lolololololololoqwqeq");
    //     setUsers(result);
    //     setUsersCurrentValue(results);
       
            
    //     });
        
      
    // }catch(e){
    //     console.error(e)
    // }
    
  }

  useEffect(()=>{fetchUsers(API);
  }, [])
  //antd  start
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      render: (text, record) => {
        if (editingRow === record.code) {
          return (
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please enter the code",
                },
              ]}
            >
            <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.code) {
          return (
            <Form.Item name="name">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Open",
      dataIndex: "open",
      render: (text, record) => {
        if (editingRow === record.code) {
          return (
            <Form.Item name="open">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "High",
      dataIndex: "high",
      render: (text, record) => {
        if (editingRow === record.code) {
          return (
            <Form.Item name="high">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Low",
      dataIndex: "low",
      render: (text, record) => {
        if (editingRow === record.code) {
          return (
            <Form.Item name="low">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Close",
      dataIndex: "close",
      render: (text, record) => {
        if (editingRow === record.code) {
          return (
            <Form.Item name="close">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        // console.log(record);
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.code);
                form.setFieldsValue({
                  name: record.name,
                  code: record.code,
                  open: record.open,
                  high: record.high,
                  low: record.low,
                  close:record.close,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
            <Button type="link" onClick={() => deleteRecord(record)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  
  

  const [results, setResults] = useState([]);
  // if(results.length<=0)fetchUsers(API);
  return <>
  <center> <h1>Bhav of Previous business Day</h1> </center>
  {/* <div><Button  onClick={() => FETCH_AND_SAVE(API)}>Download_todays_bhav</Button></div> */}
  <div >
    <div className='fetchandsave'> 
    {<Download_and_save url={API}/>}
    </div>
  </div>
  {/* // here search bar */}
  <div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} users={dataSource} setUsers={setUsers} setUsersCurrentValue={setUsersCurrentValue}/>
        {results && results.length > 0 && <SearchResultsList results={results}/>}
        {/* {<Download_and_save/>} */}
      </div>
    </div>
    {/* // here end the search bar */}
    <div className="App">
    <header className="App-header">
        <Form form={form} onFinish={onFinish}>
        <Table columns={columns} dataSource={dataSourceCur}></Table>
        </Form>
      </header>
      </div>
  </>
}

export default App;
