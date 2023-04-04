import PogObject from "../../PogData"
import Font from "../../fontlib"
import { File } from "../java-stuff"
import { modMessage, centeredString, makePressSound, normalString, rect } from "../utils"
// import { descriptions } from "./descriptions"
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
            "description": "Automatically clicks in the ready GUI",
        },
        "autoMort": {
            "toggle": false,
            "name": "Auto Mort",
            "description": "Automatically gets in range of mort and opens his GUI",
        },
        "autoUlt": {
            "toggle": false,
            "name": "Auto Ult",
            "description": "Automatically uses class ultimate on certain times",
        },
        "autoShield": {
            "toggle": false,
            "name": "Auto Shield",
            "description": "Automatically uses wither shield when not full hp and in boss",
        },
        "autoWish": {
            "toggle": false,
            "name": "Auto Wish",
            "description": "Automatically uses wish when a temmate is low HP",
        },
        "autoMask": {
            "toggle": false,
            "name": "Auto Mask",
            "description": "Automatically swaps between bonzo and spirit mask",
        },
        "autoEdrag": {
            "toggle": false,
            "name": "Auto Edrag",
            "description": "Automatically equips edrag after relics",
        },
        "autoLeap": {
            "toggle": false,
            "name": "Auto Leap",
            "description": "Automatically leaps to a player when writing !tp in party chat",
        },
        "autoSell": {
            "toggle": false,
            "name": "Auto Sell",
            "description": "Automatically sells items in the trades GUI, /autosell to configure"
        }
    },

    'legit': {
        'x': 320,
        'y': 20,
        'dropDown': true,
        "partyCmds": {
            "toggle": false,
            "name": "Party Cmds",
            "description": "Custom party commands use !help in party chat",
        },
        "guildCmds": {
            "toggle": false,
            "name": "Guild Cmds",
            "description": "Custom guild commands use !help in guild chat",
        },
        "guildGM": {
            "toggle": false,
            "name": "Guild GM",
            "description": "Responds to anyone in guild chat saying gm/gn",
        },
        "dragonBoxes": {
            "toggle": false,
            "name": "Dragon Boxes",
            "description": "Creates custom and decently accurate boxes in p5",
        },
        "dragonTimer": {
            "toggle": false,
            "name": "Dragon Timer",
            "description": "Shows when a M7 dragon will spawn",
        },
        "powerDisplay": {
            "toggle": false,
            "name": "Power Display",
            "description": "Shows the power blessing /movepower",
        },
        "abiphoneGhoster": {
            "toggle": false,
            "name": "Abiphone Ghoster",
            "description": "Ghosts calls from abiphone", 
        },
        "fpsBoost": {
            "toggle": false,
            "name": "FPS Boost",
            "description": "Boosts fps cause yes",
        }
    },

    'nether': {
        'x': 520,
        'y': 20,
        'dropDown': true,
        "brokenHype": {
            "toggle": false,
            "name": "Broken Hype",
            "description": "Automatically alerts when your hype is broken",
        },
        "flareTimer": {
            "toggle": false,
            "name": "Flare Timer",
            "description": "Shows a timer and the type of the flare around you /moveflare",
        },
        "vanqNotifier": {
            "toggle": false,
            "name": "Vanq Notifier",
            "description": "Automatically sends a message in party chat and makes a beacon whenever odinclient/patcher sends coords in party chat",
        },
        "kuudraAlerts": {
            "toggle": false,
            "name": "Kuudra Alerts",
            "description": "Shows messages on screen on specific events in kuudra",
        },
      
    },
    
    'qol': {
        'x': 720,
        'y': 20,
        'dropDown': true,
        "relicAura": {
            "toggle": false,
            "name": "Relic Aura",
            "description": "Automatically picks up relics when you are within 5 blocks of them",
        },
        "itemMacros": {
            "toggle": false,
            "name": "Item Macros",
            "description": "Custom item macros check controls",
        },
        "terminatorAC": {
            "toggle": false,
            "name": "Terminator AC",
            "description": "Spams right click while term is held, ranomized cps",
        },
        "cookieClicker": {
            "toggle": false,
            "name": "Cookie Clicker",
            "description": "Spams the cookie while in the cookie clicker menu",
        },
        "esp": {
            "toggle": false,
            "name": "ESP",
            "description": "You can add whatever mob you want into the list /esp",
        },
        "fuckDiorite": {
            "toggle": false,
            "name": "FUCK DIORITE",
            "description": "Replaces diorite with glass in p2 (don't use connected blocks)",
        },
        "preGhostBlock": {
            "toggle": false,
            "name": "Pre Ghostblock",
            "description": "Makes ghost blocks and covinient spots in the m7 boss",
        },
        "m7Sounds": {
            "toggle": false,
            "name": "Custom M7 Music",
            "description": "Open the song.js file for instructions its wip if u dont know how to, then its not for you atm",
        },
        "superBoom": {
            "toggle": false,
            "name": "Superboom",
            "description": "Uses superboom if you click on a crypt or boom-able wall",
        },
        "bloodTriggerBot": {
            "toggle": false,
            "name": "Blood triggerbot",
            "description": "Instantly clicks if you are looking at a blood mob when it spawns",
        },
        "bearTriggerBot": {
            "toggle": false,
            "name": "Spirit Bear TB",
            "description": "Instantly clicks if you are looking at a spirit bear when it spawns",
        }
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
    Object.entries(tab).forEach((entry, i) => {
        const key = entry[0]
        const value = entry[1]
        if (key === 'x' || key === 'y' || key === 'dropDown') return
        rect(0, 0, 0, 150, tab.x, tab.y + (buttonHeight * (i - 2)), buttonWidth, buttonHeight)
        if (value.toggle) {
            centeredString(font2, value.name, tab.x, tab.y + (buttonHeight * (i - 2)), 0, 200/255, 0, 1)
        } else {
            centeredString(font2, value.name, tab.x, tab.y + (buttonHeight * (i - 2)), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
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

    if (mx < (tab.x) || mx > (tab.x + buttonWidth)) return
    const toShow = Math.floor((my - (tab.y - buttonHeight)) / buttonHeight)
    if (toshow < 0 || toshow > Object.keys(tab).length - 4) return
    const key = tab[Object.keys(tab)[toChange + 3]]
    const description = key.description
    if (tab.x < 500) {
        rect(45, 45, 45, 255, tab.x + buttonWidth, my - 5, font2.getWidth(description) + 2, buttonHeight - 3)
        normalString(font2, description, tab.x+buttonWidth+1, my-6, 0.8, 0.8, 0.8, 1)
    } else {
        rect(45, 45, 45, 255, tab.x - font2.getWidth(description) - 4, my - 5, font2.getWidth(description) + 4, buttonHeight - 3)
        normalString(font2, description, tab.x - font2.getWidth(description) - 2, my-6, 0.8, 0.8, 0.8, 1)
    }


    // if (mx < tab.x || mx > tab.x+buttonWidth) return
    // toshow = Math.floor((my - tab.y - buttonHeight) / buttonHeight)
    // if (toshow < 0 || toshow > descriptions[index].length - 1) return
    // if (tab.x < 500) {
    //     rect(45, 45, 45, 255, tab.x + buttonWidth, my - 5, font2.getWidth(descriptions[index][toshow]) + 2, buttonHeight - 3)
    //     normalString(font2, descriptions[index][toshow], tab.x+buttonWidth+1, my-6, 0.8, 0.8, 0.8, 1)
    // } else {
    //     rect(45, 45, 45, 255, tab.x - font2.getWidth(descriptions[index][toshow]) - 4, my - 5, font2.getWidth(descriptions[index][toshow]) + 4, buttonHeight - 3)
    //     normalString(font2, descriptions[index][toshow], tab.x - font2.getWidth(descriptions[index][toshow]) - 2, my-6, 0.8, 0.8, 0.8, 1)
    // }
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