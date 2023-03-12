import renderBeaconBeam from "../../BeaconBeam"
import RenderLib from "../../RenderLib"
import { data } from "../stuff/guidk"
import { modMessage } from "../utils"

// Vanq Notifier
register("chat", () => {
    if (!data.nether.options[2]) return
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

const renderCustomBeacon = (text, renderx, rendery, renderz) => {
    renderBeaconBeam(renderx - 0.5, rendery, renderz - 0.5, 1, 0, 0, 0.5, false);
    RenderLib.drawEspBox(renderx, rendery, renderz, 1, 1, 1, 0, 0, 0.5, true)
    Tessellator.drawString(text, renderx, rendery + 0.7, renderz)
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

register("chat", (player, x, y, z) => {
    ign = player
    sixtySecondBeacon(x,y,z)
}).setCriteria("${player}: x: ${x} y: ${y} z: ${z}")

register("renderWorld", () => {
    if (!data.nether.options[2]) return
    if (!renderbeam) return;
    renderCustomBeacon([ign + " x: " + renderx, "y: " +rendery, "z: " + renderz].join(", "), renderx, rendery, renderz)
})


