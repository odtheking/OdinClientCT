import RenderLib from "../../../RenderLib"
import { AxisAlignedBB, Vec3 } from "../../utils/utils"

let trajectoryVertices = []
let boxRenderQueue = []

register("renderWorld", () => {
    if (!Player.getHeldItem()?.getName()?.includes("Terminator")) return
    /*setTrajectoryHeading(-5, 0)
    drawTrajectory()
    setTrajectoryHeading(0, -0.1)
    drawTrajectory()
    setTrajectoryHeading(5, 0)
    drawTrajectory()*/
    drawCollisionBoxes()
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
    for (let j = 0; j < 120; j++) {
        if (hitResult) return
        let vec31 = new Vec3(pos.x, pos.y, pos.z)
        let vec32 = new Vec3(pos.x + motion.x, pos.y + motion.y, pos.z + motion.z)
        let rayTrace = World.getWorld().func_147447_a(vec31, vec32, false, true, false)
        let bb = new AxisAlignedBB(0, 0, 0, 0, 0, 0).func_72317_d(pos.x, pos.y, pos.z).func_72321_a(motion.x, motion.y, motion.z).func_72314_b(0.01, 0.01, 0.01)
        let entityHit = World.getWorld().func_72839_b(Player.getPlayer(), bb).filter(e => !(e instanceof net.minecraft.entity.projectile.EntityArrow))
        if (entityHit[0]) {
            let e = new Entity(entityHit[0])
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
        trajectoryVertices.push(vec32)
    }
    if (!trajectoryVertices) return
}

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

function drawCollisionBoxes() {
    if (boxRenderQueue) {
        boxRenderQueue.forEach(b => {
            RenderLib.drawEspBox(b.x, b.y - 0.15, b.z, b.w, b.h, 0, 1, 1, 1, false)
            
        })
    }
    boxRenderQueue.length = 0
}