import { registerForge } from "../../../ForgeEvents/exports.js"
import { leftClick, modMessage, isFacingAABB } from "../../utils.js"
import Dungeon from "../../../BloomCore/dungeons/Dungeon.js"

const EntityOtherPlayerMP = Java.type("net.minecraft.entity.player.EntityOtherPlayerMP")
const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB")

const bloodMobs = [
    "Revoker", "Psycho", "Reaper", "Cannibal", "Mute", "Ooze", "Putrid", "Freak", "Leech", "Tear", 
    "Parasite", "Flamer", "Skull", "Mr. Dead", "Vader", "Frost", "Walker", "Bonzo", "Scarf", "Livid", 
    "Wandering Soul"
]

registerForge(net.minecraftforge.event.entity.EntityJoinWorldEvent, "NORMAL", (e) => {
    if (!Dungeon.inDungeon) return
    const entity = e.entity
    if (!(entity instanceof EntityOtherPlayerMP)) return

    const name = entity.func_70005_c_()

    if (Client.currentGui.get()) return
    if (!bloodMobs.contains(name) && !name.equals("Spirit Bear")) return
    const posX = entity.field_70165_t; const posY = entity.field_70163_u; const posZ = entity.field_70161_v
    if(!isFacingAABB(new AxisAlignedBB(posX - 0.5, posY - 2.0, posZ - 0.5, posX + 0.5, posY + 3.0, posZ + 0.5), 30.0)) return
    leftClick()
})