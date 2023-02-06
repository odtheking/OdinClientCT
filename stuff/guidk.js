import PogObject from "../../PogData"
import Font from "../../fontlib"
import { File } from "../java-stuff"
const font = new Font('OdinClient/stuff/OpenSans-Regular.ttf', 75)
const font2 = new Font('OdinClient/stuff/Minecraft.ttf', 21)
const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")

const Logo = new File("./config/ChatTriggers/modules/OdinClient/stuff/OdinClientNoBackround.png")
const image = new Image(Logo)

register('command', () => {
    mainGui.open()
}).setName('odinclient').setAliases("od")

export const data = new PogObject("OdinClient", {
    'general': {
        'x': 20,
        'y': 20,
        'dropDown': true,
    },
    "generalOptions": [false, false, false, false, false, false],
    'generalTitles': ['Party Commands', 'Guild Commands', 'Guild gm', 'CookieClicker', 'Broken Hype', 'ESP'],

    'legit': {
        'x': 220,
        'y': 20,
        'dropDown': true,
    },
    'legitOptions': [false, false, false, false, false],
    'legitTitles': ['Auto Edrag', 'Terminator AC', 'Item Macros', 'Auto Ult', 'Auto Ready'],

    'dungeons': {
        'x': 420,
        'y': 20,
        'dropDown': true,
    },
    'dungeonsOptions': [false, false, false, false, false, false, false, false, false],
    'dungeonsTitles': ['Auto Leap', 'Auto Mask', 'Auto Shield', 'Relic Aura', 'Auto Wish', 'Auto Mort', 'Power Display', 'Dragon Timer', 'FUCK DIORITE'],

    'hollows': {
        'x': 620,
        'y': 20,
        'dropDown': true,
    },
    'hollowsOptions': [false, false, false, false, false],
    'hollowsTitles': ['Coming soon', 'Coming soon', 'Coming soon', 'Coming soon', 'Coming soon',],

    'nether': {
        'x': 820,
        'y': 20,
        'dropDown': true,
    },
    'netherOptions': [false, false, false],
    'netherTitles': ['Flare Timer', 'Vanq Notifier', 'Kuudra Alerts'],

}, "data.json")


const generalDescriptions = [
    "A bunch of party chat commands both fun and functional use !help in party chat",
    "A bunch of fun guild commands both fun and function use !help in guild chat",
    "Automatically sends gm/gn in guild chat whenever someone does",
    "Automatically spams on the cookie clicker in the skyblock menu",
    "Alerts you if your wither blade breaks",
    "Configureable esp use /esp",
]

const qolDescription = [
    "Automatically equips edrag when p5 starts",
    "Automatically spams the terminator bow while holding it",
    "Item macros in controls",
    "Automatically uses ultimate on certain times",
    "Automatically clicks in the ready GUI"
]

const dungeonDescriptions = [
    "Automatically leaps to a player when writing !tp in party chat",
    "Automatically swaps spirit/bonzo mask on CD",
    "Automatically uses wither shield when not on full HP",
    "Looks and picks up relics (WIP)",
    "Automatically uses ultimate when a party member is low",
    "Automatically goes from spawnpoint to mort in dungeons",
    "Shows the power blessing /movepower",
    "Shows when a M7 dragon will spawn",
    "Replaces diorite with glass in p2",
]

const netherDescription = [
    "Shows a timer and the type of the flare around you /moveflare",
    "Automatically sends a message in party chat and makes a beacon whenever odinclient/patcher sends coords in party chat",
    "Shows messages on screen on specific events in kuudra"
]

