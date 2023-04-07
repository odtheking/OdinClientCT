import Skyblock from "../../../BloomCore/Skyblock"
import { leftClick, modMessage, hitWithItemFromInv } from "../../utils/utils"
import { data } from "../../gui"

const JavaBlockPos = Java.type("net.minecraft.util.BlockPos")
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")

let lastclick = 0
register("clicked", (mouseX, mouseY, mouseButton, isLeftMouseButtonPressed) => {
    if (!isLeftMouseButtonPressed || mouseButton !== 0 || Skyblock.area !== 'Dungeon' || Date.now() - lastclick < 2000 ||
    Client.isInGui() || !data.dungeons.superBoom.toggle || Player.getHeldItem()?.getName()?.includes("TNT")) return

    const lookingAt = Player.lookingAt()
    if (!(lookingAt instanceof Block)) return
    const state = lookingAt.getState().toString()
    if (!state.includes("cracked_stonebrick") && 
        !state.includes("stone_brick_stairs") && 
        !state.includes("stone_slab") &&
        !state.includes("barrier")
    ) return

    const superboomIndex = Player.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes("TNT"))
    if (superboomIndex === -1 || !superboomIndex) return
    
    const blockpos = new JavaBlockPos(lookingAt.getX(), lookingAt.getY(), lookingAt.getZ())

    lastclick = Date.now()
    if (superboomIndex > 8) {
        hitWithItemFromInv(superboomIndex, blockpos)
        return
    }
    const previousItemIndex = Player.getHeldItemIndex()

    Client.sendPacket(new C09PacketHeldItemChange(superboomIndex))
    Client.getMinecraft()?.field_71442_b?.func_180511_b(blockpos, Client.getMinecraft()?.field_71476_x?.field_178784_b)
    Client.sendPacket(new C09PacketHeldItemChange(previousItemIndex))
})