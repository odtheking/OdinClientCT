/// <reference types="../../CTAutocomplete" />
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

// add the legit features to make the legit tab look richer question mark
// change the toggle in all the modules zz
export const data = new PogObject("OdinClient", {
    'auto': {
        'x': 20,
        'y': 20,
        'dropDown': true,
        "options": [false, false, false, false, false, false, false, false],
        'titles': ['Auto Ready', 'Auto Mort', 'Auto Ult', 'Auto Shield', 'Auto Wish', 'Auto Mask', 'Auto Edrag', 'Auto Leap'],
    },

    'legit': {
        'x': 220,
        'y': 20,
        'dropDown': true,
        'options': [false, false, false, false, false, false],
        'titles': ['Party cmds', 'Guild cmds', 'Guild GM', 'Dragons Boxes', 'Dragon Timer', 'Power Display'],
    },

    'nether': {
        'x': 420,
        'y': 20,
        'dropDown': true,
        'options': [false, false, false, false],
        'titles': ['Broken Hype', 'Flare Timer', 'Vanq Notifier', 'Kuudra Alerts'],
    },
    
    'qol': {
        'x': 620,
        'y': 20,
        'dropDown': true,
        'options': [false, false, false, false, false, false],
        'titles': ['Relic Aura', 'Item Macros', 'Terminator AC', 'Cookie Clicker', 'ESP', 'FUCK DIORITE'],
    },

    'boss': {
        'x': 820,
        'y': 20,
        'dropDown': true,
        'options': [false, false, false, false, false],
        'titles': ['Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!',],
    },
}, "data.json")


const autoDescriptions = [
    "Automatically clicks in the ready GUI",
    "Automatically gets in range of mort and opens his GUI",
    "Automatically uses class ultimate on certain times",
    "Automatically uses wither shield when not full hp",
    "Automatically uses wish when a temmate is low HP",
    "Automatically swaps between bonzo and spirit mask",
    "Automatically equips edrag after relics",
    "Automatically leaps to a player when writing !tp in party chat"
]

const legitDescription = [
    "Custom party commands use !help in party chat",
    "Custom guild commands use !help in guild chat",
    "Reponsends to anyone in guild chat saying gm/gn",
    "Creates custom and decently accurate boxes in p5",
    "Shows the power blessing /movepower",
    "Shows when a M7 dragon will spawn"
]

const netherDescriptions = [
    "Shows a timer and the type of the flare around you /moveflare",
    "Automatically sends a message in party chat and makes a beacon whenever odinclient/patcher sends coords in party chat",
    "Shows messages on screen on specific events in kuudra",
    "Automatically alerts when your hype is broken"
    
]

const qolDescription = [
    "Looks at and picks up relics (WIP)",
    "Custom item macros check minecraft",
    "Spams right click while term is held ranomized cps",
    "Spams the cookie while in the cookie clicker menu",
    "You can add whatever mob you want into the ist /esp",
    "Replaces diorite with glass in p2",
]

const bossDescription = [
    "NOT COMING SOON :)",
    "NOT COMING SOON :)",
    "NOT COMING SOON :)",
    "NOT COMING SOON :)",
    "NOT COMING SOON :)",
]

let mainGui = new Gui()
let buttonHeight = 20
let buttonWidth = 100
let shouldRemove = true

const rect = (r,g,b,a,x,y,width,height) => Renderer.drawRect(Renderer.color(r, g, b, a), x, y, width, height)

const centeredString = (thefont,text,x,y,r,g,b,a) => thefont.drawStringWithShadow(text,x+(70 - font2.getWidth(text)) / 2 + 15,y + 5,new java.awt.Color(r,g,b,a))

