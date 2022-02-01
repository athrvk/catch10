import {placeEnum} from "../constants/contants";

// const initialState = {
//     loaded: true,
//     username: 'dsfa',
//     gameId: "21312313",
//     players: [
//         {
//             username: 'asssd',
//             cards: [
//                 '2h',
//                 'Kh',
//                 '5h',
//                 '6h',
//                 'Qd',
//                 'Jc',
//                 '8d',
//                 '3c',
//                 '4s',
//                 'Jh',
//                 '6d',
//                 'Qh',
//                 'Js'
//             ],
//             place: 'NORTH'
//         },
//         {
//             username: 'dsfa',
//             cards: [
//                 '8d',
//                 '6s',
//                 '9h',
//                 '7s',
//                 '5d',
//                 '7d',
//                 '8h',
//                 'Kc',
//                 '7h',
//                 '4c',
//                 '5s',
//                 'As',
//                 'Ac'
//             ],
//             place: 'EAST'
//         },
//         {
//             username: 'dsfa',
//             cards: [
//                 '8d',
//                 '6s',
//                 '4d',
//                 '7s',
//                 '5d',
//                 '7d',
//                 '8h',
//                 'Kc',
//                 '7h',
//                 '4c',
//                 '5s',
//                 'As',
//                 'Ac'
//             ],
//             place: 'WEST'
//         },
//         {
//             username: 'dsfa',
//             cards: [
//                 '8d',
//                 '6s',
//                 '9h',
//                 '7s',
//                 '5d',
//                 '7d',
//                 '8h',
//                 'Kc',
//                 '7h',
//                 '4c',
//                 '5s',
//                 'As',
//                 'Ac'
//             ],
//             place: 'SOUTH'
//         }
//     ],
//     user: {
//         username: 'dsfa',
//         cards: [
//             '8d',
//             '6s',
//             '9h',
//             '7s',
//             '5d',
//             '7d',
//             '8h',
//             'Kc',
//             '7h',
//             '4c',
//             '5s',
//             'As',
//             'Ac'
//         ],
//         place: 'SOUTH'
//     },
//     playersConnected: 4,
//     whoseTurn: 'SOUTH',
//     playedCardsSoFar: {
//         SOUTH: '8d',
//         NORTH: 'Jc',
//         WEST: '5s'
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
            playedCardsSoFar: action.playedCardsSoFar
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
