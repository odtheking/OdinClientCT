import { Promise } from "../../../PromiseV2"
import { getFlooredPlayerCoords, modMessage, clipTo, getBlockNameAt } from "../../utils/utils"
import { floors } from "../../utils/icefillfloors"
import { data } from "../../gui"
import Dungeon from "../../../BloomCore/dungeons/Dungeon"

let scanned = false
let currentPatterns = []
const System = Java.type("java.lang.System")

register("step", () => {
    if (!data.dungeons.autoIcefill.toggle || scanned || !Dungeon.inDungeon) return
    const [px,py,pz] = getFlooredPlayerCoords()
    if (py !== 70 || getBlockNameAt(px,py-1,pz) !== "Ice") return
    scanned = true
    scan(px,py,pz, 0)
}).setFps(5)

const transform = (x, z, rotation) => {
    switch (rotation) {
        case "east":
            return [x,z]
        case "west":
            return [-x,-z]
        case "south":
            return [z,x]
        case "north":
            return [z,-x]
    }
}


const scan = (x,y,z, floorIndex) => {
    modMessage("scanning")
    const rotation = checkRotation(x,y,z, floorIndex)
    if (!rotation) {
        modMessage("no rotation found")
        scanned = false
        return
    }
    const floor = floors[floorIndex]
    let pattern
    const startTime = System.nanoTime()
    outerLoop: for (let i = 0; i < floor.length; i++) {
        pattern = floor[i]
        for (let block of pattern) {
            let [bx, bz] = transform(block.x, block.z, rotation)
            if (getBlockNameAt(x + bx, y, z + bz) !== "Air") {
                if (i >= floor.length) {
                    modMessage("no more patterns, stopping")
                    return
                }
                continue outerLoop
            }
        }
        break
    }

    const scanTime = (System.nanoTime()-startTime)/1000000
    modMessage(`Scan took ${scanTime}ms`)

    renderPattern(x,y,z, rotation)
    currentPatterns.push(pattern)

    move(x,y-1,z, currentPatterns[floorIndex], rotation, floorIndex)
}

const move = (x,y,z, pattern, rotation, floorIndex) => {
    waitUntilPacked(x, y, z).then(() => {
        [bx,bz] = transform(pattern[0].x, pattern[0].z, rotation)
        modMessage(`${x + bx}, ${y + 1},${z + bz}`)
        clipTo(x + bx, y + 1, z + bz)
    })
    for (let i = 0; i < pattern.length; i++) {
        const block = pattern[i]
        if (i + 1 < pattern.length) var nextblock = pattern[i+1]
        let [bx, bz] = transform(block.x, block.z, rotation)
        let [bx1, bz1] = transform(nextblock.x, nextblock.z, rotation)
        waitUntilPacked(x + bx, y, z + bz).then(() => {
            clipTo(x + bx1, y + 1, z + bz1)
        })
    }
    if (floorIndex === 2) return
    let [bx1, bz1] = transform(pattern[pattern.length-1].x, pattern[pattern.length-1].z, rotation)
    waitUntilPacked(x + bx1, y, z + bz1).then(() => {
        clipToNext(x,y,z, rotation, bx1, bz1, floorIndex)
    })
}

const clipToNext = (x,y,z, rotation, bx1, bz1, floorIndex) => {
    setTimeout(() => {
        [nx, nz] = transform(0.5, 0, rotation)
        clipTo(x + bx1 + nx, y + 1.5, z + bz1 + nz)
        setTimeout(() => {
            clipTo(x + bx1 + 2*nx, y + 2, z + bz1 + 2*nz)
            setTimeout(() => {
                clipTo(x + bx1 + 4*nx, y + 2, z + bz1 + 4*nz)
                scan(...getFlooredPlayerCoords(), floorIndex+1)
            }, 100);
        }, 100);
    }, 100);
}

const checkRotation = (x,y,z, floorIndex) => {
    const a = (floorIndex+1)*2+2
    if      (getBlockNameAt(x + a, y, z) == "Stone Brick Stairs") return "east"
    else if (getBlockNameAt(x - a, y, z) == "Stone Brick Stairs") return "west"
    else if (getBlockNameAt(x, y, z + a) == "Stone Brick Stairs") return "south"
    else if (getBlockNameAt(x, y, z - a) == "Stone Brick Stairs") return "north"
}

const waitUntilPacked = (x,y,z) => new Promise((resolve, reject) => {
    const check = () => {
        if (!data.dungeons.autoIcefill.toggle) reject()
        if (getBlockNameAt(x,y,z) === "Packed Ice") resolve()
        else setTimeout(check, 10);
    }
    check()
});

function getRainbowColor() {
  const time = new Date().getTime();
  const frequency = 0.001;
  const r = Math.sin(frequency * time + 0) * 127 + 128;
  const g = Math.sin(frequency * time + 2) * 127 + 128;
  const b = Math.sin(frequency * time + 4) * 127 + 128;
  return [r / 255, g / 255, b / 255];
}

let renderRotation
let tx = []
let ty = []
let tz = []
const renderPattern = (x, y, z, rotation) => {
    renderRotation = rotation
    tx.push(x)
    ty.push(y)
    tz.push(z)
}

register("renderWorld", () => {
    if (currentPatterns.length == 0) return

    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(10);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GlStateManager.func_179094_E();
    Tessellator.begin(GL11.GL_LINE_STRIP).colorize(...getRainbowColor(), 1);

    for (let i = 0; i < currentPatterns.length; i++) {
        let pattern = currentPatterns[i];
        let [rx, ry, rz] = [tx[i], ty[i], tz[i]]
        Tessellator.pos(rx + 0.5, ry + 0.1, rz + 0.5);
        let [bx, bz] = transform(pattern[i].x, pattern[i].z, renderRotation)
        Tessellator.pos(rx + bx + 0.5, ry + 0.1, rz + bz + 0.5);

        for (let j = 1; j < pattern.length; j++) {
            [bx, bz] = transform(pattern[j-1].x, pattern[j-1].z, renderRotation)
            Tessellator.pos(rx + bx + 0.5, ry + 0.1, rz + bz + 0.5);

            [bx, bz] = transform(pattern[j].x, pattern[j].z, renderRotation)
            Tessellator.pos(rx + bx + 0.5, ry + 0.1, rz + bz + 0.5);
        }
    }

    Tessellator.draw();
    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
})

register("worldLoad", () => {
    currentPatterns = []
    scanned = false
    tx = []
    ty = []
    tz = []    
})