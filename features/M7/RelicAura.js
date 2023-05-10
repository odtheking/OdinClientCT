import { C02PacketUseEntity, EntityArmorStand, getDistance3D } from "../../../BloomCore/utils/Utils"
import { data } from "../../gui"
import { Vec3, modMessage } from "../../utils/utils"

let disabler = false
register('worldLoad', () => {
    disabler = false
})
register("chat", () => {
    disabler = true
}).setCriteria("[BOSS] Wither King: You.. again?")


register('tick', () => {
    if (disabler || !data.m7.relicAura.toggle) return;
    let armorStands = World.getAllEntitiesOfType(EntityArmorStand);
    for (let i = 0; i < armorStands.length; i++) {
        let e = armorStands[i];
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()?.includes("Relic")) {
            let dist = Player.asPlayerMP.distanceTo(e);
            if (dist > 5) return;
            interactWithEntity(e.getEntity());
        }
    }
});

const interactWithEntity = (entity) => {
    const objectMouseOver = Client.getMinecraft().field_71476_x.field_72307_f;
    const dx = objectMouseOver.xCoord - entity.field_70165_t;
    const dy = objectMouseOver.yCoord - entity.field_70163_u;
    const dz = objectMouseOver.zCoord - entity.field_70161_v;
    const vec = new Vec3(dx, dy, dz);
    Client.sendPacket(new C02PacketUseEntity(entity, vec));
}