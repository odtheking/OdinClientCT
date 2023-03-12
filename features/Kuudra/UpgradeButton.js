import { swapAndRightClick } from "../../utils.js"
ballistaKey = new KeyBind("Ballista", Keyboard.KEY_NONE, "OdinClient")

let shouldUpgrade = false
let toUpgrade
ballistaKey.registerKeyPress(() => {
    swapAndRightClick("Open Shop", true)
    shouldUpgrade = true
    toUpgrade = "Ballista"
})

register("tick", () => {
    const container = Player.getContainer()
    if (!shouldUpgrade || container.getName() !== "Perk Menu") return
    if (toUpgrade === "Ballista") {
        for (let i = 0; i < 9; i++) {
            setTimeout(() => container.click(13, false, "MIDDLE"), i * 250)
        }
        Client.currenGui.close()
    }
    shouldUpgrade = false
    toUpgrade = undefined
})