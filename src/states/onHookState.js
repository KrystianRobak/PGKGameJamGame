import State from "./state";

export default class onGrapplingHookState extends State {
    enter(scene, player) {

        player.anims.stop();
    }
    
    execute(scene, player) {
       if (scene.cursors.left.isDown)
        {
            player.IncVelocityX(-0.4);
            player.setFlipX(true);
            player.anims.play('run', true);
        }
        else if (scene.cursors.right.isDown)
        {
            player.IncVelocityX(0.4);
            player.setFlipX(false);
            player.anims.play('run', true);
        }
        if (scene.cursors.up.isDown) {
            player.setVelocityY(-10);
            player.stateMachine.transition('jump', 2);
            return;
        }
   }  

    
}