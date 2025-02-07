import React from "react"
import Login from "./login"
import Shipselector from "./PreGame/ShipSelector"
import PlayerGrid from "./PlayerGrid/PlayerGrid"
import EnemyGrid from "./EnemyGrid/enemyGrid"
import RankList from "./RankList/RankList"
import PreGameHeader from "./PreGame/PreGameHeader"
import HowToPlay from "./PreGame/HowToPlay";
import GameHeader from "./Game/GameHeader";

import Header from "./loginComponents/header"
import Signup from "./loginComponents/signup"
import Lost from "./loginComponents/lostpass"
import Admin from "./adminComponents/admin"

import UpdateUser from "./PreGame/updateUser"
import { Card, CardColumns } from "react-bootstrap"
import Button from 'react-bootstrap/Button'

export default class controller extends React.Component {
    constructor() {
        super();
        this.state = {
            status: "login",
            //turnStatus: null,
            playerArray: null,
            enemyArray: null,
            allShipsPlaced: false,
            socket: null,
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
        this.waitingList = this.waitingList.bind(this);
        this.destinationResponse = this.destinationResponse.bind(this);
        this.loadFromSessionStorage = this.loadFromSessionStorage.bind(this);

        this.loadFromSessionStorage();
    }

    loadFromSessionStorage(){
        if (sessionStorage.getItem("Role") === "Admin") {
            this.setState({ status: "admin" })
        }
        else {
            console.log(sessionStorage.getItem("Email"));
            this.setState({ status: "ship select", id:sessionStorage.getItem("Email"), socket:sessionStorage.getItem("Socket")})
        }
    }

    loginResponse(newStatus, email, role, first) {
        if (newStatus === true) {
            console.log("Logged in as :" + email);

            if (role === "Admin") {
                this.setState({ status: "admin" })
                sessionStorage.setItem("firstName", first);
                sessionStorage.setItem("Email", email);
                sessionStorage.setItem("Login", "true");
                sessionStorage.setItem("Role", role);
            } else {
                this.setState({ status: "ship select" });
                this.setState({ id: email });
                sessionStorage.setItem("firstName", first);
                sessionStorage.setItem("Email", email);
                sessionStorage.setItem("Login", "true");
                sessionStorage.setItem("Role", role);
                let s = new WebSocket(`wss://4kflhc6oo7.execute-api.us-east-1.amazonaws.com/dev?player=${email}`);
                this.socket = s;
                sessionStorage.setItem("Socket",s)
                this.setState({ socket: s })
                this.socket.onmessage = (event) => {
                    console.log(event.data);
                    this.handleEvent(event);
                }

            }

        }
        // console.log(newStatus)
        console.log(this.state.status)
    }

    destinationResponse(newStatus, message) {
        this.setState({ status: newStatus })
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

    waitingList() {
        console.log("In waiting list")
        this.setState({ gameRequested: true })

        let input = {
            email: this.state.id,
            grid: this.state.playerArray,
        };

        fetch("https://zy86pq19vd.execute-api.us-east-1.amazonaws.com/dev/waitinglist", {
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
        this.setState({gameRequested:false})

        console.log("Attack coordinates, Col:" + col + ", Row:" + row)
        console.log("game id is : " + this.state.gameId)
        // var input = {
        //     gameId: this.state.gameId,
        //     email: this.state.id,
        //     x_cordinate: col,
        //     y_cordinate: row
        // };

        let mess = {
            "action": "onGame", "data": {
                gameId: this.state.gameId,
                email: this.state.id,
                x_cordinate: col,
                y_cordinate: row
            }
        }
        let sendGame = JSON.stringify(mess)
        this.state.socket.send(sendGame);
        // fetch("https://zy86pq19vd.execute-api.us-east-1.amazonaws.com/dev/gameengine", {
        //     body: JSON.stringify(input),
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "PUT",
        // })
        //     .then(response => response.json())
        //     .then((res) => {
        //         console.log("Response", res);
        //         if (res?.statusCode === 200) {
        //             console.log(res);
        //         }
        //         else {
        //             console.log(res);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("###error: ", err);
        //         //addNotification("###error: ",err);
        //     });
    }

    //Only used for shipselector stage. Otherwise, grid is sent by server
    updatePlayerGrid(grid, isDone) {
        this.setState({ playerArray: grid, allShipsPlaced: isDone })
        console.log("grid updated")
        console.log(grid)
    }

    renderActiveComponent() {

        switch (this.state.status) {
            case "logout":
                sessionStorage.clear();
                if(this.state.socket!==null){
                    this.state.socket.close();
                }
                this.setState({
                    status: "login",
                    status: "login",
                    playerArray: null,
                    enemyArray: null,
                    allShipsPlaced: false,
                    socket: null,
                    id: null,
                    gameId: null,
                    gameAvailable: false,
                    gameRequested: false,
                    AcceptGameMSG: ""
                })
                return 0;
            case "update":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <UpdateUser />

                    </div>
                )
            case "login":
                if (sessionStorage.getItem("Login") === "true") {
                    if (sessionStorage.getItem("Role") === "Admin") {
                        this.setState({ status: "admin" })
                    }
                    else {
                        this.setState({ status: "ship select" })
                    }
                }
                return (<div>
                    <Header setNewPage={this.destinationResponse} />
                    <Login setLoginStatus={this.loginResponse} />
                </div>)
            case "signup":
                return (
                    <div onLoad={this.isLogged}>
                        <Header setNewPage={this.destinationResponse} />
                        <Signup />
                    </div>
                )
            case "lost":
                return (
                    <div>
                        <Header setNewPage={this.destinationResponse} />
                        <Lost />
                    </div>
                )
            case "admin":
                return (
                    <div>
                        <Admin />
                    </div>
                )
            case "ship select":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <Shipselector startQueue={
                            // !this.state.gameAvailable ? this.waitingList : 
                            this.waitingList
                        }
                            updatePlayerGrid={this.updatePlayerGrid} 
                            queueStarted={this.state.gameRequested}/>
                    </div>
                )
            case "rankings":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <RankList playerID={this.state.id} />
                    </div>
                )
            case "how to play":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <HowToPlay></HowToPlay>
                    </div>
                )
            case "game":
                //NOt sure if this case is necessary. Might need to delete later
                return (
                    <div>
                        <GameHeader setNewPage={this.destinationResponse} />
                        <PlayerGrid tableVals={this.state.playerArray} />
                        <EnemyGrid tableVals={this.state.enemyArray} onClick={() => { }} />
                    </div>
                )
            case "lock":
                return (
                    <div>
                        <GameHeader setNewPage={this.destinationResponse} />
                        <h2>Enemy Turn</h2>
                        <h3>Wait for opponent to make their move</h3>
                        <div className = "game">
                        {/* <CardColumns className="mx-auto d-flex justify-content-center flex-wrap"> */}
                            <PlayerGrid tableVals={this.state.playerArray} />
                            <EnemyGrid tableVals={this.state.enemyArray} onClick={() => { }} />
                        {/* </CardColumns> */}
                        </div>
                    </div>
                )
            case "move":
                return (
                    <div>
                        <GameHeader setNewPage={this.destinationResponse} />
                        <h2>Your turn</h2>
                        <h3>Click enemy grid to make a move</h3>
                        <div className = "game">

                        {/* <CardColumns className="mx-auto d-flex justify-content-center flex-wrap"> */}
                            <PlayerGrid tableVals={this.state.playerArray} />
                            <EnemyGrid tableVals={this.state.enemyArray} onClick={this.attack} />
                        {/* </CardColumns> */}
                        </div>
                    </div>
                )
            case "win":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <Card className="text-center">
                            <Card.Header>You Win! :)</Card.Header>
                            <Card.Body>
                                <Button variant="success" onClick={() => this.goToShipSelect()}>Play another game</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            case "lose":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <Card className="text-center">
                            <Card.Header>You Lose! :(</Card.Header>
                            <Card.Body>
                                <Button variant="danger" onClick={() => this.goToShipSelect()}>Play another game</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            case "terminate":
                return (
                    <div>
                        <PreGameHeader setNewPage={this.destinationResponse} />
                        <Card className="text-center">
                            <Card.Header>Your opponent left the game. The game has been terminated</Card.Header>
                            <Card.Body>
                                <Button variant="warning" onClick={() => this.goToShipSelect()}>Play another game</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            default:
                // if (sessionStorage.getItem("Login") === "true") {
                //     console.log("Page Refreshed")
                // }
                return (<div>
                    <Header setNewPage={this.destinationResponse} />
                    <Login setLoginStatus={this.loginResponse} />

                </div>
                )
        }
    }

    render() {
        //const isLogged=this.state.status
        //Add a logout
        //TODO

        return (
            <div>
                {this.renderActiveComponent()}
            </div>
        )
    }
}