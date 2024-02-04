import State from "./state";

export default class onGrapplingHookState extends State {
    enter(keys, player) {
        player.anims.stop();
    }
    
    execute(keys, player) {
        super.execute(keys, player);
        if(player.label != 'enemy') {
            if (keys.keyW.isDown) {
                if(player.jumpFlip) {
                    player.setVelocityY(-10);
                    player.hook.DeleteHook();
                    player.jumpFlip = false;
                    player.stateMachine.transition('jump');
                }
            }
            if(keys.keyW.isUp) {
                player.jumpFlip = true;
            }
        }
   }  
}