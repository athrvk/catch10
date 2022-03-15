import React, {Component} from 'react'
import Cards from './Cards'
import '../css/BoardChild.css'
import NonPlayingCards from './NonPlayingCards'
import {Typography} from "@mui/material";
import ScoreBoard from "./ScoreBoard";
import {assignPlace} from "../utils/utils";

export default class BoardChild extends Component {

    render() {
        let {players, user, username, handCounts} = this.props
        const pNorth = players.filter(player => player.place === 'NORTH')[0]
        const pEast = players.filter(player => player.place === 'EAST')[0]
        const pSouth = players.filter(player => player.place === 'SOUTH')[0]
        const pWest = players.filter(player => player.place === 'WEST')[0]

        const playersInOrder = assignPlace(user.place, pNorth, pEast, pSouth, pWest)

        return (
            <div className='board'>
                <div className="position-relative">
                    <div className="top" id="">
                        <Typography variant={'h6'}>
                            <span className='topUserName'>{playersInOrder[0].username}</span>
                        </Typography>
                        {
                            playersInOrder[0] && (<NonPlayingCards player={playersInOrder[0]} top={true}/>)
                        }
                    </div>
                    <div className="left" id="">
                        <Typography variant={'h6'}>
                            <span className='leftUserName'>{playersInOrder[3].username}</span>
                        </Typography>
                        {
                            playersInOrder[3] && (<NonPlayingCards player={playersInOrder[3]} left={true}/>)
                        }
                    </div>
                    <div className="right" id="">
                        <Typography variant={'h6'}>
                            <span className='rightUserName'>{playersInOrder[1].username}</span>
                        </Typography>
                        {
                            playersInOrder[1] && (<NonPlayingCards player={playersInOrder[1]} right={true}/>)
                        }
                    </div>
                    <div className="bottom" id="">
                        <Typography variant={'h6'}>
                            <span className='bottomUserName'>{username}</span>
                        </Typography>
                        {
                            user && (
                                <Cards user={user}
                                       username={username}
                                       sendMessage={this.props.sendMessage}
                                />
                            )
                        }
                    </div>
                </div>
                <ScoreBoard playersInOrder={playersInOrder}
                            handCounts={handCounts}
                            user={user}
                            username={username}
                />
            </div>
        )
    }
}
