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

const sixtySecondBeacon = (x, y, z) => {
    renderx = Math.round(parseInt(x, 10))
    rendery = Math.round(parseInt(y, 10))
    renderz = Math.round(parseInt(z, 10))
    renderbeam = true;
    setTimeout(() => {
        renderbeam = false
    }, 60000);
}
register("chat", (rank, x, y, z, loc) => {
    sixtySecondBeacon(x,y,z)
}).setCriteria(/Party > (\[.+\])? .{0,16}: Vanquisher spawned at: (-?\d+) (-?\d+) (-?\d+) (.+)/)

register("chat", (player, x, y, z) => {
    sixtySecondBeacon(x,y,z)
}).setCriteria("Party > ${player}: x: ${x} y: ${y} z: ${z}")

register("chat", (player, x, y, z) => {
    sixtySecondBeacon(x,y,z)
}).setCriteria("${player}: x: ${x} y: ${y} z: ${z}")

register("renderWorld", () => {
    if (!data.nether.options[2]) return
    if (!renderbeam) return;
    renderBeaconBeam(renderx, rendery + 1, renderz, 1, 0, 0, 0.5, false);
    RenderLib.drawEspBox(renderx, rendery, renderz, 1, 1, 1, 0, 0, 0.5, true)
    Tessellator.drawString(["x: " + renderx, "y: " +rendery, "z: " + renderz].join(", "), renderx, rendery + 1, renderz)
})


