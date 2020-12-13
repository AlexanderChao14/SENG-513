import React, { useEffect, useState, } from 'react';
import axios from 'axios';






function AllUsers(){


    function deactivateUser(email){
        console.log("deactivating " + email);
        let input = {email:email};
        
          
      
          console.log("input: ", input);
          fetch("https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/deactiveuser", {
              body: JSON.stringify(input),
              headers: {
                  "Content-Type": "application/json"
              },
              method: "PUT",
              })
              .then(response => response.json())
              .then((res) => {
                  console.log("Response", res);
                  
            
                  if(res?.statusCode ===200) {
                    
                   
                  }
                  
                  
              })
              .catch((err) => {
                  console.log("###error: ",err);
                  
              });
    
            }

    function deleteUser(email) {
            console.log("deleted " + email);
            let input = {email:email};
        
                console.log("input: ", input);
                fetch("https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/deleteuser", {
                    body: JSON.stringify(input),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    })
                    .then(response => response.json())
                    .then((res) => {
                        console.log("Response", res);
                        
                
                        if(res?.statusCode ===200) {
                        
                        
                        }
                        
                        
                    })
                    .catch((err) => {
                        console.log("###error: ",err);
                        
                    });
        
                }
            

    const url = "https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/getallregistereduser"
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
                <h1>All Users</h1>
                <table className ="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {product.body.map(user => {
                        if (user.role ==="Admin") {
                            return(
                                <tr>
                                    <th scope="row" style={{backgroundColor: "whitesmoke"}} key={user.firstName}>{user.firstName}</th>
                                    <td key={user.lastName}>{user.lastName}</td>
                                    <td key={user.email}>{user.email}</td>
                                    <td key={user.role}>{user.role}</td>
                                    
                                </tr>
                        
                            )
                        }

                        else{
                            return(
                                    <tr>
                                        <th scope="row" style={{backgroundColor: "whitesmoke"}} key={user.firstName}>{user.firstName}</th>
                                        <td key={user.lastName}>{user.lastName}</td>
                                        <td key={user.email}>{user.email}</td>
                                        <td key={user.role}>{user.role}</td>
                                        <td><button onClick= {() => deactivateUser(user.email)} style={{color: "red"}} >Active/Deactive</button></td>
                                        <td><button onClick= {() => deleteUser(user.email)} style={{color: "red"}} >Delete</button></td>
                                    </tr>
                                )
                            }
                    
                        })}
                    
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

export default AllUsers;