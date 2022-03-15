import {bindActionCreators} from "@reduxjs/toolkit";
import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/action";
import "../css/App.css";
import Header from "./Header";
import Login from "./Login";
import BoardMain from "./BoardMain";
import SockJsClient from "react-stomp";


class App extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.username !== nextProps.username || this.props.gameID !== nextProps.gameId;
    }

    onMessageReceive = (response, topic) => {
        if (topic.includes("isFull")) {
            setTimeout(() => {
                this.props.updateConnectedPlayers(response.players)
                if (response.isFull) {
                    this.props.getGameData(topic.split("/")[3]);
                }
            }, 500)
        } else {
            this.props.userPlayed(response.playedCard, response.playedCardsSoFar, response.hands, response.handCounts);
            this.props.setPlayersTurn(response.place, response.handWinnerPlayerPlace);
            console.log(`${response.username} played : ${response.playedCard}`);
            console.log("Received: ", response, topic);
        }
    }

    sendMessage = (playedCard) => {
        try {
            this.clientRef.sendMessage(`/game/${playedCard.gameId}`, JSON.stringify(playedCard));
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    render() {
        const {username} = this.props;

        console.log("Client Connected: ", this.props.clientConnected);


        if (!username) {
            return (
                <div className="container-fluid">
                    <Header/>
                    <Login setUsername={this.props.setUsername}/>
                </div>
            )
        }

        return (
            <div className="container-fluid">
                <Header username={username}/>
                <SockJsClient url={this.props.wsSourceUrl}
                              topics={[`/topic/${this.props.gameId}`, `/topic/isFull/${this.props.gameId}`]}
                              onMessage={this.onMessageReceive}
                              ref={(client) => this.clientRef = client}
                              onConnect={() => {
                                  this.props.setClientStatus(true)
                              }}
                              onDisconnect={() => {
                                  this.props.setClientStatus(false)
                              }}
                              debug={false}
                />
                <BoardMain sendMessage={this.sendMessage}
                           wsSourceUrl={this.props.wsSourceUrl}
                />
                <div className="footer mt-5"/>
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    clientConnected: store.clientConnected,
    username: store.username,
    gameId: store.gameId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
