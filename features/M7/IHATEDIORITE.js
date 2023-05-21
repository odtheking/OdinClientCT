import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { data } from "../../gui"
import { getPhase, Executors, getBlockPosIdAt } from "../../utils/utils"

const greenArray = [
    new BlockPos(45, 169, 44),
    new BlockPos(46, 169, 44),
    new BlockPos(47, 169, 44),
    new BlockPos(44, 169, 43),
    new BlockPos(45, 169, 43),
    new BlockPos(46, 169, 43),
    new BlockPos(47, 169, 43),
    new BlockPos(48, 169, 43),
    new BlockPos(43, 169, 42),
    new BlockPos(44, 169, 42),
    new BlockPos(45, 169, 42),
    new BlockPos(46, 169, 42),
    new BlockPos(47, 169, 42),
    new BlockPos(48, 169, 42),
    new BlockPos(49, 169, 42),
    new BlockPos(43, 169, 41),
    new BlockPos(44, 169, 41),
    new BlockPos(45, 169, 41),
    new BlockPos(46, 169, 41),
    new BlockPos(47, 169, 41),
    new BlockPos(48, 169, 41),
    new BlockPos(49, 169, 41),
    new BlockPos(43, 169, 40),
    new BlockPos(44, 169, 40),
    new BlockPos(45, 169, 40),
    new BlockPos(46, 169, 40),
    new BlockPos(47, 169, 40),
    new BlockPos(48, 169, 40),
    new BlockPos(49, 169, 40),
    new BlockPos(44, 169, 39),
    new BlockPos(45, 169, 39),
    new BlockPos(46, 169, 39),
    new BlockPos(47, 169, 39),
    new BlockPos(48, 169, 39),
    new BlockPos(45, 169, 38),
    new BlockPos(46, 169, 38),
    new BlockPos(47, 169, 38)
]

const yellowArray = [
    new BlockPos(45, 169, 68),
    new BlockPos(46, 169, 68),
    new BlockPos(47, 169, 68),
    new BlockPos(44, 169, 67),
    new BlockPos(45, 169, 67),
    new BlockPos(46, 169, 67),
    new BlockPos(47, 169, 67),
    new BlockPos(48, 169, 67),
    new BlockPos(43, 169, 66),
    new BlockPos(44, 169, 66),
    new BlockPos(45, 169, 66),
    new BlockPos(46, 169, 66),
    new BlockPos(47, 169, 66),
    new BlockPos(48, 169, 66),
    new BlockPos(49, 169, 66),
    new BlockPos(43, 169, 65),
    new BlockPos(44, 169, 65),
    new BlockPos(45, 169, 65),
    new BlockPos(46, 169, 65),
    new BlockPos(47, 169, 65),
    new BlockPos(48, 169, 65),
    new BlockPos(49, 169, 65),
    new BlockPos(43, 169, 64),
    new BlockPos(44, 169, 64),
    new BlockPos(45, 169, 64),
    new BlockPos(46, 169, 64),
    new BlockPos(47, 169, 64),
    new BlockPos(48, 169, 64),
    new BlockPos(49, 169, 64),
    new BlockPos(44, 169, 63),
    new BlockPos(45, 169, 63),
    new BlockPos(46, 169, 63),
    new BlockPos(47, 169, 63),
    new BlockPos(48, 169, 63),
    new BlockPos(45, 169, 62),
    new BlockPos(46, 169, 62),
    new BlockPos(47, 169, 62)
]

const green = new Set(greenArray)
const yellow = new Set(yellowArray)

const glass = new BlockType("glass").getDefaultState()

var runLoop = Executors.newSingleThreadExecutor();

runLoop.execute(() => {
    register("step", () => {
        if (!World.isLoaded() || !data.m7.fuckDiorite.toggle) return
        for (let height = 0; height < 37; height++) {
            for (let block of green) {
                if (getBlockPosIdAt(block.add(0, height, 0)) === 1) {
                    World.getWorld().func_175656_a(block.add(0, height, 0).toMCBlock(), glass);
                }
            }
            for (let block of yellow) {
                if (getBlockPosIdAt(block.add(0, height, 0)) === 1) {
                    World.getWorld().func_175656_a(block.add(0, height, 0).toMCBlock(), glass);
                } 
            }
        }
    }).setFps(10)
});