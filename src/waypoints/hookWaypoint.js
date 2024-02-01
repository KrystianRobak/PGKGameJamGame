import AiWaypoint from "./waypoint"

export default class HookWaypoint extends AiWaypoint {
    constructor(scene, x, y, hookX, hookY) {
        super(scene, x, y, 'Waypoint')
        this.hookX = hookX;
        this.hookY = hookY;
    }
    onEntered(sprite){
        var pointer = {
            worldX:this.hookX,
            worldY:this.hookY
        }
        sprite.hook.ShootHook(pointer);
    }
}