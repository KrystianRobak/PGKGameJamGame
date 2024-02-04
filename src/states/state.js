export default class State {
    enter() {
    
    }
    
    execute(keys, player) {
        if(player.label != 'enemy') {
            if (keys.keyA.isDown) {
                player.IncVelocityX(-1);
                player.setFlipX(true);
            } else if (keys.keyD.isDown) {
                player.IncVelocityX(1);
                player.setFlipX(false);
            }
        }
    }
}