let mainGui = new Gui()
let buttonHeight = 20
let buttonWidth = 100
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

    //font.drawStringWithShadow("§6Odin§4Client", 720, 490, new java.awt.Color(0, 1, 1, 1))
    Renderer.drawRect(Renderer.color(255, 215, 0, 225), data.general.x, data.general.y, buttonWidth, buttonHeight)
    Renderer.drawRect(Renderer.color(255, 215, 0, 225), data.legit.x, data.legit.y, buttonWidth, buttonHeight)
    Renderer.drawRect(Renderer.color(255, 215, 0, 225), data.dungeons.x, data.dungeons.y, buttonWidth, buttonHeight)
    Renderer.drawRect(Renderer.color(255, 215, 0, 225), data.hollows.x, data.hollows.y, buttonWidth, buttonHeight)
    Renderer.drawRect(Renderer.color(194, 178, 8, 225), data.nether.x, data.nether.y, buttonWidth, buttonHeight)

    font2.drawStringWithShadow('General', data.general.x + (70 - Renderer.getStringWidth('General')) / 2 + 15, data.general.y + 5, new java.awt.Color(1, 0, 0, 1))
    font2.drawStringWithShadow('qol', data.legit.x + (70 - Renderer.getStringWidth('Legit')) / 2 + 15, data.legit.y + 5, new java.awt.Color(1, 0, 0, 1))
    font2.drawStringWithShadow('Dungeons', data.dungeons.x + (50 - Renderer.getStringWidth('Dungeons') / 2), data.dungeons.y + 5, new java.awt.Color(1, 0, 0, 1))
    font2.drawStringWithShadow('Auto Boss', data.hollows.x + (50 - Renderer.getStringWidth('Auto Boss') / 2), data.hollows.y + 5, new java.awt.Color(1, 0, 0, 1))
    font2.drawStringWithShadow('Nether', data.nether.x + (70 - Renderer.getStringWidth('Nether')) / 2 + 15, data.nether.y + 5, new java.awt.Color(1, 0, 0, 1))

    if (data.general.dropDown) { // General
        for (let i = 1; i <= data.generalOptions.length; i++) {
            Renderer.drawRect(Renderer.color(22, 25, 26, 175), data.general.x, data.general.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.generalOptions[i - 1]) {
                font2.drawStringWithShadow(data.generalTitles[i - 1], data.general.x + (70 - Renderer.getStringWidth(data.generalTitles[i - 1])) / 2 + 15, data.general.y + 5 + (i * buttonHeight), new java.awt.Color(0, 1, 0, 1))
            } else {
                font2.drawStringWithShadow(data.generalTitles[i - 1], data.general.x + (70 - Renderer.getStringWidth(data.generalTitles[i - 1])) / 2 + 15, data.general.y + 5 + (i * buttonHeight), new java.awt.Color(155 / 255, 155 / 255, 155 / 255, 220 / 255))
            }
        }
    }

    if (data.legit.dropDown) { // Dungeons
        for (let i = 1; i <= data.legitOptions.length; i++) {
            Renderer.drawRect(Renderer.color(22, 25, 26, 175), data.legit.x, data.legit.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.legitOptions[i - 1]) {
                font2.drawStringWithShadow(data.legitTitles[i - 1], data.legit.x + (70 - Renderer.getStringWidth(data.legitTitles[i - 1])) / 2 + 15, data.legit.y + 5 + (i * buttonHeight), new java.awt.Color(0, 1, 0, 1))
            } else {
                font2.drawStringWithShadow(data.legitTitles[i - 1], data.legit.x + (70 - Renderer.getStringWidth(data.legitTitles[i - 1])) / 2 + 15, data.legit.y + 5 + (i * buttonHeight), new java.awt.Color(155 / 255, 155 / 255, 155 / 255, 220 / 255))
            }
        }
    }

    if (data.dungeons.dropDown) { // Dungeons
        for (let i = 1; i <= data.dungeonsOptions.length; i++) {
            Renderer.drawRect(Renderer.color(22, 25, 26, 175), data.dungeons.x, data.dungeons.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.dungeonsOptions[i - 1]) {
                font2.drawStringWithShadow(data.dungeonsTitles[i - 1], data.dungeons.x + (70 - Renderer.getStringWidth(data.dungeonsTitles[i - 1])) / 2 + 15, data.dungeons.y + 5 + (i * buttonHeight), new java.awt.Color(0, 1, 0, 1))
            } else {
                font2.drawStringWithShadow(data.dungeonsTitles[i - 1], data.dungeons.x + (70 - Renderer.getStringWidth(data.dungeonsTitles[i - 1])) / 2 + 15, data.dungeons.y + 5 + (i * buttonHeight), new java.awt.Color(155 / 255, 155 / 255, 155 / 255, 220 / 255))
            }
        }
    }

    if (data.hollows.dropDown) { // Hollows
        for (let i = 1; i <= data.hollowsOptions.length; i++) {
            Renderer.drawRect(Renderer.color(22, 25, 26, 175), data.hollows.x, data.hollows.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.hollowsOptions[i - 1]) {
                font2.drawStringWithShadow(data.hollowsTitles[i - 1], data.hollows.x + (70 - Renderer.getStringWidth(data.hollowsTitles[i - 1])) / 2 + 15, data.hollows.y + 5 + (i * buttonHeight), new java.awt.Color(0, 1, 0, 1))
            } else {
                font2.drawStringWithShadow(data.hollowsTitles[i - 1], data.hollows.x + (70 - Renderer.getStringWidth(data.hollowsTitles[i - 1])) / 2 + 15, data.hollows.y + 5 + (i * buttonHeight), new java.awt.Color(155 / 255, 155 / 255, 155 / 255, 220 / 255))
            }
        }
    }

    if (data.nether.dropDown) { // nether
        for (let i = 1; i <= data.netherOptions.length; i++) {
            Renderer.drawRect(Renderer.color(22, 25, 26, 175), data.nether.x, data.nether.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.netherOptions[i - 1]) {
                font2.drawStringWithShadow(data.netherTitles[i - 1], data.nether.x + (70 - Renderer.getStringWidth(data.netherTitles[i - 1])) / 2 + 15, data.nether.y + 5 + (i * buttonHeight), new java.awt.Color(0, 1, 0, 1))
            } else {
                font2.drawStringWithShadow(data.netherTitles[i - 1], data.nether.x + (70 - Renderer.getStringWidth(data.netherTitles[i - 1])) / 2 + 15, data.nether.y + 5 + (i * buttonHeight), new java.awt.Color(155 / 255, 155 / 255, 155 / 255, 220 / 255))
            }
        }
    }

    //descriptions
    mx = Client.getMouseX()
    my = Client.getMouseY()

    if (mx > data.general.x && mx < data.general.x + buttonWidth) {
        toshow = Math.floor((my - data.general.y - buttonHeight) / 20)
        if (toshow >= 0 && toshow <= 5) {
            Renderer.drawRect(Renderer.BLACK, data.general.x + buttonWidth, my - 10, Renderer.getStringWidth(generalDescriptions[toshow]) + 4, buttonHeight - 5)
            Renderer.drawStringWithShadow(generalDescriptions[toshow], data.general.x + buttonWidth + 2, my - 7)
        }
    } else if (mx > data.legit.x && mx < data.legit.x + buttonWidth) {
        toshow = Math.floor((my - data.legit.y - buttonHeight) / 20)
        if (toshow >= 0 && toshow <= 4) {
            Renderer.drawRect(Renderer.BLACK, data.legit.x + buttonWidth, my - 10, Renderer.getStringWidth(qolDescription[toshow]) + 4, buttonHeight - 5)
            Renderer.drawStringWithShadow(qolDescription[toshow], data.legit.x + buttonWidth + 2, my - 7)
        }
    } else if (mx > data.dungeons.x && mx < data.dungeons.x + buttonWidth) {
        toshow = Math.floor((my - data.dungeons.y - buttonHeight) / 20)
        if (toshow >= 0 && toshow <= 8) {
            Renderer.drawRect(Renderer.BLACK, data.dungeons.x + buttonWidth, my - 10, Renderer.getStringWidth(dungeonDescriptions[toshow]) + 4, buttonHeight - 5)
            Renderer.drawStringWithShadow(dungeonDescriptions[toshow], data.dungeons.x + buttonWidth + 2, my - 7)
        }
    } else if (mx > data.hollows.x && mx < data.hollows.x + buttonWidth) {
        toshow = Math.floor((my - data.hollows.y - buttonHeight) / 20)
        if (toshow >= 0 && toshow <= 4) {
            Renderer.drawRect(Renderer.BLACK, data.hollows.x + buttonWidth, my - 10, Renderer.getStringWidth('NOT COMING SOON :)') + 4, buttonHeight - 5)
            Renderer.drawStringWithShadow('NOT COMING SOON :)', data.hollows.x + buttonWidth + 2, my - 7)
        }
    } else if (mx > data.nether.x && mx < data.nether.x + buttonWidth) {
        toshow = Math.floor((my - data.nether.y - buttonHeight) / 20)
        if (toshow >= 0 && toshow <= 2) {
            Renderer.drawRect(Renderer.BLACK, data.nether.x + buttonWidth, my - 10, Renderer.getStringWidth(netherDescription[toshow]) + 4, buttonHeight - 5)
            Renderer.drawStringWithShadow(netherDescription[toshow], data.nether.x + buttonWidth + 2, my - 7)
        }
    }

    Client.getMinecraft().field_71460_t.func_181022_b()
    Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation("shaders/post/blur.json"))
})

