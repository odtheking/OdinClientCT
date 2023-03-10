import { Blockk, C02PacketUseEntity } from "../BloomCore/utils/Utils"
import { ItemSkull } from "./java-stuff"


/**
     * Moves the player to the specified coords by looking at the position and pressing W
     * 
     * @param {int} x the x position the player will walk to
     * @param {int} y the y position the player will walk to
     * @param {int} z the z position the player will walk to
     *
     * @return whether the player is within 1 block of the specified coords
*/

/***
 *  Sends a client-side message with the prefix
 * 
 *  @param {string} message the message to be sent after the prefix
 */
export function modMessage(message) {
    ChatLib.chat("§6[Odin§4Client] §r" + message)
}

/***
 *  Sends a message in party chat
 * 
 *  @param {string} message the message to be sent in party chat
 */
export function partyMessage(message) {
    ChatLib.command("pc " + message)
}

/***
 *  Sends a message to the latest player who messaged you
 * 
 *  @param {string} message the message to be sent in in messages chat
 */
export function privateMessage(message) {
    ChatLib.command("r " + message)
}

/***
 *  Sends a message in guild chat
 * 
 *  @param {string} message the message to be sent in guild chat
 */
export function guildMessage(message) {
    ChatLib.command("gc " + message)
}


const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClickMethod.setAccessible(true)
/**
     * Makes the player right click
*/
export function rightClick() {
    rightClickMethod.invoke(Client.getMinecraft())
}

/**
     * Swaps to the specified item, right clicks, then swaps back
     * 
     * @param {string} item the item to swap to
     * @param {boolean} swapBack if to swap back to the item you held
*/
export function swapAndRightClick(items, swapBack = true) {
    index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes(items))
    if (index < 0 || index > 8) {
        modMessage('§cCannot swap to ' + items + '. Not in hotbar.')
        return
    }
    let previousItem = Player.getHeldItemIndex()
    Player.setHeldItemIndex(index)
    rightClick()
    if (swapBack) Player.setHeldItemIndex(previousItem)
}

/**
 * 
    * Interacts with a given entity (interact packet)
    * @param {Entity} entity to be interacted with
 * 
 */
export function interactWith(entity) {
    Client.sendPacket(new C02PacketUseEntity(entity.getEntity(), C02PacketUseEntity.Action.INTERACT))
}

/**
 * 
    * Interacts with a given entity (interact packet)
    * @param {MCEntity} entity to be interacted with
 * 
 */
export function interactWithMCP(entity) {
    Client.getMinecraft().field_71442_b.func_78768_b(Client.getMinecraft().field_71439_g, entity) // might need to use .getEntity() at end im not sure
}

/**
     * Makes the player drop their items (for dungeon ultimate)
*/
export function useAbility() {
    Player.getPlayer()?.func_71040_bB(false)
}

/**
 * 
    * Gets the parameters of the entity
    * @param {MCEntity} entity to be checked
    * @param {partialTicks} partialTicks 
 * 
 */
export function getEntityRenderParams(mcEntity, partialTicks) {
    return [
        mcEntity.field_70142_S + (mcEntity.field_70165_t - mcEntity.field_70142_S) * partialTicks,
        mcEntity.field_70137_T + (mcEntity.field_70163_u - mcEntity.field_70137_T) * partialTicks,
        mcEntity.field_70136_U + (mcEntity.field_70161_v - mcEntity.field_70136_U) * partialTicks,
        mcEntity.field_70130_N,
        mcEntity.field_70131_O
    ]
}

/**
 * 
    * Gets the 3d distance between 2 entities without sqrt
    * @param {MCEntity} mcEntity1 to be checked
    * @param {MCEntity} mcEntity2 to be checked
 * 
 */
export function noSqrt3DDistance(mcEntity1, mcEntity2) {
    return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
        Math.pow(mcEntity1.field_70163_u - mcEntity2.field_70163_u, 2) +
        Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

/**
 * 
    * Gets the 2d distance between 2 entities without sqrt
    * @param {MCEntity} mcEntity1 to be checked
    * @param {MCEntity} mcEntity2 to be checked
 * 
 */
export function noSqrt2DDistance(mcEntity1, mcEntity2) {
    return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
        Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

/**
 * 
    * Gets the helmet texture of a given ct entity
    * @param {Entity} entity to be checked
 * 
 */
export function getCtEntityHelmetTexture(entity) {
    return getMcEntityHelmetTexture(entity.getEntity())
}

/**
 * 
    * Gets the helmet texture of a given mc entity
    * @param {MCEntity} entity to be checked
 * 
 */
export function getMcEntityHelmetTexture(entity) {
    const helmet = entity.func_71124_b(4)
    if (!helmet || !(helmet.func_77973_b() instanceof ItemSkull)) return undefined
    return getSkullTexture(helmet)
}

/**
 * 
    * Gets the skull texture of a given mc entity
    * @param {Entity} skull to be checked
 * 
 */
export function getSkullTexture(skull) {
    const nbt = skull.func_77978_p()
    if (!nbt?.func_150297_b("SkullOwner", 10)) return undefined
    return nbt.func_74775_l("SkullOwner").func_74775_l("Properties").func_150295_c("textures", 10).func_150305_b(0).func_74779_i("Value")
}


export function alert(title) {
    World.playSound("note.pling", 100, 1)
    Client.showTitle(title, "", 10, 100, 10);
}