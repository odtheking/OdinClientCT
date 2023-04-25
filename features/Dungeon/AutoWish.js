import Skyblock from "../../../BloomCore/Skyblock"
import { EntityArmorStand, EntityOtherPlayerMP } from "../../../BloomCore/utils/Utils"
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
    if (!canWish && inBoss) return
    checkPlayerHP()
            
}).setFps(5)


function checkPlayerHP() {
    const ignsArray = []
    Scoreboard.getLines().forEach(line => {
        const s = line.getName()
        if (!ChatLib.removeFormatting(s).startsWith("[")) return
        const igns = s.split(" ")[1]
        ignsArray.push(igns)
    })
    
    // Remove players that don't exist in the igns array
    const players = World.getAllPlayers()
    const existingPlayers = players.filter(player => ignsArray.includes(player.getName()))
    existingPlayers.forEach(player => {
      const maxHP = player.getMaxHP();
      const currentHP = player.getHP();
      if (currentHP < maxHP * 0.3) {
        modMessage(`${player.getName()} is at less than 20% HP! wishing!`);
        useAbility()
      }
    });
}

