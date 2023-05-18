package me.odinclient.utils

import me.odinclient.mixin.MinecraftAccessor
import net.minecraft.client.Minecraft
import net.minecraft.entity.EntityLivingBase
import net.minecraft.item.ItemStack
import net.minecraft.network.play.client.C02PacketUseEntity
import net.minecraft.util.Vec3
import kotlin.math.sqrt

object PlayerUtils {

    private val mc = Minecraft.getMinecraft()

    /**
     * Makes the player right click.
     */
    fun rightClick() {
        (mc as MinecraftAccessor).invokeRightClickMouse()
    }

    /**
     * Makes the player right click
     */
    fun leftClick() {
        (mc as MinecraftAccessor).invokeClickMouse()
    }

    private fun getItems(): List<ItemStack> {
        return (0 until mc.thePlayer.inventory.sizeInventory).map(::getStackInSlot)
    }

    private fun getStackInSlot(slot: Int): ItemStack {
        return if (mc.thePlayer.inventory == null)  mc.thePlayer.inventoryContainer.getSlot(slot).stack else mc.thePlayer.inventory.getStackInSlot(slot)
    }


    fun dropItem() {
        mc.thePlayer.dropOneItem(false)
    }

    fun interactWithEntity(entity: EntityLivingBase) {
        val packet = C02PacketUseEntity(entity, C02PacketUseEntity.Action.INTERACT)
        mc.thePlayer.sendQueue.addToSendQueue(packet)
    }

    fun getItemIndexInInventory(item: String): Int {
        for (i in 0 until mc.thePlayer.inventoryContainer.inventorySlots.size) {
            val itemStack: ItemStack = mc.thePlayer.inventoryContainer.inventory[i]
            return if (itemStack.displayName == item)  i  else -1
        }
        return -1
    }

    fun swapAndRightClick(items: String, swapBack: Boolean = true) {
        val inventory = mc.thePlayer?.inventory
        val index = getItems().subList(0, 9).indexOfFirst { item -> item.displayName.contains(items) }
        if (index != -1) {
            if (index < 0 || index > 8) {
                ChatUtils.modMessage("§cCannot swap to §f$items§c. Not in hotbar.")
                return
            }
            val prevItem = inventory?.currentItem
            if (inventory != null) {
                inventory.currentItem = index
            }
            rightClick()
            if (!swapBack) return
            if (inventory != null) {
                if (prevItem != null) {
                    inventory.currentItem = prevItem
                }
            }
        }
    }

    fun getDistance(vec1: Vec3, vec2: Vec3): Double {
        return vec1.distanceTo(vec2)
    }

    fun getDistance(e: Double, f: Double, g: Double, h: Double, i: Double, j: Double): Double {
        val d0: Double = e - h
        val d1: Double = f - i
        val d2: Double = g - j
        return sqrt(d0 * d0 + d1 * d1 + d2 * d2)
    }

    fun getPlayerCoords(): Vec3 {
        return Vec3(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ)
    }
}