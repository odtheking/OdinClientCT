import { swapAndRightClick } from "../../utils/utils"
ballistaKey = new KeyBind("Ballista", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {
    swapAndRightClick("Open Shop", true)
    shouldUpgrade = true
    toUpgrade = "Ballista"
})

let shouldUpgrade = false
let toUpgrade

register("tick", () => {
    const container = Player.getContainer()
    if (!shouldUpgrade || container.getName() !== "Perk Menu") return
    if (toUpgrade === "Ballista") {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                container.click(13, false, "MIDDLE"), i * 250
            }, i * 250);
            
        }
        setTimeout(() => {
            Client.currentGui.close()
        }, 250 * 6);
    }
    shouldUpgrade = false
    toUpgrade = undefined
})