import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults ,users} ) => {
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
      // });
  };  
  const handleChange = (value) => {
    
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