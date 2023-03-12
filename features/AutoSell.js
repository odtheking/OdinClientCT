import { data } from "../stuff/guidk"
import PogObject from "../../PogData/index.js"
import { modMessage } from "../utils.js"
let intrades = false
let going = false
let q = []
register("tick", () => {
    if (intrades || !data.legit.options[8]) return
    let inv = Player.getContainer();
    if (inv.getName() != "Trades" && !inv.getName().includes('Cookie Clicker v')) return
    for (let i=54; i<88; i++) {
        if (Player.getContainer().getStackInSlot(i) != null) continue
        item = ChatLib.removeFormatting(Player.getContainer().getStackInSlot(i).getName().toLowerCase())
        for (let toSell of AutoSell.sellable) {
            if (item.includes(toSell.toLowerCase())) {
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
    let name = args.join(" ").toLowerCase()
    switch (args[0]) {
        case "add":
            if (autosell.sellable.includes(name)) {
                modMessage(`${name} is already in the list`)
            } else {
                autosell.sellable.push(name)
                modMessage(name + " has been added to the list")
                autosell.save()
            }
            break
        case "remove":
            if (!autosell.sellable.includes(name)) {
                modMessage("Couldn't remove " + name + " from the list")
            } else {
                autosell.sellable = autosell.sellable.filter(nam => nam !== name)
                modMessage(name + " has been removed from the list")
                autosell.save()
            }
            break
    }
}).setName("autosell").setTabCompletions("add, remove")


register("command", () => {
    modMessage(autosell.sellable)
}).setName("getselllist")

register("command", () => {
    autosell.sellable.length = 0
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
}, "autosell.json")