import Cell from './Cell.js';
import AssetsKeys from '../AssetsKeys.js';

const width = 40,height = 40
export default class ProceduralGenerator
{
    static createWorldGrid(world) 
    {
        let worldGrid = new Array(96);
        

        for(let x = 0; x < 96; x++) 
        {
            worldGrid[x] = new Array(28);
            for(let y = 0; y < 28;y++)
            {
                worldGrid[x][y] = new Cell(world, x*40, y*40, AssetsKeys.IMAGES, 'black', { shape: { type: 'rectangle', width, height }, isStatic: true });
            }
        }

        return worldGrid;
    }

    static perlinEval(x) {

    }

    static generatePerlinNoise(worldGrid, world) {
        var seed = Math.random() * 65535;
        
        //let perlinValues = new Array(1920);

        const data = [];
        
        for(var i = 0 ; i < 48; i++) {
             data[i] = parseInt((Math.random() * 27));
        }

        const interpolation = [];

        // ...

for (let i = 0; i < 40; i++) {
    // Liniowa interpolacja pomiędzy wylosowanymi elementami
    const lerpingBy = i / 40;
    const interpolatedIndex = this.lerp(data[0], data[1], lerpingBy);

    const dataIndex = Math.min(27, Math.max(0, Math.round(interpolatedIndex)));

    interpolation[i] = dataIndex;
}

const stepNumber = 40;
const sizeOfCave = 4;
let lastInterpolation = 0;

for (let i = 0; i < 40; i++) {
    for (let j = 0; j <= sizeOfCave; j++) {
        if (j == sizeOfCave && lastInterpolation !== interpolation[i]) {
            const x1 = i * 40;
            const y1 = (interpolation[i] + j) * 40;
            const x2 = i * 40;
            const y2 = (interpolation[i] + j) * 40 + 40;
            const x3 = i * 40 + 40;
            const y3 = (interpolation[i] + j) * 40 + 40;

            const x22 = i * 40 + 40;
            const y22 = y1;
            const x32 = i * 40 + 40;
            const y32 = (interpolation[i] + j) * 40 + 40;

            if (lastInterpolation > interpolation[i]) {
                worldGrid[i][interpolation[i] + j] = new Cell(
                    world,
                    x1,
                    (interpolation[i] + j) * 40,
                    AssetsKeys.IMAGES,
                    'triangle',
                    {
                        shape: {
                            type: 'triangle',
                            width,
                            height,
                            x1,
                            y1,
                            x2,
                            y2,
                            x3,
                            y3,
                        },
                        isStatic: true,
                    }
                );
                worldGrid[i][interpolation[i] - j] = new Cell(
                    world,
                    x1,
                    (interpolation[i] - j) * 40,
                    AssetsKeys.IMAGES,
                    'triangle',
                    {
                        shape: {
                            type: 'triangle',
                            width,
                            height,
                            x1,
                            y1,
                            x2: x22,
                            y2,
                            x3: x32,
                            y3: y32,
                        },
                        isStatic: true,
                    }
                );
            } else {
                worldGrid[i][interpolation[i] + j] = new Cell(
                    world,
                    i * 40,
                    (interpolation[i] + j) * 40,
                    AssetsKeys.IMAGES,
                    'triangle',
                    {
                        shape: {
                            type: 'triangle',
                            width,
                            height,
                            x1,
                            y1,
                            x2,
                            y2,
                            x3,
                            y3,
                        },
                        isStatic: true,
                        angle: 180,
                    }
                );
                worldGrid[i][interpolation[i] - j] = new Cell(
                    world,
                    i * 40,
                    (interpolation[i] - j) * 40,
                    AssetsKeys.IMAGES,
                    'triangle',
                    {
                        shape: {
                            type: 'triangle',
                            width,
                            height,
                            x1,
                            y1,
                            x2: x22,
                            y2,
                            x3: x32,
                            y3: y32,
                        },
                        isStatic: true,
                        angle: 180,
                    }
                );
            }
        }
        worldGrid[i][interpolation[i] + j].setTexture(AssetsKeys.IMAGES, 'white');
        worldGrid[i][interpolation[i] - j].setTexture(AssetsKeys.IMAGES, 'white');
    }
    lastInterpolation = interpolation[i];
}
// ...

        

        return data;
    }

    static lerp(firstCoord, secondCoord, lerpingBy) {
        return firstCoord * (1 - lerpingBy) + secondCoord * lerpingBy;
    }

}