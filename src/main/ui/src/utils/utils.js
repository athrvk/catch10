export const isThisCardPlayed = (card, playedCardsSoFar) =>
    Object.values(playedCardsSoFar).find(playedCard => card === playedCard);

