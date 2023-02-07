import Skyblock from "../../BloomCore/Skyblock"
import { getDistance3D } from "../../BloomCore/utils/Utils"
import { data } from "../stuff/guidk"
import { interactWith, modMessage, swapAndRightClick } from "../utils"

// Auto Ready at Mort
let tped = false
let click = false
let playerready = false

register("worldLoad", () => {
    tped = false
    click = false
    playerready = false
})

register("tick", () => {
    if (!data.autoOptions[1]) return
    if (Skyblock.area != 'Dungeon') return
    if (playerready) return
    if (click) return
    const mort = World.getAllEntities().find(mort => mort.getName().includes('Mort'))
    if (!mort) return
    const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
    const [mx, my, mz] = [mort.getX(), mort.getY(), mort.getZ()]
    let dist = getDistance3D(x, y, z, mx, my, mz)
    if (dist <= 5) {
        interactWith(mort)
        click = true
        setTimeout(() => { //fail safe for getting the gui closed
            if (playerready) return
            Client.currentGui.close()
            interactWith(mort)
        }, 4000);
    }
    const index = Player?.getInventory()?.getItems()?.splice(0, 9).findIndex(item => item?.getName()?.includes("Aspect")) //searching for aotv
    if (index != -1) {
        if (tped) return
        swapAndRightClick(index)
        tped = true
    } else {
        modMessage("§fno AOTV found in hotbar")
    }

})

register("chat", (ign) => {
    if (!data.autoOptions[0]) return
    if (Skyblock.area != 'Dungeon') return
    if (ign == Player.getName()) {
        playerready = true
        Client.currentGui.close()
    }
}).setCriteria("${ign} is now ready!")


//auto ready gui side
register('tick', () => {
    if (!data.autoOptions[0]) return
    if (playerready) return
    let container = Player.getContainer()
    let playerName = Player.getName()
    if (container.getName() === "Start Dungeon?") {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes('Start Dungeon?'))
        container.click(index, false, "MIDDLE")
    }
    if (container.getName().startsWith("Catacombs - ")) {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes(playerName))
        container.click(index, false, "MIDDLE")
    }
    if (container.getName().startsWith("Ready Up")) {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes(playerName))
        container.click(index, false, "MIDDLE")
    }
})