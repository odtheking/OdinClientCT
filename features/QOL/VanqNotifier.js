import { data } from "../../gui"
import { modMessage, renderCustomBeacon } from "../../utils/utils"

// Vanq Notifier
register("chat", () => {
    if (!data.qol.vanqNotifier.toggle) return
    let scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) })
    for (let line of scoreboard) {
        if (line.includes("⏣")) {
            ChatLib.command("pc Vanquisher spawned at: " + Math.round(Player.getX()) + " " + Math.round(Player.getY()) + " " + Math.round(Player.getZ()) + line)
        }
    }
    modMessage("Vanquisher has spawned!")
}).setCriteria("A Vanquisher is spawning nearby!")


let renderbeam = false;
let renderx, rendery, renderz;
let ign

const sixtySecondBeacon = (x, y, z) => {
    renderx = parseInt(x, 10) + 0.5
    rendery = parseInt(y, 10) 
    renderz = parseInt(z, 10) + 0.5
    renderbeam = true;
    setTimeout(() => {
        renderbeam = false
    }, 60000);
}


register("chat", (rank, player, x, y, z, loc) => {
    ign = player
    sixtySecondBeacon(x,y,z)
}).setCriteria(/Party > (\[.+\])? (.{0,16}): Vanquisher spawned at: (-?\d+) (-?\d+) (-?\d+) (.+)/)

register("chat", (rank, player, location, x, y, z) => {
    ign = player
    sixtySecondBeacon(x,y,z)
}).setCriteria(/Party > (.+)?(.{0,16}): Current area: (.+). X: (-?\d+) Y: (-?\d+) Z: (-?\d+)/)

register("chat", (rank, player, x, y, z) => {
    ign = player
    sixtySecondBeacon(x,y,z)
}).setCriteria("Party > {rank} ${player}: x: ${x} y: ${y} z: ${z}")

register("chat", (rank, player, x, y, z) => {
    ign = player
    sixtySecondBeacon(x,y,z)
}).setCriteria("{rank} ${player}: x: ${x} y: ${y} z: ${z}")

register("renderWorld", () => {
    if (!data.qol.vanqNotifier.toggle) return
    if (!renderbeam) return;
    renderCustomBeacon([ign + " x: " + renderx, "y: " +rendery, "z: " + renderz].join(", "), renderx, rendery, renderz, 1, 0, 0)
})


