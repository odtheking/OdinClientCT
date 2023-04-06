import { Promise } from "../../../PromiseV2"
import { getFlooredPlayerCoords, modMessage } from "../../utils"
import { firstfloors, secondfloors, thirdfloors } from "../../stuff/icefillfloors"

let scanned = false
register("tick", () => {
    if (scanned) return
    [px,py,pz] = getFlooredPlayerCoords()
    if (py !== 70) return
    modMessage(getBlockNameAt(px,py-1,pz))
    if (getBlockNameAt(px,py-1,pz) !== "Ice") return
    scan(px,py,pz)
    scanned = true
})

const directions = {
    "north": {
        "x": [
            0,
            0,
            0,
        ],
        "z": [
            -4,
            -6,
            -8
        ]
    },
}

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

let currentPatterns = []

const scan = (x,y,z) => {
    modMessage("scanning")
    const rotation = checkRotation(x,y,z)

    // rotation : north, east, south, west

    // block above currently checking block in pattern == air then continue loop
    let pattern
    outerLoop: for (let i = 0; i < firstfloors.length; i++) {
        pattern = firstfloors[i];
        for (let block of pattern) {
            modMessage(rotation)
            modMessage(block.x)
            modMessage(block.z)
            let [bx, bz] = transform(block.x, block.z, rotation)
            let blockName = getBlockNameAt(x + bx, y, z + bz)
            modMessage(`block at ${x+bx}, ${y}, ${z+bz}: ${blockName}`)
            if (blockName !== "tile.air.name") {
                modMessage("not air, moving to next pattern")
                continue outerLoop
            }
        }
        
    }
    currentPatterns.push(pattern)

    // modMessage(i)
    modMessage(currentPatterns)

    move(x,y,z, currentPatterns[0], rotation)
}

const move = (x,y,z, pattern, rotation) => {
    for (let block of pattern) {
        let [bx, bz] = transform(block.x, block.z, rotation)
        waitUntilPacked(x + bx, y, z + bz).then(() => {
            clipTo(x + bx, y, z + bz)
        })
    }
}

const clipTo = (x,y,z) => {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y,z)
}

const checkRotation = (x,y,z) => {
    // modMessage(getBlockNameAt(x-4,y,z))
    if (getBlockNameAt(x+4,y,z) == "Stone Brick Stairs") {
        return "east"
    } else if (getBlockNameAt(x-4,y,z) == "Stone Brick Stairs") {
        return "west"
    } else if (getBlockNameAt(x,y,z+4) == "Stone Brick Stairs") {
        return "south"
    } else if (getBlockNameAt(x,y,z-4) == "Stone Brick Stairs") {
        return "north"
    }
}

const getBlockNameAt = (x,y,z) => {
    const name = World.getBlockAt(new BlockPos(x,y,z)).type.name
    if (name === "rrtile.air.name") return "air"
    else return name
}

// pro gamering



const waitUntilPacked = (x,y,z) => new Promise((resolve) => {
    const check = () => {
        const block = getBlockNameAt(x,y,z)
        if (block === "minecraft:packed_ice") {
            resolve()
        } else {
            setTimeout(check, 10);
        }
    }
    check()
});



waitUntilPacked(getBlockNameAt(33, 71, 48)).then(() => {
  modMessage(`Packed Ice at ${x},${y},${z}!`);
});


