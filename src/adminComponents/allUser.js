import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import "./adminstyle.css";
import { Alert } from 'react-bootstrap';






function AllUsers(){


    
    function deactivateUser(email,){
       


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
                    fetchData();
                  
                  
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
                        fetchData();
                        
                        
                    })
                    .catch((err) => {
                        console.log("###error: ",err);
                        
                    });
        
                }
            
        let content = null;        
        const [data, setData] = useState(null);

        const fetchData = () => {
            fetch("https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/getallregistereduser")
                .then(res => res.json())
                .then(json => setData(json));
        }
    
        useEffect(() => {
            fetchData();
        }, []);
    
    function logout(){
        sessionStorage.clear();
    }
  

    if(data){
        
        return (
            <div>
                
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" >ADMIN</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              
      
            </ul>
            <span className="navbar-text">
              
            <ul className="navbar-nav mr-auto">
              
                <li className="nav-item">
                    <a className="nav-link"href="" onClick={logout}>Log out</a>
                  </li>
            </ul>
            </span>
         
          </div>
        </nav>
        <div id="alluserarea">
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
                    
                    {data.body.map(user => {
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
                    
                    if (user.adminVerified === true){
                        return(
                            <tr>
                                        <th scope="row" style={{backgroundColor: "whitesmoke"}} key={user.firstName}>{user.firstName}</th>
                                        <td key={user.lastName}>{user.lastName}</td>
                                        <td key={user.email}>{user.email}</td>
                                        <td key={user.role}>{user.role}</td>
                                        <td><button onClick= {() => deactivateUser(user.email)} style={{color: "green"}} >Active</button></td>
                                        <td><button onClick= {() => deleteUser(user.email)} style={{color: "red"}} >Delete</button></td>
                                    </tr>
                                )
                            }
                            else {
                                return(
                                    <tr>
                                        <th scope="row" style={{backgroundColor: "whitesmoke"}} key={user.firstName}>{user.firstName}</th>
                                        <td key={user.lastName}>{user.lastName}</td>
                                        <td key={user.email}>{user.email}</td>
                                        <td key={user.role}>{user.role}</td>
                                    <td><button onClick= {() => deactivateUser(user.email)} style={{color: "red"}} >Unactive{user.adminVerified}</button></td>
                                        <td><button onClick= {() => deleteUser(user.email)} style={{color: "red"}} >Delete</button></td>
                                    </tr>
                                )
                            }
                            
                        })}
                    
                </tbody>
                </table>
                        </div>
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