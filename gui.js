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
            "description": "Automates the ice fill puzzle in dungeons for a seamless experience",
        },
        "autoReady": {
            "toggle": false,
            "name": "Auto Ready",
            "description": "Instantly clicks the ready button in the GUI for faster dungeon progression",
        },
        "autoMort": {
            "toggle": false,
            "name": "Auto Mort",
            "description": "Effortlessly moves within range of Mort and opens his GUI for smooth interaction",
        },
        "autoUlt": {
            "toggle": false,
            "name": "Auto Ult",
            "description": "Automatically triggers class ultimate at optimal moments for maximum effectiveness",
        },
        "autoShield": {
            "toggle": false,
            "name": "Auto Shield",
            "description": "Activates wither shield when health is low and in boss fights for added protection",
        },
        "autoWish": {
            "toggle": false,
            "name": "Auto Wish",
            "description": "Automatically casts wish to heal teammates when their HP is low",
        },
        "autoMask": {
            "toggle": false,
            "name": "Auto Mask",
            "description": "Seamlessly switches between Bonzo and Spirit Mask for optimal performance",
        },
        "autoLeap": {
            "toggle": false,
            "name": "Auto Leap",
            "description": "Automatically leaps to a player upon typing !tp in party chat for rapid assistance",
        },
        "powerDisplay": {
            "toggle": false,
            "name": "Power Display",
            "description": "Displays the power blessing and move power for enhanced awareness",
        },
        "bloodTriggerBot": {
            "toggle": false,
            "name": "Blood Triggerbot",
            "description": "Automatically clicks when targeting a blood mob as it spawns for quick response",
        },
        "bearTriggerBot": {
            "toggle": false,
            "name": "Spirit Bear TB",
            "description": "Instantly clicks when aiming at a spirit bear as it spawns for rapid engagement",
        },
        "superBoom": {
            "toggle": false,
            "name": "Superboom",
            "description": "Automatically uses Superboom when clicking on crypts or boom-able walls for swift progress",
        },
        "bloodTracker": {
            "toggle": false,
            "name": "Blood Tracker",
            "description": "Displays the remaining blood mobs for better tracking and completion",
        },
        "secretHitboxes": {
            "toggle": false,
            "name": "Secret Hitboxes",
            "description": "Changes Lever hitboxes to a full sized block",
        },
    },

    'general': {
        'x': 320,
        'y': 20,
        'dropDown': true,
        "partyCmds": {
            "toggle": false,
            "name": "Party Cmds",
            "description": "Enhanced party commands; type !help in party chat for usage",
        },
        "guildCmds": {
            "toggle": false,
            "name": "Guild Cmds",
            "description": "Advanced guild commands; type !help in guild chat for instructions",
        },
        "guildGM": {
            "toggle": false,
            "name": "Guild GM",
            "description": "Automatically responds to guild chat greetings and farewells (gm/gn)",
        },
        "autoSell": {
            "toggle": false,
            "name": "Auto Sell",
            "description": "Effortlessly sells items in trades GUI; use /autosell to configure settings"
        },
        "deployableTimer": {
            "toggle": false,
            "name": "Deployable Timer",
            "description": "Displays a timer and deployable type around you; use /moveflare to adjust",
        },
        "kuudraAlerts": {
            "toggle": false,
            "name": "Kuudra Alerts",
            "description": "Provides on-screen notifications for specific events in Kuudra",
        },
        "esp": {
            "toggle": false,
            "name": "ESP",
            "description": "Customize mob tracking by adding desired mobs to the list with /esp",
        },
        "arrowTrajectory": {
            "toggle": false,
            "name": "Arrow Trajectory",
            "description": "Displays three boxes indicating the expected landing points of a Terminator arrow; accuracy decreases with distance",
        },
        "portalFix": {
            "toggle": false,
            "name": "Portal Fix",
            "description": "Enables GUI access in portals and removes nausea effect and portal overlay for a better experience",
        },

        
    },

    'm7': {
        'x': 520,
        'y': 20,
        'dropDown': true,
        "relicAura": {
            "toggle": false,
            "name": "Relic Aura",
            "description": "Automatically collects relics within a 5-block radius",
        },
        "dragonBoxes": {
            "toggle": false,
            "name": "Dragon Boxes",
            "description": "Displays custom and reasonably accurate bounding boxes in Phase 5",
        },
        "dragonTimer": {
            "toggle": false,
            "name": "Dragon Timer",
            "description": "Indicates when an M7 dragon is about to spawn",
        },
        "autoEdrag": {
            "toggle": false,
            "name": "Auto Edrag",
            "description": "Automatically equips Ender Dragon after collecting relics",
        },
        "fuckDiorite": {
            "toggle": false,
            "name": "FUCK DIORITE",
            "description": "Replaces diorite with glass in Phase 2 (avoid using connected blocks)",
        },
        "preGhostBlock": {
            "toggle": false,
            "name": "Pre Ghostblock",
            "description": "Prevents ghost blocks and creates convenient spots in the M7 boss fight",
        },
        "p5Waypoints": {
            "toggle": false,
            "name": "P5 Waypoints",
            "description": "Marks specific locations in Phase 5 of M7",
        },
        "m7Sounds": {
            "toggle": false,
            "name": "Custom M7 Music",
            "description": "For instructions, open the song.js file; it's a work in progress and not recommended for inexperienced users",
        },      
    },
    
    'qol': {
        'x': 720,
        'y': 20,
        'dropDown': true,
        "brokenHype": {
            "toggle": false,
            "name": "Broken Hype",
            "description": "Provides alerts when your hype is broken for quick recovery",
        },
        "vanqNotifier": {
            "toggle": false,
            "name": "Vanq Notifier",
            "description": "Automatically sends a party chat message and creates a beacon when OdinClient/Patcher sends coordinates",
        },
        "terminatorAC": {
            "toggle": false,
            "name": "Terminator AC",
            "description": "Automatically clicks while holding a Terminator with randomized clicks per second",
        },
        "cookieClicker": {
            "toggle": false,
            "name": "Cookie Clicker",
            "description": "Rapidly clicks the cookie while in the Cookie Clicker menu",
        },
        "abiphoneGhoster": {
            "toggle": false,
            "name": "Abiphone Ghoster",
            "description": "Ignores calls from Abiphone for uninterrupted gameplay", 
        },
        "fpsBoost": {
            "toggle": false,
            "name": "FPS Boost",
            "description": "Enhances FPS performance for a smoother experience",
        },
        "wayPoints": {
            "toggle": false,
            "name": "WayPoints",
            "description": "Creates a waypoint when coordinates are sent in chat; use /ow for instant waypoints at your location",
        },
        "noBlockAnimation": {
            "toggle": false,
            "name": "No Block Animation",
            "description": "Disables block animation for swords with right-click abilities, similar to NoSlow",
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

    tabs.forEach((tab, index) => {
        rect(255, 215, 0, 225, tab.x, tab.y, buttonWidth, buttonHeight)
        centeredString(fontmc, tabTitles[index], tab.x, tab.y, 1, 0, 0, 1)
        drawTab(tab)
    })
    tabs.forEach((tab, index) => drawDesc(mx, my, tab, index))

    Client.getMinecraft().field_71460_t.func_181022_b()
    Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation("shaders/post/blur.json"))
})

register('dragged', (dx, dy, x, y, b) => {
    if (!mainGui.isOpen() || b != 0) return
    for (let tab of tabs) checkDrag(dx, dy, mx, my, tab)
})

register('clicked', (x, y, b, isDown) => {
    if (!isDown || !mainGui.isOpen()) return
    for (let tab of tabs) checkTab(x, y, b, tab)
})

data.autosave(5000)