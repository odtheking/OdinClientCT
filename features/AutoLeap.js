import { data } from "../stuff/guidk"
import Skyblock from "../../BloomCore/Skyblock"
import { modMessage, swapAndRightClick } from "../utils"

// Auto Leap
let target
let opened = false

register("worldLoad", () => {
    opened = false
})

// Actual thing
register("chat", (msg) => {
    if (!data.dungeonsOptions[0]) return
    const noFormatting = msg.removeFormatting()
    if (!noFormatting.startsWith("Party > ") && !noFormatting.toLowerCase().includes("!tp ")) return
    const match = noFormatting.match(/^Party > ?([[a-zA-z +]+])? (\w+): !tp (.*)/)
    if (!match) return
    const name = match[2]
    if (name == Player.getName().toLowerCase()) return
    index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes("leap"))
    if (index >= 0 && index < 9) {
        swapAndRightClick(index)
        opened = true
        target = name
    } else {
        modMessage("§fNo spirit leaps found in hotbar.")
    }

}).setCriteria("${msg}")

register("guiDrawBackground", () => {
    if (!opened) return
    if (Skyblock.area != 'Dungeon') return
    const container = Player.getContainer()
    if (!target || container.getName() !== "Spirit Leap") return
    const items = container.getItems()
    for (let i = 10; i <= 19; i++) {
        if (!items[i]?.getName()?.toLowerCase()?.includes(target)) continue
        modMessage(`§rLeaped to ${target}`)
        container.click(i, false, "MIDDLE")
        opened = false
        break
    }
    target = null
})


