import { data } from "../../gui"

let inPortal = Java.type("net.minecraft.entity.Entity").class.getDeclaredField("field_71087_bX")
inPortal.setAccessible(true)

register("tick", () => {
    if (!data.general.portalFix.toggle) return
    if (Player.getPlayer().field_71086_bY = 0) return
    inPortal.set(Player.getPlayer(), false)
})