const normalString = (thefont,text,x,y,r,g,b,a) => thefont.drawStringWithShadow(text,x,y + 5,new java.awt.Color(r,g,b,a))

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
    
    rect(255, 215, 0, 225, data.auto.x, data.auto.y, buttonWidth, buttonHeight)
    rect(255, 215, 0, 225, data.legit.x, data.legit.y, buttonWidth, buttonHeight)
    rect(255, 215, 0, 225, data.nether.x, data.nether.y, buttonWidth, buttonHeight)
    rect(255, 215, 0, 225, data.qol.x, data.qol.y, buttonWidth, buttonHeight)
    rect(194, 178, 8, 225, data.boss.x, data.boss.y, buttonWidth, buttonHeight)
    centeredString(font2, 'Auto', data.auto.x, data.auto.y, 1, 0, 0, 1)
    centeredString(font2, 'Legit', data.legit.x, data.legit.y, 1, 0, 0, 1)
    centeredString(font2, 'Nether', data.nether.x, data.nether.y, 1, 0, 0, 1)
    centeredString(font2, 'QOL', data.qol.x, data.qol.y, 1, 0, 0, 1)
    centeredString(font2, 'Auto', data.boss.x, data.boss.y, 1, 0, 0, 1)


    if (data.auto.dropDown) { // auto
        for (let i = 1; i <= data.auto.options.length; i++) {
            rect(22, 25, 26, 175, data.auto.x, data.auto.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.auto.options[i - 1]) {
                centeredString(font2, data.auto.titles[i - 1], data.auto.x, data.auto.y + (i * buttonHeight), 0, 1, 0, 1)
            } else {
                centeredString(font2, data.auto.titles[i - 1], data.auto.x , data.auto.y + (i * buttonHeight), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
            }
        }
    }

    if (data.legit.dropDown) { // legit
        for (let i = 1; i <= data.legit.options.length; i++) {
            rect(22, 25, 26, 175, data.legit.x, data.legit.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.legit.options[i - 1]) {
                centeredString(font2, data.legit.titles[i - 1], data.legit.x, data.legit.y + (i * buttonHeight),0, 1, 0, 1)
            } else {
                centeredString(font2, data.legit.titles[i - 1], data.legit.x, data.legit.y + (i * buttonHeight), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
            }
        }
    }

    if (data.nether.dropDown) { // nether
        for (let i = 1; i <= data.nether.options.length; i++) {
            rect(22, 25, 26, 175, data.nether.x, data.nether.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.nether.options[i - 1]) {
                centeredString(font2, data.nether.titles[i - 1], data.nether.x, data.nether.y + (i * buttonHeight), 0, 1, 0, 1)
            } else {
                centeredString(font2, data.nether.titles[i - 1], data.nether.x, data.nether.y  + (i * buttonHeight), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
            }
        }
    }

    if (data.qol.dropDown) { // qol
        for (let i = 1; i <= data.qol.options.length; i++) {
            rect(22, 25, 26, 175, data.qol.x, data.qol.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.qol.options[i - 1]) {
                centeredString(font2, data.qol.titles[i - 1], data.qol.x, data.qol.y + (i * buttonHeight), 0, 1, 0, 1)
            } else {
                centeredString(font2, data.qol.titles[i - 1], data.qol.x, data.qol.y + (i * buttonHeight), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
            }
        }
    }

    if (data.boss.dropDown) { // boss
        for (let i = 1; i <= data.boss.options.length; i++) {
            rect(22, 25, 26, 175, data.boss.x, data.boss.y + (i * buttonHeight), buttonWidth, buttonHeight)
            if (data.boss.options[i - 1]) {
                centeredString(font2, data.boss.titles[i - 1], data.boss.x, data.boss.y + (i * buttonHeight), 0, 1, 0, 1)
            } else {
                centeredString(font2, data.boss.titles[i - 1], data.boss.x, data.boss.y + (i * buttonHeight), 155 / 255, 155 / 255, 155 / 255, 220 / 255)
            }
        }
    }

    //descriptions
    mx = Client.getMouseX()
    my = Client.getMouseY()

    if (mx > data.auto.x && mx < data.auto.x + buttonWidth) {
        toshow = Math.floor((my - data.auto.y - buttonHeight) / buttonHeight)
        if (toshow >= 0 && toshow <= autoDescriptions.length - 1) {
            rect(45, 45, 45, 255, data.auto.x + buttonWidth, my, font2.getWidth(autoDescriptions[toshow]) + 2, buttonHeight - 3)
            normalString(font2, autoDescriptions[toshow], data.auto.x+buttonWidth+1, my-1, 0.8, 0.8, 0.8, 1)
        }
    } else if (mx > data.legit.x && mx < data.legit.x + buttonWidth) {
        toshow = Math.floor((my - data.legit.y - buttonHeight) / buttonHeight)
        if (toshow >= 0 && toshow <= legitDescription.length - 1) {
            rect(45, 45, 45, 255, data.legit.x + buttonWidth, my, font2.getWidth(legitDescription[toshow]) + 2, buttonHeight - 3)
            normalString(font2, legitDescription[toshow], data.legit.x+buttonWidth+1, my-1, 0.8, 0.8, 0.8, 1)
        }
    } else if (mx > data.nether.x && mx < data.nether.x + buttonWidth) {
        toshow = Math.floor((my - data.nether.y - buttonHeight) / buttonHeight)
        if (toshow >= 0 && toshow <= netherDescriptions.length - 1) {
            rect(45, 45, 45, 255, data.nether.x + buttonWidth, my, font2.getWidth(netherDescriptions[toshow]) + 2, buttonHeight - 3)
            normalString(font2, netherDescriptions[toshow], data.nether.x+buttonWidth+1, my-1, 0.8, 0.8, 0.8, 1)
        }
    } else if (mx > data.qol.x && mx < data.qol.x + buttonWidth) {
        toshow = Math.floor((my - data.qol.y - buttonHeight) / buttonHeight)
        if (toshow >= 0 && toshow <= qolDescription.length - 1) {
            rect(45, 45, 45, 255, data.qol.x + buttonWidth, my, font2.getWidth(qolDescription[toshow]) + 2, buttonHeight - 3)
            normalString(font2, qolDescription[toshow], data.qol.x+buttonWidth+1, my-1, 0.8, 0.8, 0.8, 1)
        }
    } else if (mx > data.boss.x && mx < data.boss.x + buttonWidth) {
        toshow = Math.floor((my - data.boss.y - buttonHeight) / buttonHeight)
        if (toshow >= 0 && toshow <= bossDescription.length - 1) {
            rect(45, 45, 45, 255, data.boss.x + buttonWidth, my, font2.getWidth(bossDescription[toshow]) + 2, buttonHeight - 3)
            normalString(font2, bossDescription[toshow], data.boss.x+buttonWidth+1, my-1, 0.8, 0.8, 0.8, 1)
        }
    }

    Client.getMinecraft().field_71460_t.func_181022_b()
    Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation("shaders/post/blur.json"))
})

register('dragged', (mx, my, x, y, b) => {
    if (!mainGui.isOpen()) return
    if (b != 0) return
    
    // auto tab
    if (x > (data.auto.x - 10) && x < (data.auto.x + buttonWidth) + 10) {
        if (y > (data.auto.y - 5) && y < (data.auto.y + buttonHeight) + 5) {
            data.auto.x += mx
            data.auto.y += my
        }
    }

    // Legit tab
    if (x > (data.legit.x - 10) && x < (data.legit.x + buttonWidth) + 10) {
        if (y > (data.legit.y - 5) && y < (data.legit.y + buttonHeight) + 5) {
            data.legit.x += mx
            data.legit.y += my
        }
    }

    // nether tab
    if (x > (data.nether.x - 10) && x < (data.nether.x + buttonWidth) + 10) {
        if (y > (data.nether.y - 5) && y < (data.nether.y + buttonHeight) + 5) {
            data.nether.x += mx
            data.nether.y += my
        }
    }

    // qol tab
    if (x > (data.qol.x - 10) && x < (data.qol.x + buttonWidth) + 10) {
        if (y > (data.qol.y - 5) && y < (data.qol.y + buttonHeight) + 5) {
            data.qol.x += mx
            data.qol.y += my
        }
    }

    // boss tab
    if (x > (data.boss.x - 10) && x < (data.boss.x + buttonWidth) + 10) {
        if (y > (data.boss.y - 5) && y < (data.boss.y + buttonHeight) + 5) {
            data.boss.x += mx
            data.boss.y += my
        }
    }

    data.save()
})

const makePressSound = () => World.playSound('gui.button.press', 1, 1)

const checkTab = (mx, my, b, tab) => {
    if (mx > (tab.x - 10) && mx < (tab.x + buttonWidth) + 10) {
        toChange = Math.floor((my - (tab.y + buttonHeight)) / buttonHeight)
        if (b == 0 && toChange >= 0 && toChange <= data.auto.options.length - 1) {
            tab.options[toChange] = !tab.options[toChange]
            makePressSound()
        } else if (b == 1 && toChange == -1) {
            tab.dropDown = !tab.dropDown
            makePressSound()
        }
    }
}

let toChange
register('clicked', (x, y, b, isDown) => {
    if (!isDown || !mainGui.isOpen()) return
    checkTab(x, y, b, data.auto)
    checkTab(x, y, b, data.legit)
    checkTab(x, y, b, data.nether)
    checkTab(x, y, b, data.qol)
    checkTab(x, y, b, data.boss)
    data.save()
})