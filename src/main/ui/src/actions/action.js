let initialize, getGame;

if (process.env.NODE_ENV !== 'development') {
    initialize = `${window.location.protocol}//${window.location.host}/initialize`;
    getGame = `${window.location.protocol}//${window.location.host}/getGame/`;
} else if (process.env.NODE_ENV === 'development') {
    initialize = 'http://localhost:8080/initialize';
    getGame = `http://localhost:8080/getGame/`
}


export const showError = (error) => ({
    type: 'SHOW_ERROR',
    error
})

export const setUsername = (value) => (dispatch) => {
    const username = {
        username: value
    }
    dispatch({type: 'LOADING'})
    fetch(initialize, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username)
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log('success', data)
        dispatch({type: 'SET_USERNAME', value})
        dispatch({
            type: 'SAVE_GAMEDATA',
            data
        })
    }).catch(error => {
        dispatch({
            type: 'SHOW_ERROR',
            error: error.message
        })
    })
}

export const getGameData = gameId => dispatch => {
    dispatch({type: 'LOADING'})
    fetch(getGame.concat(gameId), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        dispatch({
            type: 'SAVE_GAMEDATA',
            data
        })
    }).catch(error => {
        dispatch({
            type: 'SHOW_ERROR',
            error: error.message
        })
    })
}

export const saveGameData = data => dispatch => dispatch({
    type: 'SAVE_GAMEDATA',
    data
})

export const userPlayed = (card, playedCardsSoFar, hands, handCounts) => dispatch => dispatch({
    type: 'USER_PLAYED',
    card, playedCardsSoFar, hands, handCounts
})

export const updateConnectedPlayers = count => dispatch => dispatch({
    type: 'UPDATE_CONNECTED_PLAYERS',
    count
})

export const setClientStatus = status => dispatch => dispatch({
    type: 'SET_CLIENT_STATUS',
    status
})

export const setPlayersTurn = (whoseTurn, handWinnerPlayerPlace) => dispatch => dispatch({
    type: 'SET_PLAYERS_TURN',
    whoseTurn, handWinnerPlayerPlace
})

export const removePlayedCards = playedCardsSoFar => dispatch => dispatch({
    type:'REMOVE_PLAYED_CARDS',
    playedCardsSoFar
})