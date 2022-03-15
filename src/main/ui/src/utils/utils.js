export const isThisCardPlayed = (card, playedCardsSoFar) =>
    Object.values(playedCardsSoFar).find(playedCard => card === playedCard);

export const isSameSuite = (card, playedCardsSoFar) => {
    for(const place in playedCardsSoFar) {
        if (card[1] !== playedCardsSoFar[place][1]) {
            return false;
        }
    }
    return true;
};

export const assignPlace = (userPlace, playerNorth, playerEast, playerSouth, playerWest) => {
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