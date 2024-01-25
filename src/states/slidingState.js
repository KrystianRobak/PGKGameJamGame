import State from "./state";

export default class SlidingState extends State {
    enter(scene, player, side) {
        this.player = player;
        this.side = side;
        player.anims.stop()
        player.anims.play("sliding")
    }

    execute(scene, player) {
        if(player.label != 'enemy') {
            if (scene.cursors.up.isDown && player.controller.blocked.left)
            {
                if(player.jumpFlip) {
                    player.setVelocityY(-10);
                    player.setVelocityX(5);
                    player.jumpFlip = false;
                    player.stateMachine.transition('jump')
                }
            }
            else if (scene.cursors.up.isDown && player.controller.blocked.right)
            {   
                if(player.jumpFlip) {
                    player.setVelocityY(-10);
                    player.setVelocityX(-5);
                    player.jumpFlip = false;
                    player.stateMachine.transition('jump')
                }
            }
            if(!scene.cursors.up.isDown) {
                player.jumpFlip = true;
            }
        }
    }
}
