
import { Button } from "antd";
import "./download_and_save.css";
import swal from 'sweetalert'
const API = "http://127.0.0.1:8000/api/fetch_and_save/"

export const Download_and_save= ({url}) => {

    const fetch_and_save_fun= (value) => {


    
      const res  =  fetch(API);
      //  console.log(res.status, "hwre is startus")
      
        if(res.status===200){
          swal({
            title: "Added a new",
            icon: "info",
            dangerMode: true,
          });
        }
        // console.log(res);
    };
    return (
        
      <div>
        {/* <h1>Hello</h1> */}
        <Button class = "fetchandsavebutton" type="link" onClick={() => fetch_and_save_fun(API)}>
         Download_todays_bhav
        </Button>
      </div>
    );
  };