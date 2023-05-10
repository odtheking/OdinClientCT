import { data } from "../../gui";
import { modMessage} from "../../utils/utils";

//vanqnotifier

register("chat", () => {
    if (!data.qol.vanqNotifier.toggle) return
    for (let line of Scoreboard.getLines().map(a => ChatLib.removeFormatting(a))) if (line.includes("⏣")) ChatLib.command("pc Vanquisher spawned at: " + Math.round(Player.getX()) + " " + Math.round(Player.getY()) + " " + Math.round(Player.getZ()) + line)
    modMessage("Vanquisher has spawned!")
}).setCriteria("A Vanquisher is spawning nearby!")

