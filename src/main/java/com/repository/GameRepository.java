package com.repository;

import com.model.db.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GameRepository extends MongoRepository<Game, String> {
    List<Game> findByFullIsFalse();
}
