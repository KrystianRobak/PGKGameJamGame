import AssetsKeys from '../helpers/AssetsKeys';

export default class AiWaypoint extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, labelName) {
        super(scene.matter.world, x, y, AssetsKeys.IMAGES, 'white', { label: labelName });
        this.setSensor(true).setStatic(true);
    }
    onEntered() {
        
    }
}