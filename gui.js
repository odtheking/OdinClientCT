import PogObject from "../PogData"
import { centeredString, rect, checkDrag, checkTab, drawTab, drawDesc, buttonHeight, buttonWidth, File, fontmc, ResourceLocation, tabTitles } from "./utils/utils"

const Logo = new File("./config/ChatTriggers/modules/OdinCheata/assets/OdinClientNoBackround.png")
const image = new Image(Logo)

register('command', (...args) => {
    if (!args[0]) {
        mainGui.open()
        return
    }
    ChatLib.command(`ochat ${args.join(' ')}`)
}).setName('odincheata').setAliases("oc")

export const data = new PogObject("OdinCheata", {
    'dungeons': {
        'x': 120,
        'y': 20,
        'dropDown': true,
        "autoIcefill": {
            "toggle": false,
            "name": "Auto Icefill",
            "description": "Automatically does the ice fill puzzle in dungeons",
        },
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
        "autoLeap": {
            "toggle": false,
            "name": "Auto Leap",
            "description": "Automatically leaps to a player when writing !tp in party chat",
        },
        "powerDisplay": {
            "toggle": false,
            "name": "Power Display",
            "description": "Shows the power blessing /movepower",
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
        },
        "superBoom": {
            "toggle": false,
            "name": "Superboom",
            "description": "Uses superboom if you click on a crypt or boom-able wall",
        },
        "bloodTracker": {
            "toggle": false, 
            "name": "Blood Tracker",
            "description": "Shows how many blood mobs are left",
        }, 
    },

    'general': {
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
        "autoSell": {
            "toggle": false,
            "name": "Auto Sell",
            "description": "Automatically sells items in the trades GUI, /autosell to configure"
        },
        "deployableTimer": {
            "toggle": false,
            "name": "Deployable Timer",
            "description": "Shows a timer and the type of the deployable around you /moveflare",
        },
        "kuudraAlerts": {
            "toggle": false,
            "name": "Kuudra Alerts",
            "description": "Shows messages on screen on specific events in kuudra",
        },
        "esp": {
            "toggle": false,
            "name": "ESP",
            "description": "You can add whatever mob you want into the list /esp",
        },
        "arrowTrajectory": {
            "toggle": false,
            "name": "Arrow Trajectory",
            "description": "Renders 3 boxes where an arrow of a terminator is expected to land. The farther the shot, the less error",
        },
        "portalFix": {
            "toggle": false,
            "name": "Portal Fix",
            "description": "Allows you to open GUIs in a portal and removes the nausea effect and portal effect overlay",
        },
        
    },

    'm7': {
        'x': 520,
        'y': 20,
        'dropDown': true,
        "relicAura": {
            "toggle": false,
            "name": "Relic Aura",
            "description": "Automatically picks up relics when you are within 5 blocks of them",
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
        "autoEdrag": {
            "toggle": false,
            "name": "Auto Edrag",
            "description": "Automatically equips edrag after relics",
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
        "p5Waypoints": {
            "toggle": false,
            "name": "P5 Waypoints",
            "description": "Marks specific location in the p5 of m7",
        },
        "m7Sounds": {
            "toggle": false,
            "name": "Custom M7 Music",
            "description": "Open the song.js file for instructions its wip if u dont know how to, then its not for you atm",
        },      
    },
    
    'qol': {
        'x': 720,
        'y': 20,
        'dropDown': true,
        "brokenHype": {
            "toggle": false,
            "name": "Broken Hype",
            "description": "Automatically alerts when your hype is broken",
        },
        "vanqNotifier": {
            "toggle": false,
            "name": "Vanq Notifier",
            "description": "Automatically sends a message in party chat and makes a beacon whenever odinclient/patcher sends coords in party chat",
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
        "abiphoneGhoster": {
            "toggle": false,
            "name": "Abiphone Ghoster",
            "description": "Ghosts calls from abiphone", 
        },
        "fpsBoost": {
            "toggle": false,
            "name": "FPS Boost",
            "description": "Boosts fps cause yes",
        },
        "wayPoints": {
            "toggle": false,
            "name": "WayPoints",
            "description": "Makes a waypoint whenever getting coords in chat and /ow for an instant one of ur coords",
        },
        "noBlockAnimation": {
            "toggle": false,
            "name": "No Block Animation",
            "description": "Disables the block animation of swords with a right click ability, acts like NoSlow",
        },
    }
}, "config/guidata.json")

const tabs = [data.dungeons, data.general, data.m7, data.qol]
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

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i]
        rect(255, 215, 0, 225, tab.x, tab.y, buttonWidth, buttonHeight)
        centeredString(fontmc, tabTitles[i], tab.x, tab.y, 1, 0, 0, 1)
        drawTab(tab)
        drawDesc(mx, my, tab, index)
    }

    Client.getMinecraft().field_71460_t.func_181022_b()
    Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation("shaders/post/blur.json"))
})

register('dragged', (dx, dy, x, y, b) => {
    if (!mainGui.isOpen() || b != 0) return
    for (let tab of tabs) checkDrag(dx, dy, mx, my, tab)
    data.save()
})

register('clicked', (x, y, b, isDown) => {
    if (!isDown || !mainGui.isOpen()) return
    for (let tab of tabs) checkTab(x, y, b, tab)
    data.save()
})