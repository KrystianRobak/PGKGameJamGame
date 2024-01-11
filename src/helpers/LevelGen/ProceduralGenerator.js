import Cell from './Cell.js';
import AssetsKeys from '../AssetsKeys.js';

const width = 40,height = 40
export default class ProceduralGenerator
{
    static createWorldGrid(world) 
    {
        world.make.tilemap({
            key: 'map',
            tileWidth: 16,
            tileHeight: 16
        })

        let worldGrid = new Array(960);
        for(let x = 0; x < 96; x++) 
        {
            worldGrid[x] = new Array(560);
            for(let y = 0; y < 56;y++)
            {
                worldGrid[x][y] = new Cell(world, x*40, y*40, AssetsKeys.IMAGES, 'black', { shape: { type: 'rectangle', width, height }, isStatic: true });
            }
        }

        return worldGrid;
    }

    static generateCave(worldGrid, world) {
        var seed = Math.random() * 65535;

        const data = [];
        
        for(var i = 0 ; i < 48; i++) {
             data[i] = parseInt((Math.random() * 20));
        }

        const stepNumber = 40;
        const sizeOfCave = 4;
        let lastInterpolation = 0;

        for(let x = 0; x < 96; x++) 
        {
            for(let y = 0; y < 56;y++)
            {
            }
        }


        for(var j = 0, x = 1; j <= 96;j += stepNumber, x++) {
            for (let i = 0; i < stepNumber; i++) {

                const lerpingBy = i / stepNumber;
                const interpolatedIndex = this.lerp(data[x], data[x+1], lerpingBy);

                const dataIndex = Math.min(27, Math.max(0, Math.round(interpolatedIndex)));

                for (let z = 0; z <= sizeOfCave; z++) {
                    if(dataIndex + z >= 56 || dataIndex - z <= 0 )
                        continue
                     if(j+i >= 96)
                        continue
                    worldGrid[j+i][dataIndex + z].destroy();
                    worldGrid[j+i][dataIndex - z].destroy();
                }
            }   

        }
        return worldGrid;
    }

    static lerp(firstCoord, secondCoord, lerpingBy) {
        var lerpingBy = (1-Math.cos(lerpingBy*Math.PI))/2;
        return firstCoord * (1 - lerpingBy) + secondCoord * lerpingBy;
    }

}


// if (j == sizeOfCave && lastInterpolation !== interpolation[i]) {
//     const x1 = i * 40;
//     const y1 = (interpolation[i] + j) * 40;
//     const x2 = i * 40;
//     const y2 = (interpolation[i] + j) * 40 + 40;
//     const x3 = i * 40 + 40;
//     const y3 = (interpolation[i] + j) * 40 + 40;

//     const x22 = i * 40 + 40;
//     const y22 = y1;
//     const x32 = i * 40 + 40;
//     const y32 = (interpolation[i] + j) * 40 + 40;

