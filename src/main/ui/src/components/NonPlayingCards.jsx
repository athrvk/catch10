import React, {Component} from 'react'
import {motion} from 'framer-motion';
import Card from 'react-free-playing-cards'
import {bindActionCreators} from "@reduxjs/toolkit";
import * as actions from "../actions/action";
import {connect} from "react-redux";
import {isThisCardPlayed} from "../utils/utils";

class NonPlayingCards extends Component {

    render() {
        const {player} = this.props
        let style
        if (this.props.top) {
            style = (idx) => ({
                left: idx * 30
            })
        } else {
            style = (idx) => ({
                top: idx * 20
            })
        }

        return (
            <div>
                {
                    player.cards && player.cards.map((card, idx) => {
                        if (isThisCardPlayed(card, this.props.playedCardsSoFar) && this.props.top) {
                            const posStartX = -idx * 30;
                            return (
                                <motion.div className='position-absolute'
                                            style={style(idx)}
                                            key={idx}
                                            animate={{
                                                y: '6.15rem',
                                                x: posStartX + 12 * 30 / 2,
                                                scale: 1.8
                                            }}
                                >
                                    <Card card={card} deck-type='big-face' height='60px'/>
                                </motion.div>
                            )
                        }
                        if (isThisCardPlayed(card, this.props.playedCardsSoFar) && this.props.left) {
                            const posStartY = -idx * 20;
                            return (
                                <motion.div className='position-absolute'
                                            style={style(idx)}
                                            key={idx}
                                            animate={{
                                                x: '10rem',
                                                y: posStartY + 12 * 20 / 2,
                                                scale: 1.8
                                            }}
                                >
                                    <Card card={card} deck-type='big-face' height='60px'/>
                                </motion.div>
                            )
                        }
                        if (isThisCardPlayed(card, this.props.playedCardsSoFar) && this.props.right) {
                            const posStartY = -idx * 20;
                            return (
                                <motion.div className='position-absolute'
                                            style={style(idx)}
                                            key={idx}
                                            animate={{
                                                x: '-9.8rem',
                                                y: posStartY + 12 * 20 / 2,
                                                scale: 1.8
                                            }}
                                >
                                    <Card card={card} deck-type='big-face' height='60px'/>
                                </motion.div>
                            )
                        }
                        return (
                            <div className='position-absolute' key={idx} style={style(idx)}>
                                <Card card={card} deck-type='big-face' height='60px' back/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    playedCardsSoFar: store.playedCardsSoFar
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NonPlayingCards);