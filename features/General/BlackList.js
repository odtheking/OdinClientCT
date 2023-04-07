import PogObject from "../../../PogData";
import { modMessage} from "../../utils/utils"

//blacklist

//if (blacklist.igns.toLowerCase().includes(name.toLowerCase()))

export const blacklist = new PogObject("OdinCheata", {
    igns: []
}, "flaredata.json")

register("command", (...args) => {
    if (!args || args.length < 1) {
        modMessage("Incorrect usage. /odinlist add/remove/clear/list <name>")
        return
    }
    let name = args[1]
    switch (args[0]) {
        case "add":
            if (blacklist.igns.includes(name.toLowerCase())) {
                modMessage("Couldn't add " + name.toLowerCase() + " to the list")
            } else {
                blacklist.igns.push(name.toLowerCase())
                modMessage(name.toLowerCase() + " has been added to the list")
                blacklist.save()
            }
            break
        case "remove":
            if (!blacklist.igns.includes(name.toLowerCase())) {
                modMessage("Couldn't remove " + name.toLowerCase() + " from the list they are already there..")
            } else {
                blacklist.igns = blacklist.igns.filter(ent => ent !== name.toLowerCase())
                modMessage(name.toLowerCase() + " has been removed from the list")
                blacklist.save()
            }
            break
        case "clear":
            blacklist.igns.splice(0, blacklist.igns.length)
            blacklist.save()
            modMessage("Your list has been cleared")
            break

        case "list":
            modMessage(blacklist.igns)
            
    }
}).setName("odinlist").setTabCompletions("add, remove, clear, list")

