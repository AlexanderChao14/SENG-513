import React, {Component } from 'react'


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      items: [],
      items2: [],
      isLoaded: false,
    }
  }

  /*
 deleteUser(email){
   fetch('https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/deleteuser'+email,{
   })
 }
  */


  componentDidMount() {
    fetch('https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/getallregistereduser')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,   })
          console.log(json);
      });


      fetch('https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/getonlineuser')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items2: json,   })
          console.log(json);
      });


  }


  //deactive
  //active on press
  deactivateUser(email){
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
  

  deleteUser(email) {
    console.log("deleted " + email);
    let input = {email:email};

      console.log("input: ", input);
      fetch("https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/deleteuser", {
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


  render() {
    var {isLoaded, items, items2} = this.state;

    if(!isLoaded){
      return <div>Loading...</div>
    }
    else{
      return (
        
      <div class ="contatainer">
        <div id = "allUsers">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

            {items.body.map(row => {
              if (row.role === 'Admin'){
                return (
            
                  <tr>
                      <th scope="row" style={{backgroundColor: "whitesmoke"}} key={row.firstName}>{row.firstName}</th>
                      <td style={{backgroundColor: "whitesmoke"}} >{row.lastName}</td>
                      <td style={{backgroundColor: "whitesmoke"}} >{row.email}</td>
                      <td style={{backgroundColor: "whitesmoke"}} >{row.role}</td>
                  </tr>
                  );

              }
              else {
        return (
            
            <tr>
                <th scope="row" style={{backgroundColor: "whitesmoke"}} key={row.firstName}>{row.firstName}</th>
                <td style={{backgroundColor: "whitesmoke"}} >{row.lastName}</td>
                <td style={{backgroundColor: "whitesmoke"}} >{row.email}</td>
                <td style={{backgroundColor: "whitesmoke"}} >{row.role}</td>
                <button onClick={() => this.deactivateUser(row.email)} style={{color: "red"}} >Deactive</button>
                <button onClick={() => this.deleteUser(row.email)}>Delete</button>
            </tr>
            );
        }
          })}       

              </tbody>
          </table>
        </div>
        <h1>Online Users</h1>

        <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>

            {items.body.map(row => {
        return (
            <tr>
                <th scope="row" style={{backgroundColor: "whitesmoke"}} key={row.firstName}>{row.firstName}</th>
                <td style={{backgroundColor: "whitesmoke"}} >{row.lastName}</td>
                <td style={{backgroundColor: "whitesmoke"}} >{row.email}</td>
                <td style={{backgroundColor: "whitesmoke"}} >{row.role}</td>
            </tr>
            );
          })}       

              </tbody>
          </table>

        


        










        </div>
      )
    }

  }
}

export default App;



/*

<div>
<ul>
  {items.body.map(item =>
    <li key={item.firstName}>{item.firstName}</li>)}
</ul>
</div>
*/