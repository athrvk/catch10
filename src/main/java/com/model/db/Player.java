package com.model.db;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class Player extends User {
    List<String> cards;
    String place;
}
