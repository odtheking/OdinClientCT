import { data } from "../../stuff/guidk"
import { modMessage, useAbility } from "../../utils"

// Auto Ult (for tanks/healers?)
let firstlaser = false
register("worldLoad", () => {
    firstlaser = false
})

register("chat", () => {
    if (!data.auto.options[2]) return
    if (firstlaser) return
    modMessage("§2Frenzy soon... ULT TIME!")
    useAbility()
    firstlaser = true
}).setCriteria("[BOSS] Maxor: YOU TRICKED ME!")

register("chat", () => {
    if (!data.auto.options[2]) return
    if (firstlaser) return
    modMessage("§2Frenzy soon... ULT TIME!")
    useAbility()
    firstlaser = true
}).setCriteria("[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!")

register("chat", () => {
    if (!data.auto.options[2]) return
    modMessage("§2Goldor time zzz")
    useAbility()
}).setCriteria("[BOSS] Goldor: You have done it, you destroyed the factory…")

register("chat", () => {
    if (!data.auto.options[2]) return
    setTimeout(() => {
        modMessage("§2Giants incoming")
        useAbility()
    }, 1000);
}).setCriteria("[BOSS] Sadan: My giants! Unleashed!")
