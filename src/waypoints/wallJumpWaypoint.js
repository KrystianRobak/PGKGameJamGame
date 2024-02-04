import AiWaypoint from "./waypoint"

export default class WallJumpWaypoint extends AiWaypoint  {
    constructor(scene, x, y, side) {
        super(scene, x, y, 'Waypoint')
        this.side = side;
    }
    onEntered(sprite){
        sprite.IncVelocityY(-10);
        sprite.setVelocityX(5*this.side)
    }
}