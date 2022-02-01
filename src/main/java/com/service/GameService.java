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

    private final GameRepository gameRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public GameService(GameRepository gameRepository, SimpMessagingTemplate messagingTemplate) {
        this.gameRepository = gameRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public void continueGame(Turn playedTurn) {
        Optional<Game> game = gameRepository.findById(playedTurn.getGameId());

        if (game.isPresent()) {
            Game currentGame = game.get();
            Player currentPlayer = currentGame.getPlayers().stream()
                    .filter(player -> Objects.equals(player.getPlace(), playedTurn.getPlace()))
                    .findFirst().orElse(null);
            List<String> currentPlayerCards;
            if (currentPlayer != null) {
                currentPlayerCards = currentPlayer.getCards().stream()
                        .filter(card -> !Objects.equals(playedTurn.getPlayedCard(), card))
                        .collect(Collectors.toList());
                currentPlayer.setCards(currentPlayerCards);
            }
        }
    }

    @Async
    public void updatePlayersInGame(String gameId, int players) throws InterruptedException {
        Thread.sleep(1500);
        HashMap<String, String> response = new HashMap<>();
        response.put("gameId", gameId);
        response.put("players", String.valueOf(players));
        if (players == 4) {
            response.put("isFull", "true");
        }
        messagingTemplate.convertAndSend("/topic/isFull/" + gameId, response);
    }
}
