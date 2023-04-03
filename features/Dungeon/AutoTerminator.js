import { data } from "../../stuff/guidk"
import { rightClick } from "../../utils"

const delay = 50
let nextClick = 0
register("renderWorld", () => {
    if (!data.qol.terminatorAC.toggle || !Player?.getHeldItem()?.getName()?.includes("Terminator") || !Client.getMinecraft().field_71474_y.field_74313_G.func_151470_d()) return
    const nowMillis = Date.now()
    if (nowMillis < nextClick) return
    nextClick = nowMillis + delay + (Math.random() * 30)-15
    rightClick()
})