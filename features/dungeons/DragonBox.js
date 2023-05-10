import Skyblock from "../../../BloomCore/Skyblock"
import RenderLib from "../../../RenderLib"
import { data } from "../../gui"

boxestoRender = {
    blue: true,
    purple: true,
    green: true,
    red: true,
    orange: true
}


const boxRegister = register('renderWorld', () => {
    if (!data.dungeons.dragonBoxes.toggle || Player.getY() > 45 || Skyblock.area !== 'Dungeon') return

    if (boxestoRender.blue) RenderLib.drawEspBox(84, 16 , 95, 25, 10, 0, 170/255, 170/255,1, false);
    if (boxestoRender.purple) RenderLib.drawEspBox(57, 13, 125, 23, 10, 170/255, 0, 170/255,1, false);
    if (boxestoRender.green) RenderLib.drawEspBox(22, 8, 95, 32, 20, 85/255, 255/255, 85/255,1, false);
    if (boxestoRender.red) RenderLib.drawEspBox(27, 13, 58, 25, 15, 255/255, 85/255, 85/255,1, false);
    if (boxestoRender.orange) RenderLib.drawEspBox(87, 8, 62, 28, 20, 255/255, 170/255, 0,1, false);
})


let lastSetting = false
register("step", () => {
    if (!World.isLoaded()) return
    boxestoRender.blue = !World.getBlockAt(79, 23, 94).type.getName().includes("air")
    boxestoRender.purple = !World.getBlockAt(56, 22, 120).type.getName().includes("air")
    boxestoRender.green = !World.getBlockAt(32, 23, 94).type.getName().includes("air")
    boxestoRender.red = !World.getBlockAt(32, 22, 59).type.getName().includes("air")
    boxestoRender.orange = !World.getBlockAt(80, 23, 56).type.getName().includes("air")
    if (lastSetting == data.dungeons.dragonTimer.toggle) return
    lastSetting = data.dungeons.dragonTimer.toggle
    if (lastSetting) {
        boxRegister.register()
    } else {
        boxRegister.unregister()
    }
}).setFps(1)

/*
ChatLib.command("particle flame 84 18 95 1 1 1 1 100")
ChatLib.command("particle flame 57 18 125 1 1 1 1 100")
ChatLib.command("particle flame 26 18 95 1 1 1 1 100")
ChatLib.command("particle flame 27 18 60 1 1 1 1 100")
ChatLib.command("particle flame 84 18 56 1 1 1 1 100")
*/