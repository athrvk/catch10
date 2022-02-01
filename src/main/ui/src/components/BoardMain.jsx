import React, {PureComponent} from 'react';
import BoardChild from "./BoardChild";
import '../css/BoardMain.css'
import {bindActionCreators} from "@reduxjs/toolkit";
import * as actions from "../actions/action";
import {connect} from "react-redux";

class BoardMain extends PureComponent {

    render() {
        const {players, user, username, gameId, loaded, error, whoseTurn} = this.props
        const playerWhoseTurn = players && players.filter(player => player.place === whoseTurn)[0];

        if (!loaded) {
            return (
                <div className="container-fluid">
                    <div className="container spinner-border mt-5" role="status"/>
                </div>
            )
        }

        if (error) {
            return (
                <div className="container mt-5 alert alert-danger" role="alert">{error}</div>
            )
        }
        document.title = `catch10 | ${playerWhoseTurn && playerWhoseTurn.username}'s turn`
        return (
            <div className="box">
                {
                    this.props.playersConnected <= 3 ? (
                        <div>
                            <div className="container spinner-border mt-5 mb-4" role="status"/>
                            <p>Waiting for {4 - this.props.playersConnected} more players...</p>
                        </div>
                    ) :
                        players && players.length === 4 && (
                        <div>
                            <p style={{marginTop: '-6.5rem', marginBottom: '5rem'}}>{playerWhoseTurn && playerWhoseTurn.username}'s Turn</p>
                            <BoardChild players={players}
                                        user={user}
                                        username={username}
                                        gameId={gameId}
                                        playedCardsSoFar={this.props.playedCardsSoFar}
                                        whoseTurn={this.props.whoseTurn}
                                        sendMessage={this.props.sendMessage}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    loaded: store.loaded,
    error: store.error,
    playersConnected: store.playersConnected,
    username: store.username,
    players: store.players,
    user: store.user,
    gameId: store.gameId,
    whoseTurn: store.whoseTurn,
    playedCardsSoFar: store.playedCardsSoFar
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BoardMain);