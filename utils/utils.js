import renderBeaconBeam from "../../BeaconBeam"
import { getDistance3D } from "../../BloomCore/utils/Utils"
import RenderLib from "../../RenderLib"
import Font from "../../fontlib"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

export const Executors = Java.type("java.util.concurrent.Executors")
export const File = Java.type("java.io.File")
export const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")
export const ItemSkull = Java.type("net.minecraft.item.ItemSkull");
export const tabTitles = ['General', 'Dungeons', 'QOL']


export const fontpower = new Font('OdinClient/assets/Minecraft.ttf', 30)
export const fontmc = new Font('OdinClient/assets/Minecraft.ttf', 21)
export const opensansbold = new Font('OdinClient/assets/OpenSans-Bold.ttf', 28)
export const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus")

export const buttonHeight = 20
export const buttonWidth = 100

/**
 * Sends a chat message with the mod prefix.
 * @param {string} string - The message to be sent.
*/
export const modMessage = (string) =>  ChatLib.chat("§6[Odin§4Client] §r" + string)

/**
 * Sends a message to the guild chat.
 * @param {string} message - The message to be sent.
*/
export const guildMessage = (message) => ChatLib.command("gc " + message)

/**
 * Sends a message to the party chat.
 * @param {string} message - The message to be sent.
*/
export const partyMessage = (message) => ChatLib.command("pc " + message)

/**
 * Sends a private message (reply).
 * @param {string} message - The message to be sent.
*/
export const privateMessage = (message) => ChatLib.command("r " + message)

/**
 * Shows an alert with a title and plays a sound.
 * @param {string} title - The title of the alert.
 */
export const alert = (title) => {
  World.playSound("note.pling", 120, 1)
  Client.showTitle(title, "", 15, 150, 15);
}

/**
 * Returns the entity render parameters for a given Minecraft entity.
 * @param {object} mcEntity - The Minecraft entity.
 * @param {number} partialTicks - The partial ticks for rendering.
 * @returns {Array} An array with the entity render parameters.
 */
export const getEntityRenderParams = (mcEntity, partialTicks) => {
  return [
    mcEntity.field_70142_S + (mcEntity.field_70165_t - mcEntity.field_70142_S) * partialTicks,
    mcEntity.field_70137_T + (mcEntity.field_70163_u - mcEntity.field_70137_T) * partialTicks,
    mcEntity.field_70136_U + (mcEntity.field_70161_v - mcEntity.field_70136_U) * partialTicks,
    mcEntity.field_70130_N,
    mcEntity.field_70131_O
  ]
}


/**
 * Returns the squared 3D distance between two Minecraft entities.
 * @param {object} mcEntity1 - The first Minecraft entity.
 * @param {object} mcEntity2 - The second Minecraft entity.
 * @returns {number} The squared 3D distance between the two entities.
 */
export const noSqrt3DDistance = (mcEntity1, mcEntity2) => {
  return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
    Math.pow(mcEntity1.field_70163_u - mcEntity2.field_70163_u, 2) +
    Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}

/**
 * Returns the squared 2D distance between two Minecraft entities.
 * @param {object} mcEntity1 - The first Minecraft entity.
 * @param {object} mcEntity2 - The second Minecraft entity.
 * @returns {number} The squared 2D distance between the two entities.
 */
export const noSqrt2DDistance = (mcEntity1, mcEntity2) => {
  return Math.pow(mcEntity1.field_70165_t - mcEntity2.field_70165_t, 2) +
    Math.pow(mcEntity1.field_70161_v - mcEntity2.field_70161_v, 2)
}


/**
 * Retrieves the texture of the helmet from the given entity.
 * @param {object} entity - The entity whose helmet texture should be retrieved.
 * @returns {string} The helmet texture if available, or undefined.
 */
export const getCtEntityHelmetTexture = (entity) => getMcEntityHelmetTexture(entity.getEntity())

/**
 * Retrieves the texture of the helmet from the given Minecraft entity.
 * @param {object} entity - The Minecraft entity whose helmet texture should be retrieved.
 * @returns {string} The helmet texture if available, or undefined.
 */
