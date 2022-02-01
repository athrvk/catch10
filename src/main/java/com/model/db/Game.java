package com.model.db;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "Games")
public class Game {

    @Id
    String gameId;
    List<Player> players;
    List<String> allCards;
    boolean full;

}
