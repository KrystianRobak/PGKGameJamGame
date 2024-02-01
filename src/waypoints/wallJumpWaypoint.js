import AiWaypoint from "./waypoint"

export default class wallJumpWaypoint extends AiWaypoint  {
    constructor(scene, x, y) {
        super(scene, x, y, 'Waypoint')
    }
    onEntered(sprite){
        sprite.IncVelocityY(-10);
    }
}