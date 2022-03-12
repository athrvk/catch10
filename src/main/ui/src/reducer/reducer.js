import {placeEnum} from "../constants/contants";

// const initialState = {
//     loaded: true,
//     username: 'p3',
//     gameId: "21312313",
//     "players": [{
//         "cards": ["2h", "Jh", "5s", "9d", "Kc", "9h", "3h", "6d", "3s", "Jc", "9s", "6h", "Qh"],
//         "place": "NORTH",
//         "username": "p1"
//     }, {
//         "cards": ["Qc", "Qd", "Qs", "Ah", "Kd", "4c", "7h", "Th", "6c", "2c", "Jd", "5c", "Js"],
//         "place": "EAST",
//         "username": "p2"
//     }, {
//         "cards": ["As", "Ks", "Kh", "Ac", "2d", "4s", "8c", "5h", "8d", "4h", "6s", "Td", "8s"],
//         "place": "SOUTH",
//         "username": "p3"
//     }, {
//         "cards": ["7d", "7s", "Ts", "Ad", "3d", "8h", "9c", "7c", "4d", "2s", "3c", "5d", "Tc"],
//         "place": "WEST",
//         "username": "p4"
//     }],
//     user: {
//         cards: ["As", "Ks", "Kh", "Ac", "2d", "4s", "8c", "5h", "8d", "4h", "6s", "Td", "8s"],
//         place: "SOUTH",
//         username: "p3"
//     },
//     playersConnected: 4,
//     whoseTurn: 'SOUTH',
//     playedCardsSoFar: {
//         WEST: 'Ts',
//         NORTH: '3s',
//         EAST: 'Js'
//     }
// }

const initialState = {
    loaded: true,
    playersConnected: 0,
    whoseTurn: 'SOUTH',
    playedCardsSoFar: {}
}

const handlers = {
    SHOW_ERROR: (state, action) => ({
        ...state,
        loaded: true,
        error: action.error
    }),
    LOADING: (state) => ({
        ...state,
        loaded: false
    }),
    SET_USERNAME: (state, action) => ({
        ...state,
        username: action.value
    }),
    SAVE_GAMEDATA: (state, action) => ({
        ...state,
        loaded: true,
        gameId: action.data.gameId,
        players: action.data.players,
        user: action.data.players.filter(player => player.username === state.username)[0]
    }),
    USER_PLAYED: (state, action) => ({
            ...state,
            playedCardsSoFar: action.playedCardsSoFar,
            hands: action.hands
        }
    ),
    UPDATE_CONNECTED_PLAYERS: (state, action) => ({
        ...state,
        playersConnected: action.count
    }),
    SET_CLIENT_STATUS: (state, action) => ({
        ...state,
        clientConnected: action.status
    }),
    SET_PLAYERS_TURN: (state, action) => ({
        ...state,
        whoseTurn: placeEnum[(placeEnum[action.whoseTurn] + 1) % 4]
    }),
    REMOVE_PLAYED_CARDS: (state, action) => {
        const userCards = state.user.cards;
        const players = state.players.map(player => ({
                ...player,
                cards: player.cards.filter(card => card !== action.playedCardsSoFar[player.place])
            })
        );
        const user = {
            ...state.user,
            cards: userCards.filter(card => card !== action.playedCardsSoFar[state.user.place])
        };
        return {
            ...state,
            user,
            players,
        };
    }
}


export const rootReducer = (state = initialState, action) =>
    (handlers[action.type] || (() => state))(state, action)
