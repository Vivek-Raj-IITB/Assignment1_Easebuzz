import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults ,users, setUsersCurrentValue} ) => {
  const [input, setInput] = useState("");
  
  const fetchData = (value) => {
    // fetch("http://127.0.0.1:8000/")
    //   .then((response) => response.json())
    //   .then((json) => {
      //here "users" is a json list we gettinh from app.js which have list of every record or we can fetch again with the commented code
        const results = users.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        setUsersCurrentValue(results);
        if(value.length<=0)setUsersCurrentValue(users);
        // if(value.length===0){
          // console.log(value.length+" here  and there xoxo");
          // setUsers(users);
        // }
      // });
  };  
  const handleChange = (value) => {
    
    // setUsers(users);
    setInput(value);
    fetchData(value.toLowerCase());
  };

  return (
    <center><div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
    </center>
  );
};