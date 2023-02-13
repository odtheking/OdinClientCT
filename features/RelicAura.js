import Skyblock from "../../BloomCore/Skyblock"
import { EntityArmorStand, getDistance3D } from "../../BloomCore/utils/Utils"
import { data } from "../stuff/guidk"
import { rightClick, swapAndRightClick } from "../utils"

//                    interactWithMCP(e.getEntity())

// Relic Aura
let hasrelic = false
let disabler = false

register('worldLoad', () => {
    hasrelic = false
    disabler = false
})
//future use
register('chat', (player, color) => {
    disabler = true
}).setCriteria("{player} picked the Corrupted {color} Relic!")


register('tick', (ticks) => {
    if (ticks % 2 !== 0 || Skyblock.area != 'Dungeon' || !data.qol.options[0] || hasrelic || disabler) return
    World.getAllEntitiesOfType(EntityArmorStand.class).forEach(e => {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()?.includes("Relic")) {
            const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
            const [x1, y1, z1] = [e.getX(), e.getY(), e.getZ()]

            let dist = getDistance3D(x, y, z, x1, y1, z1)
            let yaw = -Math.atan2((x1 - x), (z1 - z)) / Math.PI * 180;
            let pitch = -Math.atan2((y1 - y), Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(z1 - z, 2))) / Math.PI * 180
            if (dist <= 5) {
                Player.getPlayer().field_70177_z = yaw
                Player.getPlayer().field_70125_A = pitch
                rightClick()

            }
        }
    })
})
