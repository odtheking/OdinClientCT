import Dungeon from "../BloomCore/dungeons/Dungeon"
import { Blockk, C02PacketUseEntity } from "../BloomCore/utils/Utils"
import { ItemSkull } from "./java-stuff"
import Font from "../FontLib"
const font2 = new Font('OdinCheata/stuff/Minecraft.ttf', 21)
import RenderLib from "../RenderLib"
import renderBeaconBeam from "../BeaconBeam"


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

const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af")
leftClickMethod.setAccessible(true)
/**
  * Makes the player left click
*/
export function leftClick() {
  leftClickMethod.invoke(Client.getMinecraft())
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
  * Interacts with a given entity (interact packet)
  * @param {MCEntity} entity to be interacted with
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
    * Gets the parameters of the entity
    * @param {MCEntity} entity to be checked
    * @param {partialTicks} partialTicks 
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
  * Gets the 3d distance between 2 entities without sqrt
  * @param {MCEntity} mcEntity1 to be checked
  * @param {MCEntity} mcEntity2 to be checked
 */
export function noSqrt3DDistance(mcEntity1, mcEntity2) {
  return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
    Math.pow(mcEntity1.field_70163_u - mcEntity2.field_70163_u, 2) +
    Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

/**
  * Gets the 2d distance between 2 entities without sqrt
  * @param {MCEntity} mcEntity1 to be checked
  * @param {MCEntity} mcEntity2 to be checked
*/
export function noSqrt2DDistance(mcEntity1, mcEntity2) {
  return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
    Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

/**
  * Gets the helmet texture of a given ct entity
  * @param {Entity} entity to be checked
*/
export function getCtEntityHelmetTexture(entity) {
  return getMcEntityHelmetTexture(entity.getEntity())
}

/**
  * Gets the helmet texture of a given mc entity
  * @param {MCEntity} entity to be checked
*/
export function getMcEntityHelmetTexture(entity) {
  const helmet = entity.func_71124_b(4)
  if (!helmet || !(helmet.func_77973_b() instanceof ItemSkull)) return undefined
  return getSkullTexture(helmet)
}

/**
  * Gets the skull texture of a given mc entity
  * @param {Entity} skull to be checked
*/
export function getSkullTexture(skull) {
  const nbt = skull.func_77978_p()
  if (!nbt?.func_150297_b("SkullOwner", 10)) return undefined
  return nbt.func_74775_l("SkullOwner").func_74775_l("Properties").func_150295_c("textures", 10).func_150305_b(0).func_74779_i("Value")
}

/**
  * Gets text and displays it on the screen and plays a pling
  * @param {string} string to be displayed
*/
export function alert(title) {
  World.playSound("note.pling", 100, 1)
  Client.showTitle(title, "", 10, 100, 10);
}

export function isCoordinateInsideBox(coord, corner1, corner2) {
  const min = {
    x: Math.min(corner1.x, corner2.x),
    y: Math.min(corner1.y, corner2.y),
    z: Math.min(corner1.z, corner2.z)
  };
  const max = {
    x: Math.max(corner1.x, corner2.x),
    y: Math.max(corner1.y, corner2.y),
    z: Math.max(corner1.z, corner2.z)
  };
  return coord.x >= min.x && coord.x <= max.x
    && coord.y >= min.y && coord.y <= max.y
    && coord.z >= min.z && coord.z <= max.z;
}

const corner1 = { x: -8, y: 254, z: 147 };
const corner2 = { x: 134, y: 0, z: -8 };

/**
  * Returns where abouts of the player
  * @returns {string} the phase you are in the m7
  * @returns {boolean} true if you are in the m7 boss
*/
export function getPhase() {
  let inBoss = false;
  let inPhase = null;
  if (Dungeon.floor != "F7" && Dungeon.floor != "M7") return

  if (Dungeon.inDungeon && isCoordinateInsideBox({ x: Player.getX(), y: Player.getY(), z: Player.getZ() }, corner1, corner2)) {
    inBoss = true;
    if (Player.getY() > 210) {
      inPhase = "p1";
    } else if (Player.getY() > 155) {
      inPhase = "p2";
    } else if (Player.getY() > 100) {
      inPhase = "p3";
    } else if (Player.getY() > 45) {
      inPhase = "p4";
    } else {
      inPhase = "p5";
    }
  }

  return inBoss ? inPhase : false;
}


/**
  * Draws a rectangle
  * @param {number} r Red
  * @param {number} g Green
  * @param {number} b Blue
  * @param {number} a Alpha
  * @param {number} x X
  * @param {number} y Y
  * @param {number} w Width
  * @param {number} h Height
*/
export const rect = (r,g,b,a,x,y,width,height) => Renderer.drawRect(Renderer.color(r, g, b, a), x, y, width, height)

/**
  * Draws a centered string
  * @param {object} font the font you want to be rendered
  * @param {string} string the string to be centered
  * @param {number} x X
  * @param {number} y Y
  * @param {number} r Red
  * @param {number} g Green
  * @param {number} b Blue
  * @param {number} a Alpha
*/
export const centeredString = (thefont,text,x,y,r,g,b,a) => thefont.drawStringWithShadow(text,x+(70 - font2.getWidth(text)) / 2 + 15,y + 5,new java.awt.Color(r,g,b,a))

/**
  * Draws a normal string
  * @param {object} font the font you want to be rendered
  * @param {string} string the string to be centered
  * @param {number} x X
  * @param {number} y Y
  * @param {number} r Red
  * @param {number} g Green
  * @param {number} b Blue
  * @param {number} a Alpha
*/
export const normalString = (thefont,text,x,y,r,g,b,a) => thefont.drawStringWithShadow(text,x,y + 5,new java.awt.Color(r,g,b,a))


/**
  * Plays a gui clicking sound 
*/
export const makePressSound = () => World.playSound('gui.button.press', 1, 1)

/**
  * Makes a beacon with a box at the start and text in the box
  * @param {string} string the text to be presented 
  * @param {number} renderx X
  * @param {number} rendery Y
  * @param {number} renderz Z
  * @param {number} r Red
  * @param {number} g Green
  * @param {number} b Blue
*/
export const renderCustomBeacon = (text, renderx, rendery, renderz, r, g, b ) => {
  renderBeaconBeam(renderx - 0.5, rendery, renderz - 0.5, r, g, b, 0.5, false);
  RenderLib.drawEspBox(renderx, rendery, renderz, 1, 1, r, g, b, 0.5, true)
  Tessellator.drawString(text, renderx, rendery + 0.7, renderz)
}

/**
  * Sends a C08PacketPlayerBlockPlacement packet
*/
export function sendPlacementPacket() {
  Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(Player.getPlayer().field_71071_by.func_70448_g()))
}

/**
  * Clicks a window slot
  * 
  * @param {number} itemIndex The index of the item in the window
  * @param {number} clickType The type of click
*/
export function windowClick(itemIndex, clickType) {
  Client.getMinecraft().field_71442_b.func_78753_a(Player.getPlayer().field_71069_bz.field_75152_c, itemIndex, Player.getHeldItemIndex(), clickType, Player.getPlayer())
}

/**
 * Uses an item from the Player's Inventory
 * @param {int} itemIndex Has to be bigger than 8 to work
*/
export const useItemFromInv = (itemIndex) => {
  if (itemIndex < 8) return
  const currentHeldItemStack = Player.getHeldItem().itemStack
  windowClick(itemIndex, 2)
  sendPlacementPacket()
  windowClick(itemIndex, 2)
  Player.getPlayer().field_71071_by.field_70462_a[Player.getPlayer().field_71071_by.field_70461_c] = currentHeldItemStack
}

/**
 * Uses an item from the Player's Inventory
 * @param {int} itemIndex Has to be bigger than 8 to work
*/
export const hitWithItemFromInv = (itemIndex, blockpos) => {
  if (itemIndex < 8) return
  const currentHeldItemStack = Player.getHeldItem().itemStack
  windowClick(itemIndex, 2)
  Client.getMinecraft()?.field_71442_b?.func_180511_b(blockpos, Client.getMinecraft()?.field_71476_x?.field_178784_b)
  windowClick(itemIndex, 2)
  Player.getPlayer().field_71071_by.field_70462_a[Player.getPlayer().field_71071_by.field_70461_c] = currentHeldItemStack
}