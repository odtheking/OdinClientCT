import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import Skyblock from "../../../BloomCore/Skyblock"
import { data } from "../../gui"
import { modMessage, useAbility } from "../../utils/utils"


// Auto Wish (at low health)
function isGhost() {
    const index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes("Haunt"))
    return index === null || index === -1
}

let canWish = true
let inBoss = false

register("chat", (message) => {
    if ((message.includes("Wish is ready to use!") || message.includes("Your Healer ULTIMATE Wish is now available!")) && !inBoss && !isGhost()) {
        canWish = true
    } else if ((message.startsWith("[BOSS] Sadan") || message.startsWith("[BOSS] Maxor")) && canWish && !isGhost()) {
        canWish = false
        inBoss = true
    }
}).setCriteria("${msg}")
register("step", () => {
    if (!data.dungeons.autoWish.toggle || Skyblock.area !== 'Dungeon') return
    Scoreboard.getLines().forEach(line => {
        const s = line.getName()
        if (ChatLib.removeFormatting(s).startsWith("[")) {
            const hp = s.split(" ")[2].replace('§c❤', '')
            const low = hp.includes("§c")
            if (s.includes("DEAD")) return
            if (low && canWish && !inBoss) {
                try {
                    useAbility()
                    modMessage("Using wish.")
                    canWish = false
                } catch (e) {
                    canWish = true
                }
            }
        }
    })
}).setFps(5)

