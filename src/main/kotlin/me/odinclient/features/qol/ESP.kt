package me.odinclient.features.qol

import me.odinclient.OdinClient
import me.odinclient.utils.RenderUtils
import net.minecraft.entity.Entity
import net.minecraft.entity.item.EntityArmorStand
import net.minecraftforge.client.event.RenderWorldLastEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent
import java.awt.Color
import kotlin.math.pow

class ESP: OdinClient() {

    @SubscribeEvent
    fun onTick(event: TickEvent.ClientTickEvent) {
        if (!config.esp) return
        mc.theWorld.loadedEntityList.forEach { entity ->
            if (entity !is EntityArmorStand) return

            val matchingEntity = entityRenderQueue[entity.entityId]
            if (matchingEntity != null && matchingEntity.isDead) {
                entityRenderQueue.remove(entity.entityId)
            } else if (matchingEntity != null) return

            val name = entity.name.replace(Regex("[\u00a7&][0-9a-fk-or]"), "").lowercase()
            if (entityRenderQueue.any { espName -> name.contains(espName.toString()) }) {
                entityRenderQueue.remove(entity.entityId)
                return
            }
            val entities =
                mc.theWorld.getEntitiesWithinAABBExcludingEntity(entity, entity.entityBoundingBox.expand(1.0, 5.0, 1.0))
                    .filter { it != null && it !is EntityArmorStand && it != mc.thePlayer }
                    .sortedBy { noSqrt3DDistance(it, entity) }
            if (entities.isEmpty()) return
            entityRenderQueue[entity.entityId] = entities[0]
        }
    }

    @SubscribeEvent
    fun onWorldRenderLast(event: RenderWorldLastEvent) {
        if (!config.esp) return
        entityRenderQueue.forEach { (id, ent) ->
            if (ent.isDead) {
                entityRenderQueue.remove(id)
                return
            }
            RenderUtils.drawCustomEspBox(
                ent.posX, ent.width.toDouble(),
                ent.posY, ent.height.toDouble(),
                ent.posZ, ent.width.toDouble(),
                Color(255, 255, 0, 255),
                2f,
                phase = true
            )
        }
    }

    private fun noSqrt3DDistance(entity: Entity, entity1: Entity): Double {
        return (entity.posX - entity1.posX).pow(2.0) +
               (entity.posY - entity1.posY).pow(2.0) +
               (entity.posZ - entity1.posZ).pow(2.0)
    }

    companion object {
        var espList = ArrayList<String>()
        var entityRenderQueue = HashMap<Int, Entity>()
    }
}