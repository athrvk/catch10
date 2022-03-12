import React, {Component} from 'react'
import Cards from './Cards'
import '../css/BoardChild.css'
import NonPlayingCards from './NonPlayingCards'
import {Box, CardContent, Typography} from "@mui/material";
import {getTensCaught, getTotalHands} from "../utils/utils";

export default class BoardChild extends Component {
    assignPlace = (userPlace, playerNorth, playerEast, playerSouth, playerWest) => {
        if (userPlace === 'SOUTH') {
            return [playerNorth, playerWest, playerSouth, playerEast]
        }
        if (userPlace === 'NORTH') {
            return [playerSouth, playerEast, playerNorth, playerWest]
        }
        if (userPlace === 'EAST') {
            return [playerWest, playerSouth, playerEast, playerNorth]
        }
        if (userPlace === 'WEST') {
            return [playerEast, playerNorth, playerWest, playerSouth]
        }
    }

    render() {
        let {players, user, username} = this.props
        let pNorth = players.filter(player => player.place === 'NORTH')[0]
        let pEast = players.filter(player => player.place === 'EAST')[0]
        let pSouth = players.filter(player => player.place === 'SOUTH')[0]
        let pWest = players.filter(player => player.place === 'WEST')[0]

        let playersInOrder = this.assignPlace(user.place, pNorth, pEast, pSouth, pWest)


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
                <Box sx={{
                    width: 300,
                    height: 300,
                    zIndex: 'tooltip',
                    position: 'absolute',
                    left: '-60%',
                }}>
                    <CardContent>
                        <Typography color="text.primary" variant="h5" gutterBottom>
                            Team: {playersInOrder[0].username} & {username}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            Hands: {getTotalHands(this.props.hands, playersInOrder[0].place, user.place)}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            10's caught: {getTensCaught(this.props.hands, playersInOrder[0].place, user.place)}
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{
                    width: 300,
                    height: 300,
                    zIndex: 'tooltip',
                    position: 'absolute',
                    right: '-60%',
                }}>
                    <CardContent>
                        <Typography color="text.primary" variant="h5" gutterBottom>
                            Team: {playersInOrder[3].username} & {playersInOrder[1].username}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            Hands: {getTotalHands(this.props.hands, playersInOrder[3].place, playersInOrder[1].place)}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            10's caught: {getTensCaught(this.props.hands, playersInOrder[3].place, playersInOrder[1].place)}
                        </Typography>
                    </CardContent>
                </Box>
            </div>
        )
    }
}
