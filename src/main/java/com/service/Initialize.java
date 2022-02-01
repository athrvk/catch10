package com.service;

import com.model.db.Game;
import com.model.db.Player;
import com.model.db.User;
import com.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

import static com.constants.GameConstants.orderedDeck;
import static com.constants.GameConstants.places;

@Service
public class Initialize {

    private static final Logger log = LoggerFactory.getLogger(Initialize.class);
    private final GameRepository gameRepository;
    private final GameService gameService;


    @Autowired
    public Initialize(GameRepository gameRepository, GameService gameService) {
        this.gameRepository = gameRepository;
        this.gameService = gameService;
    }

    public Game setup(User user) throws InterruptedException {
        Player player = new Player();
        player.setUsername(user.getUsername());
        List<Game> games = gameRepository.findByFullIsFalse();

        if (!CollectionUtils.isEmpty(games)) {
            Game game = games.get(0);
            log.info("Found game : " + game.toString());
            List<String> cards = game.getAllCards().subList(0, 13);
            player.setCards(cards);

            int placesOccupied = game.getPlayers().size();
            player.setPlace(places[placesOccupied]);

            game.getPlayers().add(player);
            int remainingCardsSize = game.getAllCards().size();
            List<String> remainingCards = game.getAllCards().subList(13, remainingCardsSize);
            game.setAllCards(remainingCards);

            if (3 == placesOccupied) {
                game.setFull(true);
            }

            gameRepository.save(game);
            gameService.updatePlayersInGame(game.getGameId(), game.getPlayers().size());
            return game;
        }

        Game newGame = createNewGame(player);
        log.info("Creating a new game : " + newGame);

        gameRepository.save(newGame);
        log.info("Saving new game in database : " + newGame);

        return newGame;
    }

    public Game getGame(String gameId) {
        Optional<Game> game = gameRepository.findById(gameId);

        return game.orElse(null);
    }

    private Game createNewGame(Player newPlayer) {
        Game newGame = new Game();
        newGame.setGameId(String.valueOf(new Date().getTime()));

        List<String> allCards = getShuffledCards();
        newGame.setAllCards(allCards.subList(13, allCards.size()));

        List<String> cards = allCards.subList(0, 13);
        newPlayer.setCards(cards);
        newPlayer.setPlace(places[0]);

        List<Player> playerList = new ArrayList<>();
        playerList.add(newPlayer);

        newGame.setPlayers(playerList);
        return newGame;
    }

    private List<String> getShuffledCards() {
        List<String> cards = new ArrayList<>(orderedDeck);
        Collections.shuffle(cards);
        return cards;
    }
}
