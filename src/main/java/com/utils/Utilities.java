package com.utils;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Utilities {
    public static int getRank(String card) {
        if ('0' <= card.charAt(0) && card.charAt(0) <= '9') {
            return card.charAt(0) - '0';
        }
        switch (card.charAt(0)) {
            case 'A':
                return 14;
            case 'K':
                return 13;
            case 'Q':
                return 12;
            case 'J':
                return 11;
        }
        return 10;
    }

    public static String getSuite(String card) {
        return String.valueOf(card.charAt(1));
    }

    public static <V> V findLeastFrequentItem(final Collection<V> items) {
        if (items.stream().distinct().count() < 2) return null;
        return items.stream()
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .min(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }
}
