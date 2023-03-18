import Skyblock from "../../../BloomCore/Skyblock"
import { leftClick, modMessage } from "../../utils"
import { data } from "../../stuff/guidk"

const JavaBlockPos = Java.type("net.minecraft.util.BlockPos")
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")

let lastclick = 0
register("clicked", (mouseX, mouseY, mouseButton, isLeftMouseButtonPressed) => {
    if (!isLeftMouseButtonPressed || mouseButton !== 0 || Skyblock.area !== 'Dungeon' || Date.now() - lastclick < 2000 ||
    Client.isInGui() || !data.qol.options[8] || Player.getHeldItem().getName().includes("TNT")) return

    const lookingAt = Player.lookingAt()
    if (!(lookingAt instanceof Block)) return
    if (!lookingAt.getState().toString().includes("cracked_stonebrick") && !lookingAt.getState().toString().includes("stone_brick_stairs") && !lookingAt.getState().toString().includes("stone_slab")) return

    const superboomIndex = Player.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes("TNT"))
    if (superboomIndex === -1 || superboomIndex === null || superboomIndex > 8) return

    const blockpos = new JavaBlockPos(lookingAt.getX(), lookingAt.getY(), lookingAt.getZ())

    lastclick = Date.now()
    const previousItemIndex = Player.getHeldItemIndex()

    Client.sendPacket(new C09PacketHeldItemChange(superboomIndex))
    Client.getMinecraft()?.field_71442_b?.func_180511_b(blockpos, Client.getMinecraft()?.field_71476_x?.field_178784_b)
    Client.sendPacket(new C09PacketHeldItemChange(previousItemIndex))
})