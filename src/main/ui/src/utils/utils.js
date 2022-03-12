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

export const getTotalHands = (hands, player1, player2) => {
    const hands1 = hands && hands[player1] ? hands[player1].length : 0;
    const hands2 = hands && hands[player2] ? hands[player2].length : 0;
    return hands1 + hands2;
}

export const getTensCaught = (hands, player1, player2) => {
    const listOfHands1 = hands && hands[player1];
    const listOfHands2 = hands && hands[player2];
    let ten1 = 0, ten2 = 0;
    listOfHands1 && listOfHands1.forEach(list => list && list.forEach(card => card.includes('T') && ten1++))
    listOfHands2 && listOfHands2.forEach(list => list && list.forEach(card => card.includes('T') && ten2++))
    return ten1 + ten2;
}