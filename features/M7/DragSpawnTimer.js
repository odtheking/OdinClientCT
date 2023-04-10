import { data } from "../../gui"
import { modMessage } from "../../utils/utils"

// Dragon Timer

let times = []
times["orange"] = null
times["red"] = null
times["green"] = null
times["blue"] = null
times["purple"] = null
const colors = {
    "orange": {x: [82, 88], y: [15, 22], z: [53, 59]},
    "red": {x: [24, 30], y: [15, 22], z: [56, 62]},
    "green": {x: [23, 29], y: [15, 22], z: [91, 97]},
    "purple": {x: [53, 59], y: [15, 22], z: [122, 128]},
    "blue": {x: [82, 88], y: [15, 22], z: [91, 97]},
}

function checkParticle(particle, color) {
    const [x, y, z] = [particle.x,particle.y,particle.z];
    return x >= colors[color].x[0] && x <= colors[color].x[1] && y >= colors[color].y[0] && y <= colors[color].y[1] && z >= colors[color].z[0] && z <= colors[color].z[1];
}

register("spawnParticle", (particle, type, event) => {
    if (type.toString() !== "FLAME") return;
    Object.keys(colors).forEach((color) => {
        if(checkParticle(particle, color) && times[color] === null){
            times[color] = new Date().getTime();
        }
    });
});

const dragonspawntime = 5000
const textlocations = [
    { x: 84, y: 18, z: 56},
    { x: 27, y: 18, z: 60},
    { x: 26, y: 18, z: 95},
    { x: 84, y: 18, z: 95},
    { x: 57, y: 18, z: 125}
]

const timerRegister = register("renderWorld", () => {
    if (!data.m7.dragonTimer.toggle) return
    currentTime = new Date().getTime()
    const dragonColors = ["orange", "red", "green", "blue", "purple"];
    const colorCodes = ["6","c","a","b","5"]
    dragonColors.forEach((color, i) => {
        time = times[`${color}`];
        if (time !== null) {
            if (currentTime - time < dragonspawntime) {
                const spawnTime = dragonspawntime - (currentTime - time);
                let colorCode;
                (spawnTime <= 1000) ? colorCode = "§c" : (spawnTime <= 3000) ? colorCode = "§e" : colorCode = "§a"
                const text = `§${colorCodes[i]}${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${colorCode}${spawnTime}ms`
                Tessellator.drawString(text, textlocations[i].x, textlocations[i].y, textlocations[i].z, 0)
            } else {
                times[`${color}`] = null;
            }
        }
    })
})

let atline = 0
const timerRegister2 = register("renderOverlay", () => {
    if (!data.m7.dragonTimer.toggle) return
    if (dragMove.isOpen()) {
       // font2.drawStringWithShadow("Green spawning in: 5000ms", dragdata.dragX, dragdata.dragY, new Color(0.6, 0, 0.95, 1))
        Renderer.drawStringWithShadow("§aGreen spawning in: 5000ms",dragdata.dragX,dragdata.dragY+(atline*10))

    }
    currentTime = new Date().getTime()
    const dragonColors = ["orange", "red", "green", "blue", "purple"];
    const colorCodes = ["6","c","a","b","5"]
    dragonColors.forEach((color, i) => {
        time = times[`${color}`];
        if (time !== null) {
            if (currentTime - time < dragonspawntime) {
                const spawnTime = dragonspawntime - (currentTime - time);
                let colorCode;
                (spawnTime <= 1000) ? colorCode = "§c" : (spawnTime <= 3000) ? colorCode = "§e" : colorCode = "§a"
                const text = `§${colorCodes[i]}${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${colorCode}${spawnTime}ms`
                Renderer.drawStringWithShadow(text,dragdata.dragX,dragdata.dragY+(atline*10))
                atline++
            } else {
                times[`${color}`] = null;
            }
        }
    })
    atline = 0
})

let lastSetting = false
register("step", () => {
    if (lastSetting == data.m7.dragonTimer.toggle) return
    lastSetting = data.m7.dragonTimer.toggle
    if (lastSetting) {
        timerRegister.register()
        timerRegister2.register()
    } else {
        timerRegister.unregister()
        timerRegister2.unregister()
    }
}).setFps(1)

register("worldLoad", () => {
    times["orange"] = null
    times["red"] = null
    times["green"] = null
    times["blue"] = null
    times["purple"] = null
})