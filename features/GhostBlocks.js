import { BlockPoss, Blocks } from "../../BloomCore/utils/Utils"

// Ghost Blocks
const ghostBind = new KeyBind("Ghost Bind", Keyboard.KEY_NONE, "OdinClient")

register('tick', () => {
    if (ghostBind.isKeyDown()) {
        if (Player?.lookingAt()?.toString().includes('minecraft:air') || Player?.lookingAt()?.toString().includes('minecraft:chest') || Player?.lookingAt()?.toString().includes('minecraft:trapped_chest') || Player?.lookingAt()?.toString().includes('minecraft:lever') || Player?.lookingAt()?.toString().includes('minecraft:stone_button') || Player?.lookingAt()?.toString().includes('minecraft:skull')) return
        World.getWorld().func_175656_a(new BlockPoss(Player?.lookingAt()?.getX(), Player?.lookingAt()?.getY(), Player?.lookingAt()?.getZ()), Blocks.field_150350_a.func_176223_P())
    }
})