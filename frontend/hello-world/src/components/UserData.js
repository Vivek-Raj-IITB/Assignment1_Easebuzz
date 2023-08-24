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
                        </tr>
                    )
                })
            }
        </>
    )
}
export default UserData;