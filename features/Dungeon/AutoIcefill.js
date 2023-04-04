
let rotation
function checkRotation() {
    const px = Math.floor(Player.getX()); const py = Math.floor(Player.getY()); const pz = Math.floor(Player.getZ())  
    if (getBlockNameAt(px+4,py,pz) == "minecraft:stone_brick_stairs") {
        rotation = "east"
    } else if (getBlockNameAt(px-4,py,pz) == "minecraft:stone_brick_stairs") {
        rotation = "west"
    } else if (getBlockNameAt(px,py,pz+4) == "minecraft:stone_brick_stairs") {
        rotation = "south"
    } else if (getBlockNameAt(px,py,pz-4) == "minecraft:stone_brick_stairs") {
        rotation = "north"
    }
}

const getBlockNameAt = (x,y,z) => {
    return World.getBlockAt(new BlockPos(x,y,z)).type.name
}