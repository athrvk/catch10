package com.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Turn {

    String gameId;
    String playedCard;
    String place;
    String username;
    Map<String, String> playedCardsSoFar;
    Map<String, List<List<String>>> hands;
}
