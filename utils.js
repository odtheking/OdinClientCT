import { C02PacketUseEntity } from "../BloomCore/utils/Utils"

export function modMessage(string) {
    ChatLib.chat("§6[Odin§4Client] §r" + string)
}

export const prefix = "§6[Odin§4Client]"

const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClickMethod.setAccessible(true)

export function rightClick() {
    rightClickMethod.invoke(Client.getMinecraft())
}

export function swapAndRightClick(index, swapBack = true) {
    if (index < 0 || index > 8) {
        modMessage("§cCannot swap. Not in hotbar.")
        return
    }
    let previousItem = Player.getHeldItemIndex()
    Player.setHeldItemIndex(index)
    rightClick()
    if (swapBack) Player.setHeldItemIndex(previousItem)
}

export function interactWith(entity) {
    Client.sendPacket(new C02PacketUseEntity(entity.getEntity(), C02PacketUseEntity.Action.INTERACT))
}

export function useAbility() {
    Player.getPlayer()?.func_71040_bB(false)
}

export function partyMessage(message) {
    ChatLib.command("pc " + message)
}
export function privateMessage(message) {
    ChatLib.command("r " + message)
}