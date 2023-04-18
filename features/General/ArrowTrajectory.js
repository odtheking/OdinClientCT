import RenderLib from "../../../RenderLib"
import { AxisAlignedBB, Vec3 } from "../../utils/utils"
import { data } from "../../gui"

//let trajectoryVertices = []
let boxRenderQueue = []
let dragonRenderQueue = []
let entityPositions = {}
const EntityDragon = Java.type("net.minecraft.entity.boss.EntityDragon")

register(net.minecraftforge.fml.common.gameevent.TickEvent.ClientTickEvent, (e) => {
    if (!data.general.arrowTrajectory.toggle) return
    if (e.phase == "END") return
    for (let dragon of World.getAllEntitiesOfType(EntityDragon)) {
        for (let entity of dragon.getEntity().func_70021_al()) {
            if (!entityPositions[entity.func_145782_y()]) {
                entityPositions[entity.func_145782_y()] = [entity.field_70165_t, entity.field_70163_u, entity.field_70161_v, entity.field_70165_t, entity.field_70163_u, entity.field_70161_v];
            }
            if (!entityPositions[entity.func_145782_y()]) return
            entityPositions[entity.func_145782_y()][0] = entityPositions[entity.func_145782_y()][3]
            entityPositions[entity.func_145782_y()][1] = entityPositions[entity.func_145782_y()][4]
            entityPositions[entity.func_145782_y()][2] = entityPositions[entity.func_145782_y()][5]
            entityPositions[entity.func_145782_y()][3] = entity.field_70165_t
            entityPositions[entity.func_145782_y()][4] = entity.field_70163_u
            entityPositions[entity.func_145782_y()][5] = entity.field_70161_v
        }
    }
})

register("renderWorld", () => {
    if (!data.general.arrowTrajectory.toggle || !Player.getHeldItem()?.getName()?.includes("Terminator")) return
    setTrajectoryHeading(-5, 0)
   // drawTrajectory()
    setTrajectoryHeading(0, -0.1)
   // drawTrajectory()
    setTrajectoryHeading(5, 0)
   // drawTrajectory()
    drawCollisionBoxes()
    if (!dragonRenderQueue) return
    for (let dragon of dragonRenderQueue) {
        for (let entity of dragon.getEntity().func_70021_al()) {
            if (!entityPositions[entity.func_145782_y()]) return
            let lastX = entityPositions[entity.func_145782_y()][0]
            let lastY = entityPositions[entity.func_145782_y()][1]
            let lastZ = entityPositions[entity.func_145782_y()][2]
            let x = entityPositions[entity.func_145782_y()][3]
            let y = entityPositions[entity.func_145782_y()][4]
            let z = entityPositions[entity.func_145782_y()][5]
        
            let dX = lastX + (x - lastX) * partialTicks
            let dY = lastY + (y - lastY) * partialTicks
            let dZ = lastZ + (z - lastZ) * partialTicks
            let w = entity.field_70130_N
            let h = entity.field_70131_O

            RenderLib.drawEspBox(dX, dY, dZ, w, h, 0, 1, 1, 1, true)
        }
    }
    dragonRenderQueue.length = 0
})

function setTrajectoryHeading(yawOffset, yOffset) {
    let yaw = Player.getYaw() + yawOffset
    let pitch = Player.getPitch()
    let yawRadians = (yaw / 180) * Math.PI
    let pitchRadians = (pitch / 180) * Math.PI
    let posX = Player.getRenderX()
    let posY = Player.getRenderY() + Player.asPlayerMP().getEyeHeight() + yOffset
    let posZ = Player.getRenderZ()
    let motionX = -Math.sin(yawRadians) * Math.cos(pitchRadians)
    let motionY = -Math.sin(pitchRadians)
    let motionZ = Math.cos(yawRadians) * Math.cos(pitchRadians)
    let lengthOffset = Math.sqrt(motionX**2 + motionY**2 + motionZ**2)
    motionX = motionX / lengthOffset * 3
    motionY = motionY / lengthOffset * 3
    motionZ = motionZ / lengthOffset * 3
    calculateTrajectory({x: motionX, y: motionY, z: motionZ}, {x: posX, y: posY, z: posZ})
}

function calculateTrajectory(motion, pos) {
    let hitResult = false
    for (let j = 0; j < 60; j++) {
        if (hitResult) return
        let vec31 = new Vec3(pos.x, pos.y, pos.z)
        let vec32 = new Vec3(pos.x + motion.x, pos.y + motion.y, pos.z + motion.z)
        let rayTrace = World.getWorld().func_147447_a(vec31, vec32, false, true, false)
        let bb = new AxisAlignedBB(0, 0, 0, 0, 0, 0).func_72317_d(pos.x, pos.y, pos.z).func_72321_a(motion.x, motion.y, motion.z).func_72314_b(0.01, 0.01, 0.01)
        let entityHit = World.getWorld().func_72839_b(Player.getPlayer(), bb).filter(e => !(e instanceof net.minecraft.entity.projectile.EntityArrow))
        if (entityHit[0]) {
            let e = new Entity(entityHit[0])
            if (e.getClassName() == "EntityDragon") {
                dragonRenderQueue.push(e)
                hitResult = true
                return
            }
            boxRenderQueue.push({x: e.getRenderX(), y: e.getRenderY(), z: e.getRenderZ(), w: e.getWidth(), h: e.getHeight()})
            hitResult = true
        } else if (rayTrace) {
            let vec = rayTrace.field_72307_f
            boxRenderQueue.push({x: vec.field_72450_a, y: vec.field_72448_b, z: vec.field_72449_c, w: 0.3, h: 0.3})
            hitResult = true
        }
        pos.x += motion.x
        pos.y += motion.y
        pos.z += motion.z
        motion.x *= 0.99
        motion.y *= 0.99
        motion.z *= 0.99
        motion.y -= 0.05
        //trajectoryVertices.push(vec32)
    }
    //if (!trajectoryVertices) return
}

/*
function drawTrajectory() {
    GL11.glLineWidth(2.0);
    GL11.glEnable(GL11.GL_LINE_SMOOTH)
    Tessellator.blendFunc(770, 771)
    Tessellator.enableBlend()
    Tessellator.disableTexture2D()
    Tessellator.depthMask(false)
    Tessellator.pushMatrix()
    Tessellator.begin(GL11.GL_LINES).colorize(0, 1, 1, 1)
    for (let i = 1; i < trajectoryVertices.length; i++) {
        let start = trajectoryVertices[i-1]
        let end = trajectoryVertices[i]
        Tessellator.pos(start.field_72450_a, start.field_72448_b, start.field_72449_c)
        Tessellator.pos(end.field_72450_a, end.field_72448_b, end.field_72449_c)
    }
    Tessellator.draw()
    Tessellator.popMatrix();
    Tessellator.depthMask(true)
    Tessellator.enableTexture2D()
    Tessellator.disableBlend()
    GL11.glDisable(GL11.GL_LINE_SMOOTH)
    trajectoryVertices.length = 0
}
*/

function drawCollisionBoxes() {
    if (!boxRenderQueue) return
    for (let b of boxRenderQueue) {
        if (Math.hypot(Player.getRenderX() - b.x, Player.getRenderY() + Player.asPlayerMP().getEyeHeight() - b.y, Player.getRenderZ() - b.z) < 2) {
            boxRenderQueue.length = 0
            return
        }
        RenderLib.drawEspBox(b.x, b.y - 0.15, b.z, b.w, b.h, 0, 1, 1, 1, false)
    }
    boxRenderQueue.length = 0
}