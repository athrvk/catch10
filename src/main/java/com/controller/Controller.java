package com.controller;

import com.model.db.Game;
import com.model.db.User;
import com.repository.GameRepository;
import com.service.Initialize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@CrossOrigin
@RestController
public class Controller {

    private static final Logger log = LoggerFactory.getLogger(Controller.class);
    public final Initialize initializer;
    private final GameRepository gameRepository;


    @Autowired
    public Controller(Initialize initializer, GameRepository gameRepository) {
        this.initializer = initializer;
        this.gameRepository = gameRepository;
    }

    @PostMapping("/initialize")
    public Game initialize(@RequestBody User user) throws InterruptedException {
        log.info("initialize() called with: user = [" + user + "]");
        return initializer.setup(user);
    }

    @GetMapping("/getGame/{gameId}")
    public ResponseEntity<Object> getGame(@PathVariable(value = "gameId") String gameId) {
        Game game = initializer.getGame(gameId);
        if(null == game) {
            return new ResponseEntity<>("No game found with the id "+ gameId, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("/deleteAll")
    public ResponseEntity<?> deleteAllGameInDatabase() {
         gameRepository.deleteAll();
         List<Game> games = gameRepository.findAll();
         return new ResponseEntity<>(games.size(), HttpStatus.OK);
    }

    @GetMapping("/")
    public ModelAndView home() {
        return new ModelAndView("index");
    }

}
