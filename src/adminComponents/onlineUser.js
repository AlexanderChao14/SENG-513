import React, { useEffect, useState, } from 'react';
import axios from 'axios';


function OnlineUsers(){

    



    const url = "https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/getonlineuser"
    const [product, setProduct] = useState(null);

    let content = null;
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setProduct(response.data)
        })
    } , [url])

  

    if(product){
        return (
            <div>
                <h1>Online Users</h1>
                <table className ="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>

                       
                    </tr>
                </thead>
                <tbody>
                    
                    {product.body.map(user => (
                    <tr>
                        <th scope="row" style={{backgroundColor: "whitesmoke"}} key={user.firstName}>{user.firstName}</th>
                        <td key={user.lastName}>{user.lastName}</td>
                        <td key={user.email}>{user.email}</td>
                        <td key={user.role}>{user.role}</td>

                        
                    </tr>
                        ))
                    }
                    
   

                </tbody>


                </table>



            </div>
        )
    }

    return (

        <div>
            {content}
        </div>
    )
       

}

export default OnlineUsers;