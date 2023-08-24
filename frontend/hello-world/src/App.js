// import logo from './logo.svg';
import './App.css';
// import Greet from './components/Greet';
// import axios from 'axios'
import React, { useEffect, useState } from 'react';
import UserData from './components/UserData';

const API  = "http://127.0.0.1:8000/"







const App = () => {
  const [users, setUsers] = useState([]);

 

  const fetchUsers = async (url) => {
    try{
      const res  = await fetch(url);
      const data = await res.json();
      // if(data.lenght >  0){
        setUsers(data);
      // }
      console.log(data);
    }catch(e){
      console.error(e)
    }
  }

  useEffect(()=>{fetchUsers(API);
  }, [])
  // console.log("how ar eo y ", users);
 
    
  return <>
  <center>
  <h1>Bhav of Previous business Day</h1>
  </center>
    <table>
      <thead>
        <tr>
        <th>CODE</th>
        <th>NAME</th>
        <th>OPEN</th>
        <th>HIGH</th>
        <th>LOW</th>
        <th>CLOSE</th>
        </tr>
      </thead>
      <tbody>
        <UserData users = {users}/>
      </tbody>
    </table>
  </>
}

export default App;



// import Welcome from './components/Welcome';


// class App extends React.Component{
//     state = { details: [],}

//     componentDidMount(){
//       let data;
//       axios.get('http://127.0.0.1:8000/')
//       .then(res => {
//         data = res.data;
//         this.setState({
//           details : data
//         });
//       })
//       .catch(err => {"error occuured"})

//     }
//     render(){
//       return (
//         <div>
//         <header>Data from django backend</header>
//         <hr></hr>
//         {this.state.details.map((output,id)=>(
//           <div key  = {id}>
//             <div>
//             <h3>{output.code}</h3>
//             <h3>{output.name}</h3>
//             <h3>{output.open}</h3>
//             <h3>{output.high}</h3>
//             <h3>{output.low}</h3>
//             <h3>{output.close}</h3>
//             <hr></hr>
//             </div>
//           </div>
//         ))}
//         </div>

//       )
//     }
  
// }


// export default App;