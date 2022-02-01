import React, {Component} from 'react'
import {motion} from 'framer-motion'
import Card from 'react-free-playing-cards'
import '../css/Cards.css'
import {bindActionCreators} from "@reduxjs/toolkit";
import * as actions from "../actions/action";
import {connect} from "react-redux";
import {isThisCardPlayed} from "../utils/utils";

class Cards extends Component {
    render() {
        const {user, username, whoseTurn, gameId} = this.props;
        let {playedCardsSoFar} = this.props
        let prevPlayedCards = null
        if (null !== playedCardsSoFar) {
            prevPlayedCards = playedCardsSoFar
            playedCardsSoFar = Object.keys(playedCardsSoFar).length === 4 ? null : playedCardsSoFar;
        }
        setTimeout(() => !playedCardsSoFar && this.props.removePlayedCards(prevPlayedCards), 2000)

        const btnStyle = {
            background: 'none',
            color: 'inherit',
            border: '0px solid black',
            padding: 0,
            font: 'inherit',
            cursor: 'pointer',
            outline: 'inherit',
            pointerEvents: 'auto'
        };

        return (
            <div className='d-flex position-relative'>
                {
                    user.cards && user.cards.map((card, idx) => {
                        if (isThisCardPlayed(card, this.props.playedCardsSoFar)) {
                            const posStartX = -idx * 40.25;
                            return (
                                <motion.span className='position-absolute' key={idx}
                                             style={{left: idx * 40.25, pointerEvents: 'none'}}
                                             animate={{
                                                 y: '-8rem',
                                                 x: posStartX + 12 * 40.25 /2,
                                                 scale: 1.1
                                             }}
                                >
                                    <button className='cardBtn'
                                            style={btnStyle}
                                            value={card}
                                            disabled
                                    >
                                        <Card className='cardBtn' card={card} deck-type={'big-face'} height='110px'/>
                                    </button>
                                </motion.span>
                            )
                        }
                        return (
                            <span className='position-absolute' key={idx}
                                  style={{left: idx * 40.25, pointerEvents: 'none'}}>
                                <button className='cardBtn'
                                        style={btnStyle}
                                        value={card}
                                        disabled={whoseTurn !== user.place}
                                        onClick={e => {
                                            // console.log('Button clicked: ' + e.target.parentNode.value || e.target.value);
                                            const payload = {
                                                playedCard: card,
                                                gameId,
                                                place: user.place,
                                                username,
                                                playedCardsSoFar
                                            }
                                            this.props.sendMessage(payload)
                                            // console.log(payload, this.props.sendMessage(payload));
                                        }}
                                >
                                    <Card className='cardBtn' card={card} deck-type={'big-face'} height='110px'/>
                                </button>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    gameId: store.gameId,
    whoseTurn: store.whoseTurn,
    playedCardsSoFar: store.playedCardsSoFar
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cards);