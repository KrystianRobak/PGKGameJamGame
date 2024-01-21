import State from "./state";

export default class onGrapplingHookState extends State {
    enter(scene, player) {

        player.anims.stop();
    }
    
    execute(scene, player) {
       if (scene.cursors.left.isDown)
        {
            player.IncVelocityX(-0.5);
            player.setFlipX(true);
            player.anims.play('hook', true);
        }
        else if (scene.cursors.right.isDown)
        {
            player.IncVelocityX(0.5);
            player.setFlipX(false);
            player.anims.play('hook', true);
        }
        if (scene.cursors.up.isDown) {
            player.IncVelocityY(-10);
            player.hook.DeleteHook();
            
            player.stateMachine.transition('jump');
            return;
        }

   }  

    
}