register('dragged', (mx, my, x, y, b) => {
    if (!mainGui.isOpen()) return
    if (b != 0) return

    // General tab
    if (x > (data.general.x - 10) && x < (data.general.x + buttonWidth) + 10) {
        if (y > (data.general.y - 5) && y < (data.general.y + buttonHeight) + 5) {
            data.general.x += mx
            data.general.y += my
            data.save()
        }
    }

    // Legit tab
    if (x > (data.legit.x - 10) && x < (data.legit.x + buttonWidth) + 10) {
        if (y > (data.legit.y - 5) && y < (data.legit.y + buttonHeight) + 5) {
            data.legit.x += mx
            data.legit.y += my
            data.save()
        }
    }

    // Dungeons tab
    if (x > (data.dungeons.x - 10) && x < (data.dungeons.x + buttonWidth) + 10) {
        if (y > (data.dungeons.y - 5) && y < (data.dungeons.y + buttonHeight) + 5) {
            data.dungeons.x += mx
            data.dungeons.y += my
            data.save()
        }
    }

    // Crystal Hollows
    if (x > (data.hollows.x - 10) && x < (data.hollows.x + buttonWidth) + 10) {
        if (y > (data.hollows.y - 5) && y < (data.hollows.y + buttonHeight) + 5) {
            data.hollows.x += mx
            data.hollows.y += my
            data.save()
        }
    }

    // Nether tab
    if (x > (data.nether.x - 10) && x < (data.nether.x + buttonWidth) + 10) {
        if (y > (data.nether.y - 5) && y < (data.nether.y + buttonHeight) + 5) {
            data.nether.x += mx
            data.nether.y += my
            data.save()
        }
    }


})

