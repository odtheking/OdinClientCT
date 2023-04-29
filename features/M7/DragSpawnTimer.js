import { data } from "../../gui"
import PogObject from "../../../PogData"
import { getPhase } from "../../utils/utils"
// Dragon Timer
const dragMove = new Gui()

const dragdata = new PogObject("OdinCheata", {
    dragX: 50,
    dragY: 50,
  }, "config/featuredata.json")
  
register("dragged", (dx, dy, x, y) => {
    if (dragMove.isOpen()) {
    dragdata.dragX += dx
    dragdata.dragY += dy
    dragdata.save()
    }
})
register("command", () => {
    dragMove.open()
  }).setName("movedrag")

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

boxestoRender = {
    blue: true,
    purple: true,
    green: true,
    red: true,
    orange: true
}

function checkParticle(particle, color) {
    const [x, y, z] = [particle.x,particle.y,particle.z];
    return x >= colors[color].x[0] && x <= colors[color].x[1] && y >= colors[color].y[0] && y <= colors[color].y[1] && z >= colors[color].z[0] && z <= colors[color].z[1];
}

register("spawnParticle", (particle, type, event) => {
    if (type.toString() !== "FLAME") return;
    const colorKeys = Object.keys(colors);
    for (let color of colorKeys) {
        if (checkParticle(particle, color) && times[color] === null) {
            times[color] = new Date().getTime();
        }
    }
});
const dragonColors = ["orange", "red", "green", "blue", "purple"];
const colorCodes = ["6","c","a","b","5"]
const dragonspawntime = 5000
const textlocations = [
    { x: 84, y: 18, z: 56},
    { x: 27, y: 18, z: 60},
    { x: 26, y: 18, z: 95},
    { x: 84, y: 18, z: 95},
    { x: 57, y: 18, z: 125}
]



let textsToRender = [];

register("step", () => {
    if (!data.m7.dragonTimer.toggle || getPhase() !== "p5") return;
    currentTime = new Date().getTime()

    textsToRender = [];
    dragonColors.forEach((color, i) => {
        if (!boxestoRender[color]) return;
        const time = times[`${color}`];
        if (time !== null) {
            if (currentTime - time < dragonspawntime) {
                const spawnTime = dragonspawntime - (currentTime - time);
                let colorCode;
                (spawnTime <= 1000) ? colorCode = "§c" : (spawnTime <= 3000) ? colorCode = "§e" : colorCode = "§a";
                const text = `§${colorCodes[i]}${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${colorCode}${spawnTime}ms`;
                textsToRender.push({ text: text, index: i });
            } else {
                times[`${color}`] = null;
            }
        }
    });

}).setFps(10);

const timerRegister = register("renderWorld", () => {
    if (!data.m7.dragonTimer.toggle || getPhase() !== "p5") return;
    textsToRender.forEach(({ text, index }) => {
        Tessellator.drawString(text, textlocations[index].x, textlocations[index].y, textlocations[index].z, 0);
    });
});

let atline = 0
const timerRegister2 = register("renderOverlay", () => {
    if (dragMove.isOpen()) {
        Renderer.drawStringWithShadow("§aGreen spawning in: 5000ms",dragdata.dragX,dragdata.dragY+(atline*10))
        Renderer.drawStringWithShadow(text,dragdata.dragX,dragdata.dragY+(atline*10))


    } else if (data.m7.dragonTimer.toggle || getPhase() == "p5") {
        textsToRender.forEach(({ text }) => {
            Renderer.drawStringWithShadow(text,dragdata.dragX,dragdata.dragY+(atline*10))
        });
    }

})

let lastSetting = false
register("step", () => {
    if (!World.isLoaded()) return
    boxestoRender.blue = !World.getBlockAt(79, 23, 94).type.getName().includes("air")
    boxestoRender.purple = !World.getBlockAt(56, 22, 120).type.getName().includes("air")
    boxestoRender.green = !World.getBlockAt(32, 23, 94).type.getName().includes("air")
    boxestoRender.red = !World.getBlockAt(32, 22, 59).type.getName().includes("air")
    boxestoRender.orange = !World.getBlockAt(80, 23, 56).type.getName().includes("air")
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