import Skyblock from "../../../BloomCore/Skyblock"
import { data } from "../../gui";
import { alert, modMessage} from "../../utils/utils";

let timeindungeonm = 0
let notified = false
let playerready = false
register("worldLoad", () => {
    timeindungeonm = Date.now()
    notified = false
    playerready = false
})


register("tick", (ticks) => {
    if (!data.dungeons.readyReminder.toggle || Skyblock.area != 'Dungeon' || playerready || notified || ticks % 10 != 0 || Date.now() - timeindungeonm <= 7000) return
    alert("&3Ready up!")
    modMessage("Ready up!")
    notified = true
})

register("chat", (ign) => {
    if (Skyblock.area != 'Dungeon' || ign != Player.getName()) return
    playerready = true
}).setCriteria("${ign} is now ready!")