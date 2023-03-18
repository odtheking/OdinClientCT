import Skyblock from "../../../BloomCore/Skyblock"
import { data } from "../../stuff/guidk"
import { modMessage, swapAndRightClick } from "../../utils"

const witherSwords = ["Astraea", "Hyperion", "Valkyrie", "Scylla"];
const entryMessages = [
    "[BOSS] Bonzo: Gratz for making it this far, but I’m basically unbeatable.",
    "[BOSS] Scarf: This is where the journey ends for you, Adventurers.",
    "[BOSS] The Professor: I was burdened with terrible news recently...",
    "[BOSS] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!",
    "[BOSS] Livid: Welcome, you arrive right on time. I am Livid, the Master of Shadows.",
    "[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!",
    "[BOSS] Maxor: WELL WELL WELL LOOK WHO'S HERE!"
]
// Auto Wither Shield
let inboss = false
register('step', () => {
    if (!data.auto.autoShield.toggle) return
    if (!inboss) return
    if (Player.getHP() >= 40) return
    let found = false

    for (const sword of witherSwords) {
        const index = Player?.getInventory()?.getItems()?.splice(0, 9).findIndex(item => item?.getName()?.includes(sword))
        if (index >= 0 && index < 9) {
            swapAndRightClick(sword)
            found = true;
            break;
        }   
    }
    if (!found) modMessage('§cCannot swap to Wither Blade. Not in hotbar.')
}).setDelay(5)

register("chat", (msg) => {
    if(entryMessages.includes(msg)) {
        inboss = true
    }
}).setCriteria("${msg}")

register("worldLoad", () => {
    inboss = false
})