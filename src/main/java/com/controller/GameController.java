package com.controller;


import com.model.Turn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;


import java.util.*;

import static com.constants.GameConstants.handSize;

@Controller
public class GameController {

    private static final Logger log = LoggerFactory.getLogger(GameController.class);

    private final SimpMessagingTemplate messagingTemplate;

    public GameController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/{gameId}")
    public void post(Turn playedTurn) {
        log.debug("Received from client: {}", playedTurn.toString());

        Map<String, String> playedCardsSoFar = null != playedTurn.getPlayedCardsSoFar()
                ? playedTurn.getPlayedCardsSoFar() : new HashMap<>();
        playedCardsSoFar.put(playedTurn.getPlace(), playedTurn.getPlayedCard());
        playedTurn.setPlayedCardsSoFar(playedCardsSoFar);

        Map<String, List<List<String>>> hands = null != playedTurn.getHands() ? playedTurn.getHands() : new HashMap<>();

        populateHands(playedTurn, playedCardsSoFar, hands);

        playedTurn.setHands(hands);

        messagingTemplate.convertAndSend(String.format("/topic/%s", playedTurn.getGameId()), playedTurn);
        log.debug("Sent to clients : {}", playedTurn);
    }

    private void populateHands(Turn playedTurn, Map<String, String> playedCardsSoFar, Map<String, List<List<String>>> hands) {
        if (playedTurn.getPlayedCardsSoFar().size() > 3) {
            List<String> hand = new ArrayList<>(playedCardsSoFar.values());
            String handWinnerPlace = getPlaceOfWinnerOfHand(playedCardsSoFar);
            List<List<String>> playerHands = null != hands.get(handWinnerPlace) ? hands.get(playedTurn.getPlace()) : new ArrayList<>();
            playerHands.add(hand);
            hands.put(playedTurn.getPlace(), playerHands);
        }
    }

    private String getPlaceOfWinnerOfHand(Map<String, String> playedCardsSoFar) {
        List<Integer> playedRanks = new ArrayList<>();
        for (var cards : playedCardsSoFar.entrySet()) {
            playedRanks.add(getRank(cards.getValue()));
        }
        Collections.sort(playedRanks);
        int highestRank = playedRanks.get(handSize - 1);
        for (var cards : playedCardsSoFar.entrySet()) {
            if (getRank(cards.getValue()) == highestRank) {
                return cards.getKey();
            }
        }
        return null;
    }

    private int getRank(String card) {
        if ('0' <= card.charAt(0) && card.charAt(0) <= '9') {
            return card.charAt(0) - '0';
        }
        switch (card.charAt(0)) {
            case 'K':
                return 13;
            case 'Q':
                return 12;
            case 'J':
                return 11;
            case 'T':
                return 10;
        }
        return 14;
    }

}
