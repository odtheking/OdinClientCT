import { data } from "../../gui"
import { getPhase, modMessage } from "../../utils/utils"

const stairRegister = register("renderOverlay", () => {
    if (!data.dungeons.stairDisplay.toggle || !Player.isSneaking() || !getPhase()) return
    const x = Math.abs(Player.getX() % 1)
    const z = Math.abs(Player.getZ() % 1)
    if (x > 0.24 && x < 0.26 || x > 0.74 && x < 0.76 || z > 0.24 && z < 0.26 || z > 0.74 && z < 0.76) Renderer.drawString(`Can Clip!`, Renderer.screen.getWidth()/2-Renderer.getStringWidth('Can Clip')/2, Renderer.screen.getHeight()/2-10)
}).register()

let lastSetting = false
register("step", () => {
    if (lastSetting == data.dungeons.stairDisplay.toggle) return
    lastSetting = data.dungeons.stairDisplay.toggle
    if (lastSetting) stairRegister.register()
    else stairRegister.unregister()
}).setDelay(2)