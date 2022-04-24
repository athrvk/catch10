package com.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Turn {

    String gameId;
    String playedCard;
    String place;
    String username;
    String trump;
    Map<String, String> playedCardsSoFar;
    Map<String, List<List<String>>> hands;
    List<HandCount> handCounts;
    String handWinnerPlayerPlace;

    @Data
    @AllArgsConstructor
    public static class HandCount {
        String place;
        int handCount;
        int tensCount;
    }

}
