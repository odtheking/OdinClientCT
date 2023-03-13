import Skyblock from "../../../BloomCore/Skyblock"
import { leftclick } from "../../utils"
import { data } from "../../stuff/guidk"

const mc = Client.getMinecraft()

register("clicked", (mouseX, mouseY, button, isButtonDown) => {
    if (!isButtonDown || button !== 1 || Skyblock.area !== 'Dungeon' || !Player.isSneaking() || Client.isInGui() || !data.qol.options[8]) return
    const lookingAt = Player?.lookingAt()
    if (!(lookingAt instanceof Block)) return
    if (!lookingAt.getState().toString().includes("cracked_stonebrick")) return
    const superboom = Player?.getInventory()?.getItems()?.findIndex(item => item && item.getName().includes("TNT"))
    const previousItemIndex = Player.getHeldItemIndex()
    if (superboom == -1 || null && superboom > 8) return
    Player.setHeldItemIndex(superboom)
    leftclick()
    Player.setHeldItemIndex(previousItemIndex)
})