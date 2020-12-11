import React from "react"
import Login from "./login"
import Shipselector from "./ShipSelection/ShipSelector"
import PlayerGrid from "./PlayerGrid/PlayerGrid"
import EnemyGrid from "./EnemyGrid/enemyGrid"
import RankList from "./RankList/RankList"


export default class controller extends React.Component {
    constructor() {
        super();
        this.state = {
            status: "login",
            //turnStatus: null,
            playerArray: null,
            enemyArray: null,
            allShipsPlaced: false,
            //socket:null,
            id: null,
            gameId: null,
            //If there is a game avaliable from the server or not
            gameAvailable: false,
            gameRequested: false,
            AcceptGameMSG: ""
        }
        // var socket;
        // socket = null;
        this.loginResponse = this.loginResponse.bind(this);
        this.startQueue = this.startQueue.bind(this);
        this.acceptGame = this.acceptGame.bind(this);
        this.updatePlayerGrid = this.updatePlayerGrid.bind(this);
        this.attack = this.attack.bind(this);
        this.goToShipSelect = this.goToShipSelect.bind(this);
    }

    loginResponse(newStatus, email) {
        if (newStatus === true) {
            console.log("Logged in as :" + email);
            this.setState({ status: "ship select" });
            this.setState({ id: email });
            let s = new WebSocket(`wss://4kflhc6oo7.execute-api.us-east-1.amazonaws.com/dev?player=${email}`);
            this.socket = s;
            //this.setState({socket:s})
            this.socket.onmessage = (event) => {
                console.log(event.data);
                this.handleEvent(event);
            }
        }
        // console.log(newStatus)
        console.log(this.state.status)
    }

    handleEvent(event) {
        console.log(event)
        let res = JSON.parse(event.data)
        console.log(res)
        let action = res.action
        switch (action) {
            case "acceptGame":
                this.setState({ gameAvailable: true, AcceptGameMSG: res.data })
                break;
            case "move":
                this.setState({ status: "move", playerArray: res.data.user.grid, enemyArray: res.data.opponent.grid, gameId: res.data.opponent.gameId })
                break;
            case "lock":
                this.setState({ status: "lock", playerArray: res.data.user.grid, enemyArray: res.data.opponent.grid, gameId: res.data.opponent.gameId })
                break;
            case "win":
                this.setState({ status: "win" })
                break;
            case "lose":
                this.setState({ status: "lose" })
                break;
            case "TERMINATE":
                this.setState({ status: "terminate" })
                break;

            default:
                break;
        }
    }

    acceptGame() {
        let res = this.state.AcceptGameMSG
        console.log("res")
        let gameId = res.gameId
        console.log("game id")
        console.log(gameId)

        this.setState({ gameId: gameId })

        let input = {
            email: this.state.id,
            grid: this.state.playerArray,
            gameId: gameId
        };
        console.log(this.state.id)
        console.log(this.state.playerArray)
        console.log(this.state.gameId)

        console.log("input: ")
        console.log(input)
        //this.setState({ status: "game" });

        fetch("https://zy86pq19vd.execute-api.us-east-1.amazonaws.com/dev/acceptgame", {
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        })
            .then(response => response.json())
            .then((res) => {
                console.log("Response", res);

                if (res?.statusCode === 200) {
                    console.log(res);

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

    startQueue(playerArray) {
        console.log("Queue Started")
        console.log(playerArray)
        this.setState({ playerArray: playerArray });
        this.setState({ gameRequested: true })

        var input = {
            email: this.state.id,
            grid: playerArray
        };

        fetch("https://zy86pq19vd.execute-api.us-east-1.amazonaws.com/dev/startgame", {
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        })
            .then(response => response.json())
            .then((res) => {
                console.log("Response", res);
                if (res?.statusCode === 200) {
                    console.log(res);
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

    //resets some state variables and goes to ship selector screen
    goToShipSelect() {
        this.setState({
            status: "ship select",
            playerArray: null,
            enemyArray: null,
            gameId: null,
            gameAvailable: false,
            gameRequested: false,
        })
    }

    attack(row, col, valOfSquare) {
        console.log("Attack coordinates, Col:" + col + ", Row:" + row)
        console.log("game id is : " + this.state.gameId)
        var input = {
            gameId: this.state.gameId,
            email: this.state.id,
            x_cordinate: col,
            y_cordinate: row
        };

        fetch("https://zy86pq19vd.execute-api.us-east-1.amazonaws.com/dev/gameengine", {
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
        })
            .then(response => response.json())
            .then((res) => {
                console.log("Response", res);
                if (res?.statusCode === 200) {
                    console.log(res);
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

    //Only used for shipselector stage. Otherwise, grid is sent by server
    updatePlayerGrid(grid, isDone) {
        this.setState({ playerArray: grid, allShipsPlaced: isDone })
        console.log("grid updated")
        console.log(grid)
    }

    renderActiveComponent() {
        switch (this.state.status) {
            case "login":
                return (
                    <div>
                        <Login setLoginStatus={this.loginResponse} />
                        <RankList/>
                    </div>
                )
            case "ship select":
                return (
                    <div>
                        <Shipselector startQueue={
                            !this.state.gameAvailable ? this.startQueue : this.acceptGame
                        }
                            updatePlayerGrid={this.updatePlayerGrid} />
                        {/* <button onClick={() => this.acceptGame(this.state.AcceptGameMSG)}>Accept Game</button> */}
                    </div>
                )
            case "game":
                //NOt sure if this case is necessary. Might need to delete later
                return (
                    <div>
                        <PlayerGrid tableVals={this.state.playerArray} />
                        <EnemyGrid tableVals={this.state.enemyArray} onClick={() => { }} />
                    </div>
                )
            case "lock":
                return (
                    <div>
                        <h2>Enemy Turn</h2>
                        <h3>Wait for opponent to make their move</h3>
                        <PlayerGrid tableVals={this.state.playerArray} />
                        <EnemyGrid tableVals={this.state.enemyArray} onClick={() => { }} />
                    </div>
                )
            case "move":
                return (
                    <div>
                        <h2>Your turn</h2>
                        <h3>Click enemy grid to make a move</h3>
                        <PlayerGrid tableVals={this.state.playerArray} />
                        <EnemyGrid tableVals={this.state.enemyArray} onClick={this.attack} />
                    </div>
                )
            case "win":
                return (
                    <div>
                        <h1>You won! :)</h1>
                        <button onClick={() => this.goToShipSelect()}>Play another game</button>
                    </div>
                )
            case "lose":
                return (
                    <div>
                        <h1>You lose! :(</h1>
                        <button onClick={() => this.goToShipSelect()}>Play another game</button>
                    </div>
                )
            case "terminate":
                return (
                    <div>
                        <h1>Your opponent left the game. The game has been terminated</h1>
                        <button onClick={() => this.goToShipSelect()}>Play another game</button>
                    </div>
                )
            default:
                return <Login setLoginStatus={this.setStatus} />
        }
    }

    render() {
        //const isLogged=this.state.status
        return (
            <div>
                {this.renderActiveComponent()}
            </div>
        )
    }
}
