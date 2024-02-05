import State from "./state";

export default class SlidingState extends State {
    enter(scene, player, side) {
        this.player = player;
        this.side = side;
        player.anims.play("sliding", true)
    }

    execute(keys, player) {
        super.execute(keys, player);
        if(player.label != 'enemy') {
            if (keys.keyW.isDown && player.controller.blocked.left)
            {
                if(player.jumpFlip) {
                    player.setVelocityY(-10);
                    player.setVelocityX(5);
                    player.jumpFlip = false;
                    player.stateMachine.transition('jump')
                }
            }
            else if (keys.keyW.isDown && player.controller.blocked.right)
            {   
                if(player.jumpFlip) {
                    player.setVelocityY(-10);
                    player.setVelocityX(-5);
                    player.jumpFlip = false;
                    player.stateMachine.transition('jump')
                }
            }
            if(!keys.keyW.isDown) {
                player.jumpFlip = true;
            }
        }
    }
}
