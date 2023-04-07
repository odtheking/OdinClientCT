import { data } from "../../gui"
import PogObject from "../../../PogData/index.js"
import { modMessage } from "../../utils/utils"

let intrades = false
let going = false
let q = []
register("tick", () => {
    if (intrades || !data.general.autoSell.toggle) return
    let inv = Player.getContainer();
    if (inv.getName() != "Trades" && !inv.getName().includes('Booster Cookie')) return
    for (let i=54; i<88; i++) {
        let item = ChatLib.removeFormatting(Player.getContainer()?.getStackInSlot(i)?.getName()?.toLowerCase())
        for (let toSell of AutoSell.sellable) {
            if (item?.includes(toSell.toLowerCase())) {
                q.push(i)
            }
        }
    }
    intrades = true
    going = true
})

counter = 0
register("step", () => {
    if (!going) return
    if (counter >= q.length) {
        counter = 0
        going = false
        q.length = 0
        return
    }
    Player.getContainer().click(q[counter],false,"MIDDLE")
    counter++ 
}).setFps(6)

register('GuiClosed', () => {
    if (!intrades) return
    intrades = false
    q = []
});

register("command", (...args) => {
    if (!args || args.length < 2) {
        modMessage("Incorrect usage. /autosell add/remove <name>")
        return
    }
     
    type = args.splice(0,1)
    let name = args.join(" ").toLowerCase()
    if (type == "add") {
        modMessage("adding")
        if (AutoSell.sellable.includes(name)) {
            modMessage(`${name} is already in the list`)
        } else {
            AutoSell.sellable.push(name)
            modMessage(name + " has been added to the list")
            AutoSell.save()
        }
    } else if (type == "remove") {
        if (!AutoSell.sellable.includes(name)) {
            modMessage("Couldn't remove " + name + " from the list")
        } else {
            AutoSell.sellable = AutoSell.sellable.filter(nam => nam !== name)
            modMessage(name + " has been removed from the list")
            AutoSell.save()
        }
    }
}).setName("autosell").setTabCompletions("add, remove")


register("command", () => {
    modMessage(AutoSell.sellable)
}).setName("getselllist")

register("command", () => {
    AutoSell.length = 0
    modMessage("Cleared autosell list")
}).setName("clearselllist")

const AutoSell = new PogObject("OdinCheata", {
    sellable: [
        "Enchanted Ice",
        "Health Potion",
        "Superboom TNT",
        "Rotten",
        "Skeleton Master",
        "Skeleton Grunt",
        "Skeleton Lord",
        "Skeleton Soldier",
        "Zombie Soldier",
        "Zombie Knight",
        "Zombie Commander",
        "Zombie Lord",
        "Skeletor",
        "Super Heavy",
        "Heavy",
        "Sniper Helmet",
        "Dreadlord",
        "Earth Shard",
        "Zombie Commander Whip",
        "Machine Gun",
        "Sniper Bow",
        "Soulstealer Bow",
        "Cutlass",
        "Silent Death",
        "Training Weight",
        "Health Potion VIII",
        "Health Potion 8",
        "Beating Heart",
        "Premium Flesh",
        "Mimic Fragment",
        "Enchanted Rotten Flesh",
        "Enchanted Bone",
        "Defuse Kit",
        "Enchanted Ice",
        "Optic Lens",
        "Tripwire Hook",
        "Button",
        "Carpet",
        "Lever",
        "Sign",
        "Diamond Atom"
    ]
}, "config/autosell.json")