let toChange

register('clicked', (x, y, b, isDown) => {
    if (isDown && mainGui.isOpen()) {

        // Check if user clicked General tab
        if (x > (data.general.x - 10) && x < (data.general.x + buttonWidth) + 10) {
            toChange = Math.floor((y - (data.general.y + buttonHeight)) / buttonHeight)
            if (b == 0 && toChange >= 0 && toChange <= data.generalOptions.length - 1) {
                data.generalOptions[toChange] = !data.generalOptions[toChange]
                World.playSound('gui.button.press', 1, 1)
                data.save()
            } else if (b == 1 && toChange == -1) {
                data.general.dropDown = !data.general.dropDown
                World.playSound('gui.button.press', 1, 1)
                data.save()
            }
        }

        // Check dungeons tab
        if (x > (data.legit.x - 10) && x < (data.legit.x + buttonWidth) + 10) {
            toChange = Math.floor((y - (data.legit.y + buttonHeight)) / buttonHeight)
            if (b == 0 && toChange >= 0 && toChange <= data.legitOptions.length - 1) {
                data.legitOptions[toChange] = !data.legitOptions[toChange]
                World.playSound('gui.button.press', 1, 1)
                data.save()
            } else if (b == 1 && toChange == -1) {
                data.legit.dropDown = !data.legit.dropDown
                World.playSound('gui.button.press', 1, 1)
                data.save()
            }
        }

        // Check dungeons tab
        if (x > (data.dungeons.x - 10) && x < (data.dungeons.x + buttonWidth) + 10) {
            toChange = Math.floor((y - (data.dungeons.y + buttonHeight)) / buttonHeight)
            if (b == 0 && toChange >= 0 && toChange <= data.dungeonsOptions.length - 1) {
                data.dungeonsOptions[toChange] = !data.dungeonsOptions[toChange]
                World.playSound('gui.button.press', 1, 1)
                data.save()
            } else if (b == 1 && toChange == -1) {
                data.dungeons.dropDown = !data.dungeons.dropDown
                World.playSound('gui.button.press', 1, 1)
                data.save()
            }
        }

        // Check hollows tab
        if (x > (data.hollows.x - 10) && x < (data.hollows.x + buttonWidth) + 10) {
            toChange = Math.floor((y - (data.hollows.y + buttonHeight)) / buttonHeight)
            if (b == 0 && toChange >= 0 && toChange <= data.hollowsOptions.length - 1) {
                data.hollowsOptions[toChange] = !data.hollowsOptions[toChange]
                World.playSound('gui.button.press', 1, 1)
                data.save()
            } else if (b == 1 && toChange == -1) {
                data.hollows.dropDown = !data.hollows.dropDown
                World.playSound('gui.button.press', 1, 1)
                data.save()
            }
        }

        // Check nether tab
        if (x > (data.nether.x - 10) && x < (data.nether.x + buttonWidth) + 10) {
            toChange = Math.floor((y - (data.nether.y + buttonHeight)) / buttonHeight)
            if (b == 0 && toChange >= 0 && toChange <= data.netherOptions.length - 1) {
                data.netherOptions[toChange] = !data.netherOptions[toChange]
                World.playSound('gui.button.press', 1, 1)
                data.save()
            } else if (b == 1 && toChange == -1) {
                data.nether.dropDown = !data.nether.dropDown
                World.playSound('gui.button.press', 1, 1)
                data.save()
            }
        }
    }
})