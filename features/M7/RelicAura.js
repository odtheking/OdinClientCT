import { EntityArmorStand, getDistance3D } from "../../../BloomCore/utils/Utils"
import { data } from "../../gui"
import { modMessage } from "../../utils/utils"


let disabler = false
register('worldLoad', () => {
    disabler = false
})
register("chat", () => {
    disabler = true
}).setCriteria("[BOSS] Wither King: You.. again?")

const C02PacketUseEntity = Java.type('net.minecraft.network.play.client.C02PacketUseEntity')
const Vec3 = Java.type('net.minecraft.util.Vec3')

register('tick', (ticks) => {
    if (ticks % 4 !== 0 || disabler || !data.m7.relicAura.toggle) return
    World.getAllEntitiesOfType(EntityArmorStand.class).forEach(e => {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()?.includes("Relic")) {
            const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
            const [x1, y1, z1] = [e.getX(), e.getY(), e.getZ()]
            let dist = getDistance3D(x, y, z, x1, y1, z1)       
            if (dist > 5) return
            interactWithEntity(e.getEntity())
        }
    })
})

const interactWithEntity = (entity) => {
    const objectMouseOver = Client.getMinecraft().field_71476_x.field_72307_f;
    const dx = objectMouseOver.xCoord - entity.field_70165_t;
    const dy = objectMouseOver.yCoord - entity.field_70163_u;
    const dz = objectMouseOver.zCoord - entity.field_70161_v;
    const vec = new Vec3(dx, dy, dz);
    Client.sendPacket(new C02PacketUseEntity(entity, vec));
}