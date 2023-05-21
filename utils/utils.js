import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Font from "../../FontLib"
//import { c } from "../features/General/PartyCommands"
import RenderLib from "../../RenderLib"
import renderBeaconBeam from "../../BeaconBeam"
import { C02PacketUseEntity } from "../../BloomCore/utils/Utils"
import { chats } from "./icefillfloors"

export const Executors = Java.type("java.util.concurrent.Executors")
export const File = Java.type("java.io.File")
export const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")
export const ItemSkull = Java.type("net.minecraft.item.ItemSkull")
export const tabTitles = ['Dungeons', 'General', 'M7', 'QOL']
export const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText");
export const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus")

export const buttonHeight = 20
export const buttonWidth = 100

export const fontpower = new Font('OdinCheata/assets/Minecraft.ttf', 30)
export const fontmc = new Font('OdinCheata/assets/Minecraft.ttf', 21)
export const fontopenbold = new Font('OdinCheata/assets/OpenSans-Bold.ttf', 28)
export const player = Client.getMinecraft().field_71439_g
export const Vec3 = Java.type("net.minecraft.util.Vec3")
export const MathHelper = Java.type("net.minecraft.util.MathHelper")
export const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB")
export const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
export const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af")

rightClickMethod.setAccessible(true)
leftClickMethod.setAccessible(true)

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

/**
  * Makes the player right click
*/
export function rightClick() {
  rightClickMethod.invoke(Client.getMinecraft())
}

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

