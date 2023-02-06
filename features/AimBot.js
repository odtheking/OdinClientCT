import Skyblock from "../../BloomCore/Skyblock"
import { data } from "../stuff/guidk"
import { modMessage } from "../utils"
const rightClickKey = Client.getKeyBindFromDescription('key.use')

// Aimbot
/*
let MOB = "Villager"
let enabled = false;

register('step', () => {
    e = World.getAllEntities().forEach(e => {   
        if (!e) return 
        if (e.getName() !== MOB) return
        modMessage(e.getName())
        X0 = Player.getX()
        Y0 = Player.getY()
        Z0 = Player.getZ()
        X1 = e.getX()
        Y1 = e.getY()
        Z1 = e.getZ()
        let dist = Math.sqrt(Math.pow(X1-X0,2) + Math.pow(Y1-Y0,2) + Math.pow(Z1-Z0,2))
        let yaw = -Math.atan2((X1-X0), (Z1-Z0))/Math.PI*180;
        let pitch = -Math.atan2((Y1-Y0), Math.sqrt(Math.pow(X1-X0,2) + Math.pow(Z1-Z0,2)))/Math.PI*180
                        
        Player.getPlayer().field_70177_z = yaw 
        Player.getPlayer().field_70125_A = pitch - (dist / 6)
    })
})
*/

