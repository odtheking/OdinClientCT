import { data } from "../stuff/guidk"
import { modMessage } from "../utils"

// Dragon Timer

let window = []
window["orangetime"] = null
window["redtime"] = null
window["greentime"] = null
window["bluetime"] = null
window["purpletime"] = null
const colors = {
    "orangetime": { x: [82, 88], y: [15, 22], z: [53, 59] },
    "redtime": { x: [24, 30], y: [15, 22], z: [56, 62] },
    "greentime": { x: [23, 29], y: [15, 22], z: [91, 97] },
    "purpletime": { x: [53, 59], y: [15, 22], z: [122, 128] },
    "bluetime": { x: [82, 88], y: [15, 22], z: [91, 97] },
}

function checkParticle(particle, color) {
    const [x, y, z] = [particle.x, particle.y, particle.z];
    return x >= colors[color].x[0] && x <= colors[color].x[1] && y >= colors[color].y[0] && y <= colors[color].y[1] && z >= colors[color].z[0] && z <= colors[color].z[1];
}

register("spawnParticle", (particle, type, event) => {
    if (type.toString() !== "FLAME") return;
    Object.keys(colors).forEach((color) => {
        if (checkParticle(particle, color) && window[color] === null) {
            window[color] = new Date().getTime();
        }
    });
});

dragonspawntime = 5000

register("renderWorld", () => {
    if (!data.legit.options[4]) return
    const currentTime = new Date().getTime()
    const dragonColors = ["orange", "red", "green", "blue", "purple"];
    const colorCodes = ["6", "c", "a", "b", "5"]
    for (let i = 0; i < dragonColors.length; i++) {
        const color = dragonColors[i];
        const time = window[`${color}time`];
        if (time) {
            if (currentTime - time < dragonspawntime) {
                const spawnTime = dragonspawntime - (currentTime - time);
                let colorCode;
                if (spawnTime <= 1000) {
                    colorCode = "&c";
                } else if (spawnTime <= 3000) {
                    colorCode = "&e";
                } else {
                    colorCode = "&a";
                }

                if (dragonColors[i] == "blue") {
                    Tessellator.drawString(`${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${spawnTime}ms`, 84, 18, 95, 142)
                } else if (dragonColors[i] == "purple") {
                    Tessellator.drawString(`${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${spawnTime}ms`, 57, 18, 125, 8388736)
                } else if (dragonColors[i] == "green") {
                    Tessellator.drawString(`${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${spawnTime}ms`, 26, 18, 95, 65280)
                } else if (dragonColors[i] == "red") {
                    Tessellator.drawString(`${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${spawnTime}ms`, 27, 18, 60, 12189696)
                } else if (dragonColors[i] == "orange") {
                    Tessellator.drawString(`${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${spawnTime}ms`, 84, 18, 56, 16743168)
                }
            } else {
                window[`${color}time`] = null;
            }
        }
    }

})

register("worldLoad", () => {
    window["orangetime"] = null
    window["redtime"] = null
    window["greentime"] = null
    window["bluetime"] = null
    window["purpletime"] = null
})

register("command", () => {
    ChatLib.command("particle flame 84 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 57 18 125 1 1 1 1 100")
    ChatLib.command("particle flame 26 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 27 18 60 1 1 1 1 100")
    ChatLib.command("particle flame 84 18 56 1 1 1 1 100")
}).setName("testdragons")