export const getMcEntityHelmetTexture = (entity) => {
  const helmet = entity?.func_71124_b(4)
  if (!helmet || !(helmet.func_77973_b() instanceof ItemSkull)) return undefined
  return getSkullTexture(helmet)
}

/**
 * Retrieves the texture of the given skull item.
 * @param {object} skull - The skull item whose texture should be retrieved.
 * @returns {string} The skull texture if available, or undefined.
 */
export const getSkullTexture = (skull) => {
  const nbt = skull.func_77978_p()
  if (!nbt?.func_150297_b("SkullOwner", 10)) return undefined
  return nbt.func_74775_l("SkullOwner").func_74775_l("Properties").func_150295_c("textures", 10).func_150305_b(0).func_74779_i("Value")
}

/**
 * Renders a custom beacon with text.
 * @param {string} text - The text to be displayed on the beacon.
 * @param {number} renderx - The x-coordinate of the beacon.
 * @param {number} rendery - The y-coordinate of the beacon.
 * @param {number} renderz - The z-coordinate of the beacon.
 * @param {number} r - The red value of the beacon color.
 * @param {number} g - The green value of the beacon color.
 * @param {number} b - The blue value of the beacon color.
 * @param {number} a - The alpha value of the beacon color.
 */

export const renderCustomBeacon = (text, renderx, rendery, renderz, r, g, b, a) => {
  dist = Math.round(getDistance3D(renderx, rendery, renderz, Player.getX(), Player.getY(), Player.getZ()))
  r = r / 255
  g = g / 255
  b = b / 255
  renderBeaconBeam(renderx - 0.5, rendery, renderz - 0.5, r, g, b, a, false);
  RenderLib.drawEspBox(renderx, rendery, renderz, 1, 1, r, g, b, a, true)
  Tessellator.drawString(`${text} §f(§3${dist}m§f)`, renderx, rendery + 0.7, renderz)
}

/**
 * Renders a box with text at the specified coordinates.
 * @param {number} renderx - The x-coordinate of the box.
 * @param {number} rendery - The y-coordinate of the box.
 * @param {number} renderz - The z-coordinate of the box.
 * @param {string} text - The text to be displayed on the box.
 */
export const renderBoxWithText = (renderx, rendery, renderz, text) => {
  RenderLib.drawEspBox(renderx + 0.5, rendery, renderz + 0.5, 1, 1, 1, 0, 0, 0.5, false)
  Tessellator.drawString(text, renderx + 0.5, rendery + 0.7, renderz + 0.5)
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
export const centeredString = (thefont,text,x,y,r,g,b,a) => thefont.drawStringWithShadow(text,x+(70 - thefont.getWidth(text)) / 2 + 15,y + 5,new java.awt.Color(r,g,b,a))

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
  * Draws a tab
  * @param {object} tab Tab
*/
export const drawTab = (tab) => {
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
export const drawDesc = (mx, my, tab, index) => {
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

/**
* Checks what tab was dragged, then handles that drag
* @param {number} dx Delta X
* @param {number} dy Delta Y
* @param {number} mx Mouse X
* @param {number} my Mouse Y
* @param {object} tab Tab
*/
export const checkDrag = (dx, dy, mx, my, tab) => {
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
export const checkTab = (mx, my, b, tab) => {
  if (mx < (tab.x) || mx > (tab.x + buttonWidth)) return
  const toChange = Math.floor((my - (tab.y + buttonHeight)) / buttonHeight)
  const key = tab[Object.keys(tab)[toChange + 3]]
  if (b == 0 && toChange >= 0 && toChange <= Object.keys(tab).length - 4) {
    key.toggle = !key.toggle
    makePressSound()
    for (c in callbacks) c()
  } else if (b == 1 && toChange == -1) {
    tab.dropDown = !tab.dropDown
    makePressSound()
  }
}

String.prototype.capitalize = () => this.charAt(0).toUpperCase() + this.slice(1)

export const isCoordinateInsideBox = (coord, corner1, corner2) => {
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
export const getPhase = () => {
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

const romanHash = {
  I: 1,
  V: 5,
  X: 10
};
export const romanToInt = (s) => {
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanHash[roman[i]];
    const next = romanHash[roman[i + 1]];
    result += current < next ? -current : current;
  }
  return result;
}