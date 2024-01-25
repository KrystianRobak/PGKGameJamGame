import State from "./state";

export default class SlidingState extends State {
    enter(scene, player, side) {
        this.player = player;
        this.side = side;
        player.anims.stop()
    }

    execute(scene, player) {
        if(player.label != 'enemy') {
            if (scene.cursors.up.isDown && player.controller.blocked.left)
            {
                player.setVelocityY(-10);
                player.setVelocityX(2);
                player.stateMachine.transition('jump')
            }
            else if (scene.cursors.up.isDown && player.controller.blocked.right)
            {
                player.setVelocityY(-10);
                player.setVelocityX(-2);
                player.stateMachine.transition('jump')
            }
        }
    }
}
