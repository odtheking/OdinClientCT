import { data } from "../../gui"
import { leftClick, modMessage, isFacingAABB } from "../../utils/utils"
import Dungeon from "../../../BloomCore/dungeons/Dungeon.js"

const EntityOtherPlayerMP = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")
const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB")

const bloodMobs = [
    "Revoker", "Psycho", "Reaper", "Cannibal", "Mute", "Ooze", "Putrid", "Freak", "Leech", "Tear", 
    "Parasite", "Flamer", "Skull", "Mr.Dead", "Vader", "Frost", "Walker", "Bonzo", "Scarf", "Livid", 
    "WanderingSoul"
]

register(net.minecraftforge.event.entity.EntityJoinWorldEvent, (e) => {
    if (Dungeon.bloodDone || !Dungeon.bloodOpen) return
    const entity = e.entity
    if (!(entity instanceof EntityOtherPlayerMP)) return
    if (Client.currentGui.get()) return

    let name = entity.func_70005_c_()
    name = name.replace(" ", "")
    if (!(bloodMobs.includes(name) && data.dungeons.bloodTriggerBot.toggle) && !(name == "Spirit Bear" && data.dungeons.bearTriggerBot.toggle)) return

    const posX = entity.field_70165_t
    const posY = entity.field_70163_u
    const posZ = entity.field_70161_v
    if(!isFacingAABB(new AxisAlignedBB(posX - 0.5, posY - 2.0, posZ - 0.5, posX + 0.5, posY + 3.0, posZ + 0.5), 30.0)) return
    leftClick()
})