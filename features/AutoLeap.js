import { data } from "../stuff/guidk"
import Skyblock from "../../BloomCore/Skyblock"
import { modMessage, swapAndRightClick } from "../utils"

// Auto Leap
let target
let opened = false

register("worldLoad", () => {
    opened = false
    target = null
})

// Actual thing
register("chat", (name) => {
    if (!data.autoOptions[7]) return
    if (name == Player.getName().toLowerCase()) return
    index = Player?.getInventory()?.getItems().splice(0, 9).findIndex(item => item?.getName()?.includes("leap"))
    if (index != -1) {
        swapAndRightClick(index)
        opened = true
        target = name
    } else {
        modMessage("§fNo spirit leaps found in hotbar.")
    }
}).setCriteria(/^Party > ?(?:\[.+\])? (.{0,16}): !tp ?(?:.+)?/)

register("guiDrawBackground", () => {
    if (!opened) return
    if (Skyblock.area != 'Dungeon') return
    const container = Player.getContainer()
    if (!target || container.getName() !== "Spirit Leap") return
    const items = container.getItems()
    let head = items.findIndex(item => item && item.getName().toLowerCase().includes(target))
    if (head != -1 || head != null) {
        container.click(head, false, "MIDDLE")
        modMessage(`§rLeaped to ${target}`)
        opened = false
        target = null
    }
})


