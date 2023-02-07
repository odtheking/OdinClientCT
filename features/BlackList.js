import { data } from "../stuff/guidk"
import { modMessage} from "../utils";

//blacklist

const blacklist = new PogObject("OdinClient", {
    igns: []
}, "flaredata.json")


register("command", (...args) => {
    if (!args || args.length < 2) {
        modMessage("Incorrect usage. /odinlist add/remove/clear/list <name>")
        return
    }
    let name = args[1]
    switch (args[0]) {
        case "add":
            if (blacklist.igns.includes(name)) {
                modMessage("Couldn't add " + name + " to the list")
            } else {
                blacklist.igns.push(name)
                modMessage(name + " has been added to the list")
                blacklist.save()
            }
            break
        case "remove":
            if (!blacklist.igns.includes(name)) {
                modMessage("Couldn't remove " + name + " from the list")
            } else {
                blacklist.igns = blacklist.igns.filter(ent => ent !== name)
                modMessage(name + " has been removed from the list")
                blacklist.save()
            }
            break
        case "clear":
            blacklist.igns.splice(0, blacklist.igns.length)
            break

        case "list":
            modMessage(blacklist.igns)
            
    }
}).setName("odinlist").setTabCompletions("add, remove, clear, list")

//idk how to check efficiently do i have to use a loop?
//if (name.toLowerCase().includes(esplist.names[i]))
//if (blacklist.igns.toLowerCase().includes(name))