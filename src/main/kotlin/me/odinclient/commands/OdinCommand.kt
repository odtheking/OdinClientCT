package me.odinclient.commands

import cc.polyfrost.oneconfig.utils.commands.annotations.Command
import cc.polyfrost.oneconfig.utils.commands.annotations.Main
import cc.polyfrost.oneconfig.utils.commands.annotations.SubCommand
import me.odinclient.OdinClient
import me.odinclient.features.qol.ESP
import me.odinclient.utils.ChatUtils
import net.minecraft.entity.Entity
import net.minecraft.entity.item.EntityArmorStand
import kotlin.math.pow


@Command(value = "odinclient", aliases = ["od"])
class OdinCommand: OdinClient() {

    @Main(description = "Opens the OdinClient GUI")
    private fun main() {
        config.openGui()
    }

    @SubCommand(description = "ESP")
    private fun esp(firstArg: String, mobName: String, mobName2: String) {
        var entity: String
        entity = mobName.lowercase()


        if (firstArg == "add") {
            if (mobName2 == "") {
                if (ESP.espList.contains(entity)) ChatUtils.modMessage("$entity is already in the list")
                else {
                    ESP.espList.add(entity)
                    reloadEntityRenderQueue()
                    ChatUtils.modMessage("Added $entity to the list")
                }
            }
            if (mobName2 != "") {
                entity = mobName.lowercase() + " " + mobName2.lowercase()
                if (ESP.espList.contains(entity)) ChatUtils.modMessage("$entity is not in the list")
                else {
                    ESP.espList.add(entity)
                    reloadEntityRenderQueue()
                    ChatUtils.modMessage("Added $entity to the list")
                }
            }
        } else if (firstArg == "remove") {
            if (ESP.espList.contains(entity)) {
                ESP.espList.remove(entity)
                reloadEntityRenderQueue()
                ChatUtils.modMessage("Successfully removed $entity from the list")
            } else {
                ChatUtils.modMessage("Couldn't remove $entity from the list")
            }
        } else if (firstArg == "list") {
            ESP.espList.forEach { ChatUtils.modMessage(it)}
            reloadEntityRenderQueue()
        } else if (firstArg == "clear") {
            ESP.espList.clear()
            reloadEntityRenderQueue()
            ChatUtils.modMessage("Cleared esp list")
        }
    }

    private fun reloadEntityRenderQueue() {
        ESP.entityRenderQueue.clear()
        mc.theWorld.loadedEntityList.forEach { entity ->
            if (entity is EntityArmorStand) {
                val name = entity.name.replace("[\u00a7&][0-9a-fk-or]".toRegex(), "").lowercase()
                if (!ESP.espList.any { espName -> name.contains(espName) }) { return }
                val entities = mc.theWorld.getEntitiesWithinAABBExcludingEntity(entity, entity.entityBoundingBox.expand(1.0, 5.0, 1.0)).filter { e -> e != null && e !is EntityArmorStand && e != mc.thePlayer }.sortedBy { a ->  noSqrt3DDistance(a, entity)}
                if (entities.isEmpty()) return
                ESP.entityRenderQueue[entity.entityId] = entities[0]
            }
        }

    }

    private fun noSqrt3DDistance(entity: Entity, entity1: Entity): Double {
        return (entity.posX - entity1.posX).pow(2.0) +
                (entity.posY - entity1.posY).pow(2.0) +
                (entity.posZ - entity1.posZ).pow(2.0)
    }

}