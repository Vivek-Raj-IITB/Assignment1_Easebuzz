// import logo from './logo.svg';
import './App.css';
// import Greet from './components/Greet';
// import axios from 'axios'
import React, { useEffect, useState } from 'react';
import UserData from './components/UserData';
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

const API  = "http://127.0.0.1:8000/"


const App = () => {
  const [users, setUsers] = useState([]);

 

  const fetchUsers = async (url) => {
    try{
      const res  = await fetch(url);
      // console.log("res: ",res, "type of res: ",typeof(res))
      const data = await res.json();
      // console.log("data: ",data, "type of data: ",typeof(data), data.length)
      if(data.length >  0){
        setUsers(data);
      }
      console.log(data);
    }catch(e){
      console.error(e)
    }
  }

  useEffect(()=>{fetchUsers(API);
  }, [])
  // console.log("how ar eo y ", users);
 
  const [results, setResults] = useState([]);
  return <>
  <center> <h1>Bhav of Previous business Day</h1> </center>
  {/* // here search bar */}
  <div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} users={users} />
        {/* <SearchBar/> */}
        {results && results.length > 0 && <SearchResultsList results={results}/>}
      </div>
    </div>
    {/* // here end the search bar */}
    <table>
      <thead>
        <tr>
        <th>CODE</th>
        <th>NAME</th>
        <th>OPEN</th>
        <th>HIGH</th>
        <th>LOW</th>
        <th>CLOSE</th>
        <th>DELETE?</th>
        </tr>
      </thead>
      <tbody>
        <UserData users = {users}/>
      </tbody>
    </table>
  </>
}

export default App;
