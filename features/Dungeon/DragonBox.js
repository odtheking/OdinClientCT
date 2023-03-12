import { data } from "../../stuff/guidk"
import RenderLib from "../../../RenderLib"
import { modMessage } from "../../utils"
import Skyblock from "../../../BloomCore/Skyblock"


//Dragon box

register('renderWorld', () => {
    if (!data.legit.options[3]) return
    if (Player.getY() > 45 || Skyblock.area !== 'Dungeon') return
    
    //blue 
    RenderLib.drawEspBox(84, 16 , 95, 25, 10, 0, 170/255, 170/255,1,false );
    //purple
    RenderLib.drawEspBox(57, 13, 125, 23, 10, 170/255, 0, 170/255,1,false );
    //green
    RenderLib.drawEspBox(22, 8, 95, 30, 20, 85/255, 255/255, 85/255,1,false );
    //red
    RenderLib.drawEspBox(27, 13, 58, 25, 15, 255/255, 85/255, 85/255,1,false );
    //orange
    RenderLib.drawEspBox(87, 8, 62, 30, 20, 255/255, 170/255, 0,1,false );
    // x y z width height rgb alpha thru walls
})

/*ChatLib.command("particle flame 84 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 57 18 125 1 1 1 1 100")
    ChatLib.command("particle flame 26 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 27 18 60 1 1 1 1 100")
    ChatLib.command("particle flame 84 18 56 1 1 1 1 100")*/
