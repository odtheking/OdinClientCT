import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { Executors } from "../../java-stuff";
import { data } from "../../stuff/guidk"
import { getPhase } from "../../utils";

const green = [
    { x: 45, y: 169, z: 44 },
    { x: 46, y: 169, z: 44 },
    { x: 47, y: 169, z: 44 },
    { x: 44, y: 169, z: 43 },
    { x: 45, y: 169, z: 43 },
    { x: 46, y: 169, z: 43 },
    { x: 47, y: 169, z: 43 },
    { x: 48, y: 169, z: 43 },
    { x: 43, y: 169, z: 42 },
    { x: 44, y: 169, z: 42 },
    { x: 45, y: 169, z: 42 },
    { x: 46, y: 169, z: 42 },
    { x: 47, y: 169, z: 42 },
    { x: 48, y: 169, z: 42 },
    { x: 49, y: 169, z: 42 },
    { x: 43, y: 169, z: 41 },
    { x: 44, y: 169, z: 41 },
    { x: 45, y: 169, z: 41 },
    { x: 46, y: 169, z: 41 },
    { x: 47, y: 169, z: 41 },
    { x: 48, y: 169, z: 41 },
    { x: 49, y: 169, z: 41 },
    { x: 43, y: 169, z: 40 },
    { x: 44, y: 169, z: 40 },
    { x: 45, y: 169, z: 40 },
    { x: 46, y: 169, z: 40 },
    { x: 47, y: 169, z: 40 },
    { x: 48, y: 169, z: 40 },
    { x: 49, y: 169, z: 40 },
    { x: 44, y: 169, z: 39 },
    { x: 45, y: 169, z: 39 },
    { x: 46, y: 169, z: 39 },
    { x: 47, y: 169, z: 39 },
    { x: 48, y: 169, z: 39 },
    { x: 45, y: 169, z: 38 },
    { x: 46, y: 169, z: 38 },
    { x: 47, y: 169, z: 38 }
]

const yellow = [
    { x: 45, y: 169, z: 68 },
    { x: 46, y: 169, z: 68 },
    { x: 47, y: 169, z: 68 },
    { x: 44, y: 169, z: 67 },
    { x: 45, y: 169, z: 67 },
    { x: 46, y: 169, z: 67 },
    { x: 47, y: 169, z: 67 },
    { x: 48, y: 169, z: 67 },
    { x: 43, y: 169, z: 66 },
    { x: 44, y: 169, z: 66 },
    { x: 45, y: 169, z: 66 },
    { x: 46, y: 169, z: 66 },
    { x: 47, y: 169, z: 66 },
    { x: 48, y: 169, z: 66 },
    { x: 49, y: 169, z: 66 },
    { x: 43, y: 169, z: 65 },
    { x: 44, y: 169, z: 65 },
    { x: 45, y: 169, z: 65 },
    { x: 46, y: 169, z: 65 },
    { x: 47, y: 169, z: 65 },
    { x: 48, y: 169, z: 65 },
    { x: 49, y: 169, z: 65 },
    { x: 43, y: 169, z: 64 },
    { x: 44, y: 169, z: 64 },
    { x: 45, y: 169, z: 64 },
    { x: 46, y: 169, z: 64 },
    { x: 47, y: 169, z: 64 },
    { x: 48, y: 169, z: 64 },
    { x: 49, y: 169, z: 64 },
    { x: 44, y: 169, z: 63 },
    { x: 45, y: 169, z: 63 },
    { x: 46, y: 169, z: 63 },
    { x: 47, y: 169, z: 63 },
    { x: 48, y: 169, z: 63 },
    { x: 45, y: 169, z: 62 },
    { x: 46, y: 169, z: 62 },
    { x: 47, y: 169, z: 62 }
]


const glass = new BlockType("glass").getDefaultState()

function setToGlass(x, y, z) {
    const pos = new BlockPos(x * 1, y * 1, z * 1);
    World.getWorld().func_175656_a(pos.toMCBlock(), glass);
}

var runLoop = Executors.newSingleThreadExecutor();

runLoop.execute(() => {
    register("step", () => {
        if (!World.isLoaded() || !data.qol.fuckDiorite.toggle || getPhase() !== "p2") return
        for (let height = 0; height < 37; height++) {
            for (let block of green) {
                try {
                    let blockName = World.getBlockAt(block.x, block.y + height, block.z).type.getName()
                    if (blockName !== "Stone") continue
                    setToGlass(block.x, block.y + height, block.z)
                } catch (e) { }
            }
            for (let block of yellow) {
                try {
                    let blockName = World.getBlockAt(block.x, block.y + height, block.z).type.getName()
                    if (blockName !== "Stone") continue
                    setToGlass(block.x, block.y + height, block.z)
                } catch (e) { }
            }
        }
    }).setFps(10)
});



