import { data } from "../../gui"
import RenderLib from "../../../RenderLib"
import { getPhase, modMessage } from "../../utils/utils"


const dragonRegister = register('renderWorld', () => {
    if (!data.m7.dragonBoxes.toggle) return
    if (getPhase() !== "p5") return
    //blue 
    RenderLib.drawEspBox(84, 16 , 95, 25, 10, 0, 170/255, 170/255,1,false );
    //purple
    RenderLib.drawEspBox(57, 13, 125, 23, 10, 170/255, 0, 170/255,1,false );
    //green
    RenderLib.drawEspBox(22, 8, 95, 32, 20, 85/255, 255/255, 85/255,1,false );
    //red
    RenderLib.drawEspBox(27, 13, 58, 25, 15, 255/255, 85/255, 85/255,1,false );
    //orange
    RenderLib.drawEspBox(87, 8, 62, 28, 20, 255/255, 170/255, 0,1,false );
})

let lastSetting = false
register("step", () => {
    if (lastSetting == data.m7.dragonBoxes.toggle) return
    lastSetting = data.m7.dragonBoxes.toggle
    if (lastSetting) {
        dragonRegister.register()
    } else {
        dragonRegister.unregister()
    }
}).setFps(1)