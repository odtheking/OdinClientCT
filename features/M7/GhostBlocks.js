import { BlockPoss, Blocks } from "../../../BloomCore/utils/Utils"
import { data } from "../../gui"
import { modMessage } from "../../utils/utils"
import Dungeon from "../../../BloomCore/dungeons/Dungeon"

// Ghost Blocks
const ghostBind = new KeyBind("Ghost Bind", Keyboard.KEY_NONE, "OdinClient")

const setToAir= (x, y, z) => {
    if (!World.isLoaded()) return
    const pos = new BlockPos(x * 1, y * 1, z * 1);
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(pos.toMCBlock())
}

register('tick', () => {
    if (ghostBind.isKeyDown()) {
        if (Player?.lookingAt()?.toString().includes('minecraft:air') || Player?.lookingAt()?.toString().includes('minecraft:chest') || Player?.lookingAt()?.toString().includes('minecraft:trapped_chest') || Player?.lookingAt()?.toString().includes('minecraft:lever') || Player?.lookingAt()?.toString().includes('minecraft:stone_button') || Player?.lookingAt()?.toString().includes('minecraft:skull')) return
        setToAir(Player?.lookingAt()?.getX(), Player?.lookingAt()?.getY(), Player?.lookingAt()?.getZ())
    }
})


register('step', () => {
    if (!data.m7.preGhostBlock.toggle) return
    floor = Dungeon.floor
    if (!floor) return
    if (floor !== "F7" && floor !== "M7") return
    for (let block of glassBlocks) {
        setToAir(block.x, block.y, block.z)
    }    
}).setFps(2)



export const glassBlocks = [
    //phase 1
    {x:88, y:220, z:61},
    {x:88, y:219, z:61},
    {x:88, y:218, z:61},
    {x:88, y:217, z:61},
    {x:88, y:216, z:61},
    {x:88, y:215, z:61},
    {x:88, y:214, z:61},
    {x:88, y:213, z:61},
    {x:88, y:212, z:61},
    {x:88, y:211, z:61},
    {x:88, y:210, z:61},

    //phase 2
    {x:88, y:167, z:41},
    {x:89, y:167, z:41},
    {x:90, y:167, z:41},
    {x:91, y:167, z:41},
    {x:92, y:167, z:41},
    {x:93, y:167, z:41},
    {x:94, y:167, z:41},
    {x:95, y:167, z:41},
    {x:88, y:166, z:41},
    {x:89, y:166, z:41},
    {x:90, y:166, z:41},
    {x:91, y:166, z:41},
    {x:92, y:166, z:41},
    {x:93, y:166, z:41},
    {x:94, y:166, z:41},
    {x:95, y:166, z:41},
    {x:88, y:165, z:41},
    {x:89, y:165, z:41},
    {x:90, y:165, z:41},
    {x:91, y:165, z:41},
    {x:92, y:165, z:41},
    {x:93, y:165, z:41},
    {x:94, y:165, z:41},
    {x:95, y:165, z:41},
    {x:88, y:167, z:40},
    {x:89, y:167, z:40},
    {x:90, y:167, z:40},
    {x:91, y:167, z:40},
    {x:92, y:167, z:40},
    {x:93, y:167, z:40},
    {x:94, y:167, z:40},
    {x:95, y:167, z:40},
    {x:88, y:166, z:40},
    {x:89, y:166, z:40},
    {x:90, y:166, z:40},
    {x:91, y:166, z:40},
    {x:92, y:166, z:40},
    {x:93, y:166, z:40},
    {x:94, y:166, z:40},
    {x:95, y:166, z:40},
    {x:88, y:165, z:40},
    {x:89, y:165, z:40},
    {x:90, y:165, z:40},
    {x:91, y:165, z:40},
    {x:92, y:165, z:40},
    {x:93, y:165, z:40},
    {x:94, y:165, z:40},
    {x:95, y:165, z:40},

    //phase 3
    {x:51, y:114, z:52},
    {x:51, y:114, z:53},
    {x:51, y:114, z:54},
    {x:51, y:114, z:55},
    {x:51, y:114, z:56},
    {x:51, y:114, z:57},
    {x:51, y:114, z:58},
    {x:51, y:115, z:52},
    {x:51, y:115, z:53},
    {x:51, y:115, z:54},
    {x:51, y:115, z:55},
    {x:51, y:115, z:56},
    {x:51, y:115, z:57},
    {x:51, y:115, z:58},


    //phase 4
    {x:54, y:64, z: 71},
    {x:54, y:64, z: 72},
    {x:54, y:64, z: 73},
    {x:54, y:63, z: 73},
    {x:54, y:64, z: 74},
    {x:54, y:63, z: 74},

]