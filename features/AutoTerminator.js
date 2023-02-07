import { data } from "../stuff/guidk"
import { rightClick } from "../utils"

// Terminator Auto Clicker
register('step', () => {
    if (!data.qolOptions[2]) return
    if (!Player?.getHeldItem()?.getName()?.includes("Terminator")) return
    setTimeout(() => { rightClick() }, Math.random() * 8)
}).setFps(25)
