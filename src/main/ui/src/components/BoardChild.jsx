import React, {Component} from 'react'
import Cards from './Cards'
import '../css/BoardChild.css'
import NonPlayingCards from './NonPlayingCards'

export default class BoardChild extends Component {
    assignPlace = (userPlace, playerNorth, playerEast, playerSouth, playerWest) => {
        if(userPlace === 'SOUTH') {
            return [playerNorth, playerWest, playerSouth, playerEast]
        }
        if(userPlace === 'NORTH') {
            return [playerSouth, playerEast, playerNorth, playerWest]
        }
        if(userPlace === 'EAST') {
            return [playerWest, playerSouth, playerEast, playerNorth]
        }
        if(userPlace === 'WEST') {
            return [playerEast, playerNorth, playerWest, playerSouth]
        }
    }
    render() {
        let { players, user, username} = this.props
        let pNorth = players.filter(player => player.place === 'NORTH')[0]
        let pEast = players.filter(player => player.place === 'EAST')[0]
        let pSouth = players.filter(player => player.place === 'SOUTH')[0]
        let pWest = players.filter(player => player.place === 'WEST')[0]

        // switch(user.place) {
        //     case 'NORTH': {
        //         pNorth = user
        //         break
        //     }
        //     case 'SOUTH': {
        //         pSouth = user
        //         break
        //     }
        //     case 'EAST': {
        //         pEast = user
        //         break
        //     }
        //     case 'WEST': {
        //         pWest = user
        //         break
        //     }
        //     default:
        //
        // }
        let playersInOrder = this.assignPlace(user.place, pNorth, pEast, pSouth, pWest)
        // user = playersInOrder[2];


        return (
            <div className='board'>
                <div className="position-relative">
                    <div className="top" id="">
                        <span className='topUserName'>{playersInOrder[0].username}</span>
                        {
                            playersInOrder[0] && (<NonPlayingCards player={playersInOrder[0]} top={true}/>)
                        }
                    </div>
                    <div className="left" id="">
                        <span className='leftUserName'>{playersInOrder[3].username}</span>
                        {
                            playersInOrder[3] && (<NonPlayingCards player={playersInOrder[3]} left={true} />)
                        }
                    </div>
                    <div className="right" id="">
                        <span className='rightUserName'>{playersInOrder[1].username}</span>
                        {
                            playersInOrder[1] && (<NonPlayingCards player={playersInOrder[1]} right={true}/>)
                        }
                    </div>
                    <div className="bottom" id="">
                        <span className='bottomUserName'>{username}</span>
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
            </div>
        )
    }
}