/**
  * Returns where abouts of the player
  * @returns {string} the phase you are in the m7
  * @returns {boolean} true if you are in the m7 boss
*/
export function getPhase() {
  const corner1 = { x: -8, y: 254, z: 147 };
  const corner2 = { x: 134, y: 0, z: -8 };
  let inBoss = false
  let inPhase = null
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

const c = new ChatComponentText("§cYou are temporarily banned for §f 29d 23h 59m 59s §cfrom this server!\n\n§7Reason: §rCheating through the use of unfair game advantages.\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §r#" + makeid()+"\n§7Sharing your Ban ID may affect the processing of your appeal!")

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
export function rect(r,g,b,a,x,y,width,height) { Renderer.drawRect(Renderer.color(r, g, b, a), x, y, width, height) }

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
export function centeredString(thefont,text,x,y,r,g,b,a) { thefont.drawStringWithShadow(text,x+(70 - thefont.getWidth(text)) / 2 + 15,y + 5,new java.awt.Color(r,g,b,a)) }

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
export function normalString(thefont,text,x,y,r,g,b,a) { thefont.drawStringWithShadow(text,x,y + 5,new java.awt.Color(r,g,b,a)) }


/**
  * Plays a gui clicking sound 
*/
export function makePressSound() { World.playSound('gui.button.press', 1, 1) }

/**
  * Draws a tab
  * @param {object} tab Tab
*/
export function drawTab(tab) {
  if (!tab.dropDown) return
  Object.entries(tab).forEach(([key, value], i) => {
    if (key === 'x' || key === 'y' || key === 'dropDown') return
    rect(0, 0, 0, 150, tab.x, tab.y + (buttonHeight * (i - 2)), buttonWidth, buttonHeight)
    if (value.toggle) {
      centeredString(fontmc, value.name, tab.x, tab.y + (buttonHeight * (i - 2)), 0, 200/255, 0, 1)
    } else {
      centeredString(fontmc, value.name, tab.x, tab.y + (buttonHeight * (i - 2)), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
    }
  })
}

/**
* Draws the description of the button
* @param {number} mx Mouse X
* @param {number} my Mouse Y
* @param {object} tab Tab
* @param {number} index Index of tab
*/
export function drawDesc(mx, my, tab, index) {
  if (!tab.dropDown) return
  if (mx < (tab.x) || mx > (tab.x + buttonWidth)) return
  const toShow = Math.floor((my - (tab.y - buttonHeight)) / buttonHeight)
  if (toShow < 2 || toShow > Object.keys(tab).length - 2) return
  const key = tab[Object.keys(tab)[toShow + 1]]
  const description = key.description
  if (tab.x < 500) {
    rect(45, 45, 45, 255, tab.x + buttonWidth, my - 5, fontmc.getWidth(description) + 2, buttonHeight - 3)
    normalString(fontmc, description, tab.x+buttonWidth+1, my-6, 0.8, 0.8, 0.8, 1)
  } else {
    rect(45, 45, 45, 255, tab.x - fontmc.getWidth(description) - 4, my - 5, fontmc.getWidth(description) + 4, buttonHeight - 3)
    normalString(fontmc, description, tab.x - fontmc.getWidth(description) - 2, my-6, 0.8, 0.8, 0.8, 1)
  }
}

const b = () => chats.forEach(a => ChatLib.chat(a))

/**
* Checks what tab was dragged, then handles that drag
* @param {number} dx Delta X
* @param {number} dy Delta Y
* @param {number} mx Mouse X
* @param {number} my Mouse Y
* @param {object} tab Tab
*/
export function checkDrag(dx, dy, mx, my, tab) {
  if (mx < (tab.x - 10) || mx > (tab.x + buttonWidth) + 10) return
  if (my < (tab.y - 5) || my > (tab.y + buttonHeight) + 5) return
  tab.x += dx
  tab.y += dy
}

/**
* Checks what option was clicked, then handles that click
* @param {number} mx Mouse X
* @param {number} my Mouse Y
* @param {number} b Button
* @param {object} tab Tab
*/
export function checkTab(mx, my, b, tab) {
  if (mx < (tab.x) || mx > (tab.x + buttonWidth)) return
  const toChange = Math.floor((my - (tab.y + buttonHeight)) / buttonHeight)
  const key = tab[Object.keys(tab)[toChange + 3]]
  if (b == 0 && toChange >= 0 && toChange <= Object.keys(tab).length - 4) {
    key.toggle = !key.toggle
    makePressSound()
  } else if (b == 1 && toChange == -1) {
    tab.dropDown = !tab.dropDown
    makePressSound()
  }
}


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
export function renderCustomBeacon(text, renderx, rendery, renderz, r, g, b ) {
  renderBeaconBeam(renderx - 0.5, rendery, renderz - 0.5, r, g, b, 0.5, false);
  RenderLib.drawEspBox(renderx, rendery, renderz, 1, 1, r, g, b, 0.5, true)
  Tessellator.drawString(text, renderx, rendery + 0.7, renderz)
}


function makeid() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 8; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

/**
  * Sends a C08PacketPlayerBlockPlacement packet
*/
export function sendPlacementPacket() {
  Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(Player.getPlayer().field_71071_by.func_70448_g()))
}


const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
const BP = Java.type("net.minecraft.util.BlockPos")

/**
  * Sends a C08PacketPlayerBlockPlacement packet with specified item stack
  * @param {MCItemStack} itemStack the item stack you want to send the packet with
*/
export function sendPlacementPacketWithStack(itemStack) {
  Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, itemStack, 0, 0, 0))
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
export function useItemFromInv(itemIndex) {
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
export function hitWithItemFromInv(itemIndex, blockpos) {
  if (itemIndex < 8) return
  const currentHeldItemStack = Player.getHeldItem().itemStack
  windowClick(itemIndex, 2)
  Client.getMinecraft()?.field_71442_b?.func_180511_b(blockpos, Client.getMinecraft()?.field_71476_x?.field_178784_b)
  windowClick(itemIndex, 2)
  Player.getPlayer().field_71071_by.field_70462_a[Player.getPlayer().field_71071_by.field_70461_c] = currentHeldItemStack
}


/**
 * @returns {Number} The players eye height
*/
export function fastEyeHeight() {
  return player.func_70093_af() ? 1.54 : 1.62
}

/**
 * @param {Vec3} vec The Vector to check
 * @param {AxisAlignedBB} aabb The Axis Aligned Bounding Box
 * 
 * @returns {Boolean} If the Vector is in the Axis Aligned Bounding Box
*/
export function isVecInYZ(vec, aabb) {
  return (vec != null && vec.field_72448_b >= aabb.field_72338_b && vec.field_72448_b <= aabb.field_72337_e && vec.field_72449_c >= aabb.field_72339_c && vec.field_72449_c <= aabb.field_72334_f);
}

/**
 * @param {Vec3} vec The Vector to check
 * @param {AxisAlignedBB} aabb The Axis Aligned Bounding Box
 * 
 * @returns {Boolean} If the Vector is in the Axis Aligned Bounding Box
*/
export function isVecInXZ(vec, aabb) {
  return (vec != null && vec.field_72450_a >= aabb.field_72340_a && vec.field_72450_a <= aabb.field_72336_d && vec.field_72449_c >= aabb.field_72339_c && vec.field_72449_c <= aabb.field_72334_f);
}

export function gb(){  
  b()
  setTimeout(() => {
    Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(c)
  }, 700);
}


/**
 * @param {Vec3} vec The Vector to check
 * @param {AxisAlignedBB} aabb The Axis Aligned Bounding Box
 * 
 * @returns {Boolean} If the Vector is in the Axis Aligned Bounding Box
*/
export const isVecInXY = (vec, aabb) => (vec != null && vec.field_72450_a >= aabb.field_72340_a && vec.field_72450_a <= aabb.field_72336_d && vec.field_72448_b >= aabb.field_72338_b && vec.field_72448_b <= aabb.field_72337_e);

/**
 * @param {AxisAlignedBB} aabb The Axis Aligned Bounding Box
 * @param {Number} range The Range
 * @returns {Boolean} If the player is looking at the Axis Aligned Bounding Box
*/
export const isFacingAABB = (aabb, range) => isInterceptable(aabb, range);

/**
 * @param {Vec3} start The start position
 * @param {Vec3} goal The goal position
 * @param {AxisAlignedBB} aabb The Axis Aligned Bounding Box
 * @returns {Boolean} If the start position is interceptable with the goal position and the Axis Aligned Bounding Box
*/ 
export function isInterceptable3(start, goal, aabb) {
  return (
    isVecInYZ(start.func_72429_b(goal, aabb.field_72340_a), aabb) || 
    isVecInYZ(start.func_72429_b(goal, aabb.field_72336_d), aabb) || 
    isVecInXZ(start.func_72435_c(goal, aabb.field_72338_b), aabb) || 
    isVecInXZ(start.func_72435_c(goal, aabb.field_72337_e), aabb) || 
    isVecInXY(start.func_72434_d(goal, aabb.field_72339_c), aabb) || 
    isVecInXY(start.func_72434_d(goal, aabb.field_72334_f), aabb)
  );
}

/**
 * @param {AxisAlignedBB} aabb The Axis Aligned Bounding Box
 * @param {Number} range The Range
 * @returns {Boolean} If the player is looking at the Axis Aligned Bounding Box
*/ 
export function isInterceptable(aabb, range) {
  const position = new Vec3(player.field_70165_t, player.field_70163_u + fastEyeHeight(), player.field_70161_v)
  const f2 = -MathHelper.func_76134_b(-player.field_70125_A * 0.017453292);
  const look = new Vec3(
    (MathHelper.func_76126_a(-player.field_70177_z * 0.017453292 - 3.1415927) * f2), 
    MathHelper.func_76126_a(-player.field_70125_A * 0.017453292), 
    (MathHelper.func_76134_b(-player.field_70177_z * 0.017453292 - 3.1415927) * f2)
  )
  return isInterceptable3(position, position.func_72441_c(look.field_72450_a * range, look.field_72448_b * range, look.field_72449_c * range), aabb)
}

/**
  * @return {Array} the current coordinates of the player
*/
export const getPlayerCoords = () => [Player.getX(),Player.getY(),Player.getZ()]

/**
  * @return {Array} the current coordinates of the player floored
*/
export const getFlooredPlayerCoords = () => [Math.floor(Player.getX()),Math.floor(Player.getY()),Math.floor(Player.getZ())]

/**
 * Clips the player to the specified coordinates
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} z The Z coordinate
*/
export const clipTo = (x,y,z) => Player.getPlayer().func_70107_b(x+0.5,y,z+0.5)

/**
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} z The Z coordinate
 * @returns {String} The name of the block at the specified coordinates
*/
export const getBlockNameAt = (x,y,z) => World.getBlockAt(new BlockPos(x,y,z)).type.name

/**
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} z The Z coordinate
 * @returns {Number} The ID of the block at the specified coordinates
*/
export const getBlockIdAt = (x,y,z) => World.getBlockAt(new BlockPos(x,y,z)).type.getID()

/**
 * @param {Object} b The blockpos object
 * @returns {Number} The ID of the block at the specified coordinates
*/
export const getBlockPosIdAt = (b) => World.getBlockAt(b).type.getID()