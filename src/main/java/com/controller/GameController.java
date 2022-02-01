package com.controller;


import com.model.Turn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


import java.util.HashMap;
import java.util.Map;

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
        Map<String, String> playedCardsSoFar = null != playedTurn.getPlayedCardsSoFar() ? playedTurn.getPlayedCardsSoFar() : new HashMap<>();
        playedCardsSoFar.put(playedTurn.getPlace(), playedTurn.getPlayedCard());
        playedTurn.setPlayedCardsSoFar(playedCardsSoFar);
        messagingTemplate.convertAndSend(String.format("/topic/%s", playedTurn.getGameId()), playedTurn);
        log.debug("Sent to clients : {}", playedTurn);
    }


}
