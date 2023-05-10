import Skyblock from "../../../BloomCore/Skyblock"
import { getDistance3D } from "../../../BloomCore/utils/Utils"
import { data } from "../../gui"
import { interactWith, modMessage, swapAndRightClick } from "../../utils/utils"

// Auto Ready at Mort
let tped = false
let click = false
let playerready = false

register("worldLoad", () => {
    tped = false
    click = false
    playerready = false
})

register("step", () => {
    if (!data.dungeons.autoMort.toggle || Skyblock.area != 'Dungeon' || playerready || click) return
    const mort = World.getAllEntities().find(mort => mort.getName().includes('Mort'))
    if (!mort) return
    let dist = Player.asPlayerMP().distanceTo(mort)
    if (dist <= 5) {
        interactWith(mort)
        click = true
        setTimeout(() => { //fail safe for getting the gui closed
            if (playerready) return
            Client.currentGui.close()
            interactWith(mort)
        }, 4000);
    }
    if (tped) return
    swapAndRightClick("Aspect of the Void")
    tped = true
}).setFps(10)

register("chat", (ign) => {
    if (!data.dungeons.autoReady.toggle) return
    if (Skyblock.area != 'Dungeon') return
    if (ign == Player.getName()) {
        playerready = true
        Client.currentGui.close()
    }
}).setCriteria("${ign} is now ready!")


//auto ready gui side
register('tick', () => {
    if (!data.dungeons.autoReady.toggle || playerready || !Client.isInGui()) return
    let container = Player.getContainer()
    let playerName = Player.getName()
    if (container.getName() === "Start Dungeon?") {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes('Start Dungeon?'))
        container.click(index, false)
    }
    if (container.getName().startsWith("Catacombs - ")) {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes(playerName))
        container.click(index, false)
    }
    /*if (container.getName().startsWith("Ready Up")) {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes(playerName))
        container.click(index, false)
        Client.currentGui.close()
    }*/
})