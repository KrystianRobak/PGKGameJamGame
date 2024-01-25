import AiWaypoint from "./waypoint"

export default class HookWaypoint extends AiWaypoint {
    constructor(scene, x, y) {
        super(scene, x, y, 'hookWaypoint')
    }
    onEntered(body){
        
    }
}