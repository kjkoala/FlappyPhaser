import Phaser from "phaser";

export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 100, 300, 'flappy')

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('flappy', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.init()
    }
    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true;
        this.play('fly')
    }
    move() {
        this.body.setVelocityY(-300);
    }
}