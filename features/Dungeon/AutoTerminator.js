import { data } from "../../stuff/guidk"
import { rightClick } from "../../utils"

// Terminator Auto Clicker
register('step', () => {
    if (!data.qol.options[2]) return
    if (!Player?.getHeldItem()?.getName()?.includes("Terminator")) return
    if (!Client.getMinecraft().field_71474_y.field_74313_G.func_151470_d()) return
    setTimeout(() => { rightClick() }, Math.random() * 8)
}).setFps(20)