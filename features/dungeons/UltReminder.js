import { data } from "../../gui";
import { alert, modMessage} from "../../utils/utils";
//auto ult - tank/healer?

let firstlaser = false
register("worldLoad", () => {
    firstlaser = false
})

register("chat", () => {
    if (!data.dungeons.ultReminder.toggle || firstlaser) return
    modMessage("§2Frenzy soon... ULT TIME!")
    alert("&3Use ult!")
    firstlaser = true
}).setCriteria("[BOSS] Maxor: YOU TRICKED ME!")

register("chat", () => {
    if (!data.dungeons.ultReminder.toggle || firstlaser) return
    modMessage("§2Frenzy soon... ULT TIME!")
    alert("&3Use ult!")
    firstlaser = true
}).setCriteria("[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!")

register("chat", () => {
    if (!data.dungeons.ultReminder.toggle) return
    modMessage("§2Goldor time zzz")
    alert("&3Use ult!")
}).setCriteria("[BOSS] Goldor: You have done it, you destroyed the factory…")


register("chat", () => {
    if (!data.dungeons.ultReminder.toggle) return
    modMessage("§2Giants incoming")
    alert("&3Use ult!")
}).setCriteria("[BOSS] Sadan: My giants! Unleashed!")