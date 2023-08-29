import swal from 'sweetalert'
// import App from '../App';
import "./UserData.css"

const deleteRecord = ({curUser}) => {
    console.log(curUser.code);

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
                fetch(`http://127.0.0.1:8000/${curUser.code}`,{method:'DELETE'}).then((result)=>{
                    window.location.reload();
                    swal({
                        title: "Deleted",
                        text: curUser.name+" is deleted from the record",
                        icon: "info",
                        dangerMode: true,
                    });

                });
            }catch(e){
                console.error(e)
            }
        }
      });

}
const updateRecord = ({curUser}) => {
    console.log(curUser.code);

    swal({
        title: "Confirm",
        text: "Are you sure you want to delete : " + curUser.name,
        icon: "info",
        buttons: ['CANCEL','CONFIRM',],
        dangerMode: true,
      })
      .then(function(result){
        try{
            fetch(`http://127.0.0.1:8000/${curUser.code}`,{method:'DELETE'}).then((result)=>{
                window.location.reload();
                swal({
                    title: "Deleted",
                    text: curUser.name+" is deleted from the record",
                    icon: "info",
                    dangerMode: true,
                  });

            });
        }catch(e){
            console.error(e)
        }
      });

}

const UserData = ({users}) => {

    return (
        <>
            {
                users.map((curUser) => {
                    const {code, name, open, high, low, close} = curUser;
                    return(
                        <tr key = {code}>
                            <td>{code}</td>
                            <td>{name}</td>
                            <td>{open}</td>
                            <td>{high}</td>
                            <td>{low}</td>
                            <td>{close}</td>
                            <td>
                               
            
                            <button class="btn" onClick={() => deleteRecord({curUser})}>Delete</button>
                            <button class="btn" onClick={() => updateRecord({curUser})}>Update</button>
                            
                           


                            </td>
                            
                        </tr>
                    )
                })
            }
        </>
    )
}
export default UserData;