import Phaser from "phaser";

import BackgroundDay from "../../assets/background-day.png";
import Base from "../../assets/base.png";
import Flappy from "../../assets/yellowbird.png";
import pipeGround from "../../assets/pipe-green.png";
import pipeSky from "../../assets/pipe-green-rotate.png";
import { Player } from "../prefabs/Player";
import { Pipe } from "../prefabs/Pipe";


export class PlayGame extends Phaser.Scene {
    constructor() {
        super('PlayGame')
    }
    preload() {
        this.load.image('background', BackgroundDay);
        this.load.image('base', Base);
        this.load.image('pipeGround', pipeGround)
        this.load.image('pipeSky', pipeSky)
        this.load.spritesheet('flappy', 
            Flappy,
            { frameWidth: 34, framgeHeight: 24, startFrame: 0, endFrame: 2 }
        );
    }
    init() {
        this.pipeVelocityX = -120;
        this.pipeCreateTime = 0;
        this.group = this.add.group()
    }
    create() {
        console.log()
        this.background1 = this.add.tileSprite(0, 0, this.game.config.width, 512, 'background').setOrigin(0);
        this.base = this.add.tileSprite(0, this.game.config.height - 112, this.game.config.width, 112, 'base').setOrigin(0);
        this.base.setDepth(1)
        this.player = new Player(this)
        this.physics.add.overlap(this.player, this.group, this.onOverlap, undefined, this);

        this.input.on('pointerdown', this.player.move.bind(this.player));
        this.physics.add.existing(this.base, true);
        this.physics.add.collider(this.player, this.base);

    }
    
    onOverlap(source, target) {
        target.destroy()
    }
    
    update() {
        if (this.pipeCreateTime > 1700) {
            this.pipeCreateTime = 0;
            console.log(this.game.config.height)
            const pipeGround = Pipe.generate(this, 600, Phaser.Math.Between(this.game.config.height - 200, this.game.config.height - 432), 'pipeGround')
            const pipeSky = Pipe.generate(this, 600, -100, 'pipeSky')
            this.group.add(pipeGround);
            this.group.add(pipeSky);
            pipeGround.move()
            pipeSky.move()
        } else {
            this.pipeCreateTime += parseInt(this.game.loop._target)
        }
        // this.pipes.update()
        this.background1.tilePositionX += 1;
        this.base.tilePositionX += 2;
    }
}