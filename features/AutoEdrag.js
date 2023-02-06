import { data } from "../stuff/guidk"
import { modMessage } from "../utils"

// Auto Edrag
let p4Done = false

register('worldLoad', () => {
    p4Done = false
})

register("chat", () => {
    p4Done = true

}).setCriteria("[BOSS] Wither King: You.. again?")

register('tick', (ticks) => {
    if (!data.legitOptions[0]) return
    if (ticks % 10 !== 0) return
    if (!p4Done) return
    if (!Client.currentGui.get()) {
        ChatLib.command('pet')
        modMessage("Trying to equip Ender Dragon pet...")
        return
    }
    if (Player.getContainer()?.getName()?.match(/\(\d\/\d\)? ?Pets/)) {
        let edragIndex = Player.getContainer()?.getItems()?.findIndex(item => item && item.getName()?.match(/§.\[Lvl \d+\] §.Ender Dragon/))
        if (edragIndex == -1) {
            Client.currentGui.close()
            modMessage("No Ender Dragon pet found.")
        } else {
            Player.getContainer().click(edragIndex, false, "MIDDLE")
            p4Done = false
        }
    }
}) 
