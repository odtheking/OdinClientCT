import Skyblock from "../../BloomCore/Skyblock"
import { data } from "../stuff/guidk"
import { modMessage, swapAndRightClick } from "../utils"

const witherSwords = ["Astraea", "Hyperion", "Valkyrie", "Scylla"];

// Auto Wither Shield

register('step', () => {
    if (!data.auto.options[3]) return
    if (Skyblock.area != 'Dungeon') return
    if (Player.getHP() >= 40) return
    let found = false

    for (const sword of witherSwords) {
        const index = Player?.getInventory()?.getItems()?.splice(0, 9).findIndex(item => item?.getName()?.includes(sword))
        if (index >= 0 && index < 9) {
            swapAndRightClick(index)
            found = true;
            break;
        }
    }
    if (!found) modMessage("No wither sword was found in your hotbar")
}).setDelay(5)

