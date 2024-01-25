import AiWaypoint from "./waypoint"

export default class JumpWaypoint extends AiWaypoint  {
    constructor(scene, x, y) {
        super(scene, x, y, 'jumpWaypoint')
    }
    onEntered(sprite){
        sprite.IncVelocityY(-10);
    }
}