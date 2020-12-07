import React, {Component } from "react";

class onlineUsers extends Component {



  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }


  componentDidMount() {
    fetch('https://01vablvh7h.execute-api.us-east-1.amazonaws.com/dev/getonlineuser')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,   })
          console.log(json);
      });
  }

  render() {
    var {isLoaded, items} = this.state;

    if(!isLoaded){
      return <div>Loading...</div>
    }
    else{
      return (
        
      <div class ="contatainer">
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

export default onlineUsers;
