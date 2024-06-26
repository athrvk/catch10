import React, {Component} from 'react'
import {motion} from 'framer-motion'
import Card from 'react-free-playing-cards'
import '../css/Cards.css'
import {bindActionCreators} from "@reduxjs/toolkit";
import * as actions from "../actions/action";
import {connect} from "react-redux";
import {isSameSuite, isThisCardPlayed} from "../utils/utils";

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playedCard: null
        }
    }

    handleClick = (e, card, trump, gameId, user, username, playedCardsSoFar) => {
        const payload = {
            playedCard: card,
            gameId,
            trump,
            place: user.place,
            username,
            playedCardsSoFar,
            hands: this.props.hands,
            handCounts: this.props.handCounts
        }
        if (!trump || isSameSuite(card, playedCardsSoFar)) {
            this.props.sendMessage(payload);
            this.setState({playedCard: null});
        } else {
            this.setState({playedCard: card});
        }
    }

    isTrump = card => this.props.trump === card[1];

    render() {
        const {user, username, whoseTurn, gameId, trump} = this.props;
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
                        /*
                            Primary: Animate different suite card play
                            Secondary: Handle different suite card play, provided trump has been defined
                         */
                        if (this.state.playedCard === card && (!(trump && !this.isTrump(card)) ^ !isSameSuite(card, playedCardsSoFar))) {
                            return (
                                <motion.span className='position-absolute' key={idx}
                                             style={{left: idx * 40.25, pointerEvents: 'none', zIndex: 9}}
                                             animate={{
                                                 y: [-20, 0],
                                                 scale: [1.15, 1],
                                                 rotate: [0, 7, -7, 7, -7, 0],
                                                 zIndex: [1, 1, 1, 1, 1, 0],
                                             }}
                                >
                                    <button style={btnStyle}
                                            value={card}
                                            disabled
                                    >
                                        <Card className='cardBtn' card={card} deck-type={'big-face'} height='110px'/>
                                    </button>
                                </motion.span>
                            )
                        }
                        /*
                            Primary: Animate the played card movement
                            Secondary: Prevent different suite card play, provided trump has been defined
                         */
                        if (isThisCardPlayed(card, this.props.playedCardsSoFar) &&
                            ((!trump) || (trump && this.isTrump(card)) || isSameSuite(card, playedCardsSoFar))) {
                            const posStartX = -idx * 40.25;
                            return (
                                <motion.span className='position-absolute' key={idx}
                                             style={{left: idx * 40.25, pointerEvents: 'none'}}
                                             animate={{
                                                 y: '-8rem',
                                                 x: posStartX + 12 * 40.25 / 2,
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
                                               onClick={e => this.handleClick(e, card, trump, gameId, user, username, playedCardsSoFar)}
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
    playedCardsSoFar: store.playedCardsSoFar,
    hands: store.hands,
    trump: store.trump,
    handCounts: store.handCounts
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cards);