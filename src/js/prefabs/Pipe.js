import Phaser from "phaser";

export class Pipe extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, name)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setEnable(true)
        this.body.setAllowGravity(false)
        this.setOrigin(0,0)
        this.setDepth(0)
    }
    static generate (scene, x, y, name) {
        return new Pipe(scene, x, y, name)
    }
    move() {
        this.body.setVelocityX(-120)
    }
}

export class Pipes extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene);

        this.scene = scene;
    }
    createPipe() {
        let pipe = Pipe.generate(this.scene, 300, 400, 'pipeGround')
        this.add(pipe);
        pipe.move()
    }

}