import { saveAs } from 'file-saver';

export default class Recorder {
    constructor() {
        this.partRecording = [];
        this.recordings = [];
        this.part = 1;
    }

    recordFrame(player, input) {
        if(player.hook.shootingHook){
            this.recordings.push(
                [player.x.toFixed(2),
                 player.y.toFixed(2),
                 input.left.isDown ? 1 : 0,
                 input.right.isDown ? 1 : 0,
                 input.up.isDown ? 1 : 0,
                 player.hook.hitHook ? 1 : 0,
                 player.hook.hookPos
                ]);
        } else {
            this.recordings.push(
                [player.x.toFixed(2),
                 player.y.toFixed(2),
                 input.left.isDown ? 1 : 0,
                 input.right.isDown ? 1 : 0,
                 input.up.isDown ? 1 : 0,
                 player.hook.hitHook ? 1 : 0,
                ]);   

        }
    }

    saveRecording() {
        this.partRecording.push(this.recordings)
        this.recordings = [];
        
    }

    dumpRecordings() {
        this.partRecording.forEach(elem => {
            const recordingJSON = JSON.stringify(elem);
            const blob = new Blob([recordingJSON], { type: 'application/json' });
            saveAs(blob, "level1enemy1" + this.part + ".json");
            this.part++;
        })
    }
}
