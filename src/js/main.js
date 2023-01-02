import Phaser from "phaser";
import { PlayGame } from "./scenes/PlayGame";

import "../css/main.css";

var gameConfig = {
    width: 570,
    height: 570,
    scene: PlayGame,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
}


const game = new Phaser.Game(gameConfig)
