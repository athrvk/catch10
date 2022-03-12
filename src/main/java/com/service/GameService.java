package com.service;

import com.model.Turn;
import com.model.db.Game;
import com.model.db.Player;
import com.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@EnableAsync
public class GameService {

    private static final Logger log = LoggerFactory.getLogger(GameService.class);

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public GameService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Async
    public void updatePlayersInGame(String gameId, int players) throws InterruptedException {
        Thread.sleep(2500);
        HashMap<String, String> response = new HashMap<>();
        response.put("gameId", gameId);
        response.put("players", String.valueOf(players));
        if (players == 4) {
            response.put("isFull", "true");
        }
        messagingTemplate.convertAndSend("/topic/isFull/" + gameId, response);
    }
}
