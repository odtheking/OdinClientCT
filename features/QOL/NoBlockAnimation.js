import { modMessage, sendPlacementPacketWithStack } from "../../utils/utils"
import { data } from "../../gui"

let isRightClickKeyDown = false
const ItemSword = Java.type("net.minecraft.item.ItemSword")


register("tick", () => {
    if (!data.qol.noBlockAnimation.toggle) return
    isRightClickKeyDown = Client.getMinecraft().field_71474_y.field_74313_G.func_151470_d()
})

const player = Player.getPlayer()
register("playerInteract", (action, pos, event) => {
    if (!data.qol.noBlockAnimation.toggle || event.action != "RIGHT_CLICK_AIR") return
    const item = Player.getHeldItem()
    if (!item || !(item.getItem() instanceof ItemSword)) return
    const lore = item.getLore()
    if (lore.every(str => !str.includes("Ability: ") && !str.includes("RIGHT CLICK"))) return
    cancel(event)
    if (isRightClickKeyDown) return
    sendPlacementPacketWithStack(item.getItemStack())
})