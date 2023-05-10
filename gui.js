import PogObject from "../PogData"
import { centeredString, rect, checkDrag, checkTab, drawTab, drawDesc, buttonHeight, buttonWidth, File, fontmc, ResourceLocation, tabTitles, opensansbold } from "./utils/utils"

const image = new Image(new File("./config/ChatTriggers/modules/OdinClient/assets/OdinClientNoBackround.png"))
const blur = new ResourceLocation("shaders/post/blur.json")

register('command', () => mainGui.open()).setName('OdinClient').setAliases("od")

export const data = new PogObject("OdinClient", {
    'general': {
        'x': 220,
        'y': 20,
        'dropDown': true,
        'partyCommands': {
            'toggle': false,
            'name': 'Party Commands',
            'description': "A bunch of party chat commands both fun and functional use !help in party chat",
        },
        'guildCommands': {
            'toggle': false,
            'name': 'Guild Commands',
            'description': "A bunch of fun guild commands both fun and function use !help in guild chat",
        },
        'guildGM': {
            'toggle': false,
            'name': 'Guild GM/GN',
            'description': "Automatically sends gm/gn in guild chat whenever someone does",
        },
        'highLight': {
            'toggle': false,
            'name': 'Highlight',
            'description': "Configureable mob highlighting use /esp",
        },
        'gyroRange': {
            'toggle': false,
            'name': 'Gyro Range',
            'description': "Shows the range of the Gyrokinetic Wand"
        }
    },

    'dungeons': {
        'x':420,
        'y':20,
        'dropDown':true,
        "edragReminder": {
            "toggle": false,
            "name": "Edrag Reminder",
            "description": "Reminds you whenever p5 starsts to equip an edrag",
        },
        "readyReminder": {
            "toggle": false,
            "name": "Ready Reminder",
            "description": "Reminds you to ready up after a set amount of time",
        },
        "ultReminder": {
            "toggle": false,
            "name": "Ult Reminder",
            "description": "Reminds you to use ultimate in specific events",
        },
        "powerDisplay": {
            "toggle": false,
            "name": "Power Display",
            "description": "Shows the power blessing on screen /movepower",
        },
        "dragonTimer": {
            "toggle": false,
            "name": "Dragon Timer",
            "description": "Shows when a M7 dragon will spawn cmd for hud is /movedrag",
        },
        "dragonBoxes": {
            "toggle": false,
            "name": "Dragon Boxes",
            "description": "Shows custom boxes around the m7 status",
        },
        "p5Waypoints": {
            "toggle": false,
            "name": "P5 Waypoints",
            "description": "Marks specific location in the p5 of m7 (configureable by using /ct files > modules > odinclient > features > dungeons > spots)",
        },
        "bloodTracker": {
            "toggle": false, 
            "name": "Blood Tracker",
            "description": "Shows how many blood mobs are left doesn't work for some people (wip)",
        }, 
        "customSounds": {
            "toggle": false,
            "name": "Custom M7 Sounds",
            "description": "Plays custom sounds at each phase in m7 check song.js if u dont know how dont bother with it",
        },
        "stairDisplay": {
            "toggle": false,
            "name": "Stair Display",
            "description": "Shows if you are in the correct location to clip through the stair under you while sneaking in m7",
        },
    },

    'qol': {
        'x':620,
        'y':20,
        'dropDown':true,
        "abiphoneGhoster": {
            "toggle": false,
            "name": "Abiphone Ghoster",
            "description": "Ghosts calls from abiphone",
        },
        "brokenHype": {
            "toggle": false,
            "name": "Broken Hype",
            "description": "Alerts when your hype is broken",
        },
        "deployableTimer": {
            "toggle": false,
            "name": "Deployable Timer",
            "description": "Shows a timer and the type of the deployable around you /moveflare",
        },
        "vanqNotifier": {
            "toggle": false,
            "name": "Vanq Notifier",
            "description": "Sends a message in party chat and makes a beacon whenever coords are detected in party chat",
        },
        "kuudraAlerts": {
            "toggle": false,
            "name": "Kuudra Alerts",
            "description": "Shows messages on screen on specific events in kuudra",
        },
        "wayPoints": {
            "toggle": false,
            "name": "WayPoints",
            "description": "Makes a waypoint whenever getting coords in chat and /ow for an instant one of ur coords",
        },
        'fpsBoost': {
            'toggle': false,
            'name': 'FPS Boost',
            'description': "Boosts fps cause why not :)",
        },
    },

}, "guidata.json")
data.save()

let mainGui = new Gui()
let shouldRemove = true
const tabs = Object.keys(data).map(k => data[k])

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

    tabs.forEach((tab, index) => {
        rect(255, 215, 0, 225, tab.x, tab.y, buttonWidth, buttonHeight)
        centeredString(fontmc, tabTitles[index], tab.x, tab.y, 1, 0, 0, 1)
        drawTab(tab)
    })
    tabs.forEach((tab, index) => drawDesc(Client.getMouseX(), Client.getMouseY(), tab, index))
      
    Client.getMinecraft().field_71460_t.func_181022_b()
    Client.getMinecraft().field_71460_t.func_175069_a(blur)
})

register('dragged', (dx, dy, x, y, b) => (!mainGui.isOpen() || b != 0) ? null : tabs.forEach(tab => checkDrag(dx, dy, mx, my, tab)))
register('clicked', (x, y, b, isDown) => (!isDown || !mainGui.isOpen()) ? null : tabs.forEach(tab => checkTab(x, y, b, tab)))

data.autosave(5000)