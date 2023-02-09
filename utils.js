import { Blockk, C02PacketUseEntity } from "../BloomCore/utils/Utils"
import { ItemSkull } from "./java-stuff"

export function modMessage(string) {
    ChatLib.chat("§6[Odin§4Client] §r" + string)
}
export function partyMessage(message) {
    ChatLib.command("pc " + message)
}
export function privateMessage(message) {
    ChatLib.command("r " + message)
}
export function guildMessage(message) {
    ChatLib.command("gc " + message)
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

export function interactWithMCP(entity) {
    Client.getMinecraft().field_71442_b.func_78768_b(Client.getMinecraft().field_71439_g, entity) // might need to use .getEntity() at end im not sure
}

export function useAbility() {
    Player.getPlayer()?.func_71040_bB(false)
}

export function getEntityRenderParams(mcEntity, partialTicks) {
    return [
        mcEntity.field_70142_S + (mcEntity.field_70165_t - mcEntity.field_70142_S) * partialTicks,
        mcEntity.field_70137_T + (mcEntity.field_70163_u - mcEntity.field_70137_T) * partialTicks,
        mcEntity.field_70136_U + (mcEntity.field_70161_v - mcEntity.field_70136_U) * partialTicks,
        mcEntity.field_70130_N,
        mcEntity.field_70131_O
    ]
}

// no need to take the square root because we dont need the actual distance
export function noSqrt3DDistance(mcEntity1, mcEntity2) {
    return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
        Math.pow(mcEntity1.field_70163_u - mcEntity2.field_70163_u, 2) +
        Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

export function noSqrt2DDistance(mcEntity1, mcEntity2) {
    return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
        Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

export function getCtEntityHelmetTexture(entity) {
    return getMcEntityHelmetTexture(entity.getEntity())
}

export function getMcEntityHelmetTexture(entity) {
    const helmet = entity.func_71124_b(4)
    if (!helmet || !(helmet.func_77973_b() instanceof ItemSkull)) return undefined
    return getSkullTexture(helmet)
}

export function getSkullTexture(skull) {
    const nbt = skull.func_77978_p()
    if (!nbt?.func_150297_b("SkullOwner", 10)) return undefined
    return nbt.func_74775_l("SkullOwner").func_74775_l("Properties").func_150295_c("textures", 10).func_150305_b(0).func_74779_i("Value")
}