import { data } from "../stuff/guidk"
import { modMessage } from "../utils"

// Auto Mask

let spiritProc = 0
let bonzoProc = 0
let fragBonzoProc = 0

let shouldSwapItem = false

const spiritCD = 30000
const bonzoCD = 180000

register('worldLoad', () => {
    spiritProc = 0
    bonzoProc = 0
    fragBonzoProc = 0
})

register('chat', (secondwind, item) => {
    switch (item) {
        case "Spirit Mask":
            spiritProc = Date.now()
            break;
        case "Bonzo's Mask":
            bonzoProc = Date.now()
            break;
        case "⚚ Bonzo's Mask":
            fragBonzoProc = Date.now()
            break;
    }

    shouldSwapItem = true
}).setCriteria(/^(Second Wind Activated!)? ?Your (.+) saved your life!$/)

register('tick', (ticks) => {
    if (ticks % 10 == 0) {
        if (!data.auto.options[5]) return
        if (!shouldSwapItem) return
        if (!Client.currentGui.get()) {
            ChatLib.command('equipment')
        }
        // Waiting until the GUI opens
        const container = Player.getContainer()
        if (!container?.getName()?.includes('Your Equipment')) return
        // Get the masks based on CD
        let index
        const time = Date.now()
        if (time - spiritProc >= spiritCD) {
            index = container.getItems().findIndex(item => item?.getName()?.includes('Spirit Mask'))
        } else if (time - bonzoProc >= bonzoCD) {
            index = container.getItems().findIndex(item => item?.getName()?.includes('Bonzo\'s Mask') && !item?.getName()?.includes('⚚'))
        } else if (time - fragBonzoProc >= bonzoCD) {
            index = container.getItems().findIndex(item => item?.getName()?.includes('⚚') && item?.getName()?.includes('Bonzo\'s Mask'))
        }
        if (index == -1) {
            modMessage('§rNo masks found!')
        } else if (!index) {
            modMessage('§rAll masks are on cooldown!')
        } else {
            modMessage('§rSwitching to ' + container?.getStackInSlot(index)?.getName())
            container.click(index)
        }
        Client.currentGui.close()
        shouldSwapItem = false
    }
})

