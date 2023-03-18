import { data } from "../../stuff/guidk"
import { blacklist } from "../BlackList"
import Skyblock from "../../../BloomCore/Skyblock"
import { modMessage, swapAndRightClick } from "../../utils"

// Auto Leap
let target
let opened = false

register("worldLoad", () => {
    opened = false
    target = null
})

// Actual thing
register("chat", (name) => {
    if (!data.auto.autoLeap.toggle) return 
    if (blacklist.igns.includes(name.toLowerCase())) return
    if (name == Player.getName().toLowerCase()) return
    swapAndRightClick("leap")
    opened = true
    target = name
}).setCriteria(/^Party > ?(?:\[.+\])? (.{0,16}): !tp ?(?:.+)?/)

register("guiDrawBackground", () => {
    if (!opened) return
    if (Skyblock.area != 'Dungeon') return
    const container = Player.getContainer()
    if (!target || container.getName() !== "Spirit Leap") return
    const items = container.getItems()
    let head = items.findIndex(item => item && item.getName().toLowerCase().includes(target))
    if (head != -1 || head != null) {
        container.click(head, false)
        Client.currentGui.close() 
        modMessage(`§rLeaped to ${target}`)
        opened = false
        target = null
    }
})


