import AiWaypoint from "./waypoint"

export default class ReleaseHookWaypoint extends AiWaypoint {
    constructor(scene, x, y) {
        super(scene, x, y, 'Waypoint')
    }
    
    onEntered(sprite){
        sprite.hook.DeleteHook();
    }
}