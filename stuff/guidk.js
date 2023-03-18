import PogObject from "../../PogData"
import Font from "../../fontlib"
import { File } from "../java-stuff"
import { modMessage, centeredString, makePressSound, normalString, rect } from "../utils"
import { descriptions } from "./descriptions"
const font2 = new Font('OdinCheata/stuff/Minecraft.ttf', 21)
const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")

const Logo = new File("./config/ChatTriggers/modules/OdinCheata/stuff/OdinClientNoBackround.png")
const image = new Image(Logo)

register('command', (...args) => {
    if (!args[0]) {
        mainGui.open()
        return
    }
    ChatLib.command(`ochat ${args.join(' ')}`)
}).setName('odincheata').setAliases("oc")

export const data = new PogObject("OdinCheata", {
    'auto': {
        'x': 120,
        'y': 20,
        'dropDown': true,
        "autoReady": {
            "toggle": false,
            "name": "Auto Ready",
        },
        "autoMort": {
            "toggle": false,
            "name": "Auto Mort",
        },
        "autoUlt": {
            "toggle": false,
            "name": "Auto Ult",
        },
        "autoShield": {
            "toggle": false,
            "name": "Auto Shield",
        },
        "autoWish": {
            "toggle": false,
            "name": "Auto Wish",
        },
        "autoMask": {
            "toggle": false,
            "name": "Auto Mask",
        },
        "autoEdrag": {
            "toggle": false,
            "name": "Auto Edrag",
        },
        "autoLeap": {
            "toggle": false,
            "name": "Auto Leap",
        },
        "autoSell": {
            "toggle": false,
            "name": "Auto Sell",
        }
    },

    'legit': {
        'x': 320,
        'y': 20,
        'dropDown': true,
        "partyCmds": {
            "toggle": false,
            "name": "Party Cmds",
        },
        "guildCmds": {
            "toggle": false,
            "name": "Guild Cmds",
        },
        "guildGM": {
            "toggle": false,
            "name": "Guild GM",
        },
        "dragonBoxes": {
            "toggle": false,
            "name": "Dragon Boxes",
        },
        "dragonTimer": {
            "toggle": false,
            "name": "Dragon Timer",
        },
        "powerDisplay": {
            "toggle": false,
            "name": "Power Display",
        },
        "abiphoneGhoster": {
            "toggle": false,
            "name": "Abiphone Ghoster",
        },
        "fpsBoost": {
            "toggle": false,
            "name": "FPS Boost",
        }
    },

    'nether': {
        'x': 520,
        'y': 20,
        'dropDown': true,
        "brokenHype": {
            "toggle": false,
            "name": "Broken Hype",
        },
        "flareTimer": {
            "toggle": false,
            "name": "Flare Timer",
        },
        "vanqNotifier": {
            "toggle": false,
            "name": "Vanq Notifier",
        },
        "kuudraAlerts": {
            "toggle": false,
            "name": "Kuudra Alerts",
        },
      
    },
    
    'qol': {
        'x': 720,
        'y': 20,
        'dropDown': true,
        "relicAura": {
            "toggle": false,
            "name": "Relic Aura",
        },
        "itemMacros": {
            "toggle": false,
            "name": "Item Macros",
        },
        "terminatorAC": {
            "toggle": false,
            "name": "Terminator AC",
        },
        "cookieClicker": {
            "toggle": false,
            "name": "Cookie Clicker",
        },
        "esp": {
            "toggle": false,
            "name": "ESP",
        },
        "fuckDiorite": {
            "toggle": false,
            "name": "FUCK DIORITE",
        },
        "preGhostBlock": {
            "toggle": false,
            "name": "Pre Ghostblock",
        },
        "m7Sounds": {
            "toggle": false,
            "name": "Custom M7 Music",
        },
        "superBoom": {
            "toggle": false,
            "name": "Superboom",
        },
    }
}, "data.json")


let mainGui = new Gui()
let buttonHeight = 20
let buttonWidth = 100
let shouldRemove = true
const tabs = [data.auto, data.legit, data.nether, data.qol]
const tabTitles = ['Auto', 'Legit', 'Nether', 'QOL', 'Auto Boss']

/**
  * Draws a tab
  * @param {object} tab Tab
*/
const drawTab = (tab) => {
    if (!tab.dropDown) return
    Object.entries(tab).forEach((key, i, value) => {
        if (key[0] === 'x' || key[0] === 'y' || key[0] === 'dropDown') return
        rect(0, 0, 0, 150, tab.x, tab.y + (buttonHeight * (i - 2)), buttonWidth, buttonHeight)
        if (key[1].toggle) {
            centeredString(font2, key[1].name, tab.x, tab.y + (buttonHeight * (i - 2)), 0, 200/255, 0, 1)
        } else {
            centeredString(font2, key[1].name, tab.x, tab.y + (buttonHeight * (i - 2)), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
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
const drawDesc = (mx, my, tab, index) => {
    if (!tab.dropDown) return
    if (mx < tab.x || mx > tab.x+buttonWidth) return
    toshow = Math.floor((my - tab.y - buttonHeight) / buttonHeight)
    if (toshow < 0 || toshow > descriptions[index].length - 1) return
    if (tab.x < 500) {
        rect(45, 45, 45, 255, tab.x + buttonWidth, my - 5, font2.getWidth(descriptions[index][toshow]) + 2, buttonHeight - 3)
        normalString(font2, descriptions[index][toshow], tab.x+buttonWidth+1, my-6, 0.8, 0.8, 0.8, 1)
    } else {
        rect(45, 45, 45, 255, tab.x - font2.getWidth(descriptions[index][toshow]) - 4, my - 5, font2.getWidth(descriptions[index][toshow]) + 4, buttonHeight - 3)
        normalString(font2, descriptions[index][toshow], tab.x - font2.getWidth(descriptions[index][toshow]) - 2, my-6, 0.8, 0.8, 0.8, 1)
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
const checkDrag = (dx, dy, mx, my, tab) => {
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
const checkTab = (mx, my, b, tab) => {
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

register('renderOverlay', () => {
    if (!mainGui.isOpen()) {
        if (shouldRemove) {
            Client.getMinecraft().field_71460_t.func_181022_b()
            shouldRemove = false
        }
        return
    }
    shouldRemove = true
    image?.draw(670, 400, 280, 140)

    mx = Client.getMouseX()
    my = Client.getMouseY()

    tabs.forEach((tab, index) => {
        rect(255, 215, 0, 225, tab.x, tab.y, buttonWidth, buttonHeight)
        centeredString(font2, tabTitles[index], tab.x, tab.y, 1, 0, 0, 1)
        drawTab(tab)
    })
    tabs.forEach((tab, index) => drawDesc(mx, my, tab, index))

    Client.getMinecraft().field_71460_t.func_181022_b()
    Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation("shaders/post/blur.json"))
})



register('dragged', (dx, dy, x, y, b) => {
    if (!mainGui.isOpen() || b != 0) return
    tabs.forEach(tab => checkDrag(dx, dy, mx, my, tab))
    data.save()
})

register('clicked', (x, y, b, isDown) => {
    if (!isDown || !mainGui.isOpen()) return
    tabs.forEach(tab => checkTab(x, y, b, tab))
    data.save()
})