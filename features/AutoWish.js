import Skyblock from "../../BloomCore/Skyblock"
import { data } from "../stuff/guidk"
import { modMessage, useAbility } from "../utils"


// Auto Wish (at low health)
register("worldUnload", () => {
    canWish = false
    inBoss = false
})

function isGhost() {
    for (let i = 0; i < 8; i++) {
        if (Player.getInventory().getStackInSlot(i).getName().toString().includes("Haunt")) {
            return true
        }
    }
    return false
}

Client.settings.getSettings().func_74300_a();

let canWish = true
let floor = 0
let inBoss = false

function dungeonFloor(floor) {
    let scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) })
    for (let line of scoreboard) {
        let match = line.match(/ ⏣ The Catac.+ombs \((.+)\)/)
        if (match) {
            return parseInt(match[1].replace(/[^\d]/g, ""))
        }
    }
    return floor
}

register("step", () => {
    floor = dungeonFloor(floor)
    let dead = isGhost()
    if (dead) {
        canWish = false
    }
}).setFps(1)

register("chat", (message) => {
    if (floor > 0) return;
    if (message.includes("Wish is ready to use!") && !inBoss) {
        canWish = true
        //ChatLib.chat(`&b[&6DoC&b]&f Detected Wish available`)
    } else if (message.includes("Your Healer ULTIMATE Wish is now available!") && !inBoss) {
        canWish = true
        //ChatLib.chat(`&b[&6DoC&b]&f Detected Wish available`)
    } else if (message.startsWith("[BOSS] Sadan") && canWish) {
        canWish = false
        inBoss = true
    } else if (message.startsWith("[BOSS] Maxor") && canWish) {
        canWish = false
        inBoss = true
    }
}).setCriteria("${msg}")

register("step", () => {
    if (!data.autoOptions[4]) return
    if (Skyblock.area != 'Dungeon') return
    Scoreboard.getLines().forEach(line => {
        let s = line.getName()
        if (ChatLib.removeFormatting(s).startsWith("[")) {
            let hp = s.split(" ")[2].replace('§c❤', '')
            let low = hp.includes("&c")
            if (low.includes("DEAD")) return;
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

