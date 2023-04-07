import { Promise } from "../../../PromiseV2"
import { getFlooredPlayerCoords, modMessage, clipTo, getBlockNameAt } from "../../utils/utils"
import { floors } from "../../utils/icefillfloors"
import { data } from "../../gui"

let scanned = false
let currentPatterns = []
const System = Java.type("java.lang.System")

register("tick", () => {
    if (!data.dungeons.autoIcefill.toggle) return
    if (scanned) return
    // if (!Dungeon.inDungeon) return
    [px,py,pz] = getFlooredPlayerCoords()
    if (py !== 70) return
    modMessage(getBlockNameAt(px,py-1,pz))
    if (getBlockNameAt(px,py-1,pz) !== "Ice") return
    scan(px,py,pz, 0)
    scanned = true
})

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
    startTime = System.nanoTime()
    modMessage("scanning")
    const rotation = checkRotation(x,y,z, floorIndex)
    if (!rotation) {
        modMessage("no rotation found")
        scanned = false
        return
    }
    // rotation : north, east, south, west
    const floor = floors[floorIndex]
    // block above currently checking block in pattern == air then continue loop
    let pattern
    outerLoop: for (let i = 0; i < floor.length; i++) {
        modMessage(`checking pattern ${i}`)
        pattern = floor[i];
        for (let block of pattern) {
            let [bx, bz] = transform(block.x, block.z, rotation)
            let blockName = getBlockNameAt(x + bx, y, z + bz)
            modMessage(`block at ${x+bx}, ${y}, ${z+bz}: ${blockName}`)
            if (blockName !== "Air") {
                modMessage(`not air, moving to next pattern, it was ${blockName} at ${x+bx}, ${y}, ${z+bz}`)
                if (i >= floor.length) {
                    modMessage("no more patterns, stopping")
                    return
                }
                continue outerLoop
            }
        }
        break
    }
    currentPatterns.push(pattern)

    const endTime = System.nanoTime()
    const scanTime = (endTime-startTime)/1000000
    modMessage(`Scan took ${scanTime}ms`)
    move(x,y-1,z, currentPatterns[floorIndex], rotation, floorIndex)
}

const move = (x,y,z, pattern, rotation, floorIndex) => {
    waitUntilPacked(x, y, z).then(() => {
        [bx,bz] = transform(pattern[0].x, pattern[0].z, rotation)
        modMessage(`${x + bx}, ${y + 1},${z + bz}`)
        clipTo(x + bx, y + 1, z + bz)
    })
    for (let i = 0; i < pattern.length; i++) {
        const block = pattern[i];
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
        modMessage("moving up " + floorIndex)
        clipToNext(x,y,z, rotation, bx1, bz1, floorIndex)
    })
}

const clipToNext = (x,y,z, rotation, bx1, bz1, floorIndex) => {
    modMessage("clipping to next")
    setTimeout(() => {
        [px, pz] = transform(0.5, 0, rotation)
        clipTo(x + bx1 + px, y + 1.5, z + bz1 + pz)

        setTimeout(() => {
            clipTo(x + bx1 + 2*px, y + 2, z + bz1 + 2*pz)

            setTimeout(() => {
                clipTo(x + bx1 + 4*px, y + 2, z + bz1 + 4*pz)
                scan(...getFlooredPlayerCoords(), floorIndex+1)
            }, 100);
        }, 100);
    }, 100);
}



const checkRotation = (x,y,z, floorIndex) => {
    const a = (floorIndex+1)*2+2
    if (getBlockNameAt(x + a, y, z) == "Stone Brick Stairs") {
        return "east"
    } else if (getBlockNameAt(x - a, y, z) == "Stone Brick Stairs") {
        return "west"
    } else if (getBlockNameAt(x, y, z + a) == "Stone Brick Stairs") {
        return "south"
    } else if (getBlockNameAt(x, y, z - a) == "Stone Brick Stairs") {
        return "north"
    }
}

const waitUntilPacked = (x,y,z) => new Promise((resolve, reject) => {
    const check = () => {
        if (!data.dungeons.autoIcefill.toggle) reject()
        const block = getBlockNameAt(x,y,z)
        if (block === "Packed Ice") {
            resolve()
        } else {
            setTimeout(check, 10);
        }
    }
    check()
});