import { data } from "../stuff/guidk"
import renderBeaconBeam from "../../BeaconBeam"
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

register("chat", (rank, x, y, z, loc) => {
    renderx = parseInt(x, 10);
    rendery = parseInt(y, 10);
    renderz = parseInt(z, 10);
    renderbeam = true;
    setTimeout(() => {
        renderbeam = false
    }, 60000);
})
    .setCriteria(/Party > (\[.+\])? .{0,16}: Vanquisher spawned at: (-?\d+) (-?\d+) (-?\d+) (.+)/)

register("chat", (player, x, y, z) => {
    renderx = parseInt(x, 10);
    rendery = parseInt(y, 10);
    renderz = parseInt(z, 10);
    renderbeam = true;
    setTimeout(() => {
        renderbeam = false
    }, 60000);
}).setCriteria("Party > ${player}: x: ${x} y: ${y} z: ${z}")

register("renderWorld", () => {
    if (!data.nether.options[2]) return
    if (!renderbeam) return;
    renderBeaconBeam(renderx, rendery + 1, renderz, 1, 0, 0, 0.5, false);
    Tessellator.drawString(["vanq " + renderx, rendery, renderz].join(", "), renderx, rendery, renderz)
})


