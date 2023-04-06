import PogObject from "../../PogData"
import Font from "../../FontLib"
import { File } from "../java-stuff"
import { centeredString, rect, checkDrag, checkTab, drawTab, drawDesc, buttonHeight, buttonWidth } from "../utils"
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

const tabs = [data.auto, data.legit, data.nether, data.qol]
const tabTitles = ['Auto', 'Legit', 'Nether', 'QOL', 'Auto Boss']
let mainGui = new Gui()
let shouldRemove = true

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