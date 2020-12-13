import React from 'react';
import Table from 'react-bootstrap/Table';

export default class RankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerID: props.playerID,
      RankList: [],
    };
    // this.getRanks = this.getRanks.bind(this);
    // this.setState({ RankList: this.getRanks()});
  }

  static getDerivedStateFromProps(props, state) {
    return {
    };
  }

  componentDidMount() {

    fetch("https://zy86pq19vd.execute-api.us-east-1.amazonaws.com/dev/ranking", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    })
      .then(response => response.json())
      .then((res) => {
        console.log("Response", res);

        if (res?.statusCode === 200) {
          console.log(res);
          console.log(res.body.rankinglist)
          this.setState({ RankList: res.body.rankinglist });
        }
        else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log("###error: ", err);
        //addNotification("###error: ",err);
      });
  }



  render() {

    return (
      <div>
        <Table striped bordered hover key="ranktable">
          <thead key="thead1">
            <tr key="headers">
              <td key="winCount"># of Wins</td>
              <td key="username">Name</td>
            </tr>
          </thead>
          <tbody key="tbody">
            {this.state.RankList.map((element) => {
              let style = 'normal'
              if (element.userID === this.state.playerID) {
                style='bold'
              }
              return (
                <tr key={element.userID} style={{'fontWeight':style}}>
                  <td key='1'>
                    {element.wins}
                  </td>
                  <td key='2'>
                    {element.firstName}
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}