import { data } from "../../gui"
import { alert, modMessage } from "../../utils/utils"

// Vanq Notifier
register("chat", () => {
    if (!data.qol.vanqNotifier.toggle) return
    let scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) })
    for (let line of scoreboard) {
        if (line.includes("⏣")) {
            ChatLib.command("pc Vanquisher spawned at: " + Math.round(Player.getX()) + " " + Math.round(Player.getY()) + " " + Math.round(Player.getZ()) + line)
        }
    }
    alert("Vanquisher has spawned!")
    modMessage("Vanquisher has spawned!")
}).setCriteria("A Vanquisher is spawning nearby!")




