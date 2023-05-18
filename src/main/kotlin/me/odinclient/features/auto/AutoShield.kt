package me.odinclient.features.auto

import me.odinclient.OdinClient
import me.odinclient.mixin.MinecraftAccessor
import me.odinclient.utils.ChatUtils
import net.minecraft.item.ItemStack
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent.ClientTickEvent

class AutoShield: OdinClient() {

    private var step = 0

    val witherSwords = arrayOf("Astraea", "Hyperion", "Valkyrie", "Scylla")

    @SubscribeEvent
    fun onTick(event: ClientTickEvent) {
        step++
        if (step > 100) step = 0
        if (step == 100) {
            if (config.autoShield) {
                // if (Skyblock.area != "Dungeon") return
                if (mc.thePlayer.health >= 40) return
                var found = false
                for (sword in witherSwords) {
                    val i = mc.thePlayer?.inventory?.sizeInventory ?: mc.thePlayer.inventoryContainer!!.inventorySlots.size
                    val invItems = (0 until i).map(::getStackInSlot)
                    val j = invItems.take(9).indexOfFirst { item -> item.displayName?.contains(sword) == true }
                    if (j != -1) {
                        if (j < 0 || j > 8) {
                            ChatUtils.modMessage("§cCannot swap. Not in hotbar.")
                            return
                        }
                        val previousItem = mc.thePlayer?.inventory?.currentItem
                        mc.thePlayer?.inventory?.currentItem = j
                        (mc as MinecraftAccessor).invokeRightClickMouse()
                        mc.thePlayer?.inventory?.currentItem = previousItem
                        found = true
                        break
                    }
                }
                if (!found) {
                    ChatUtils.modMessage("No wither sword was found in your hotbar")
                }
            }
        }
    }

    private fun getStackInSlot(slot: Int): ItemStack {
        return if (mc.thePlayer?.inventory == null)
            mc.thePlayer?.inventoryContainer!!.getSlot(slot).stack
        else mc.thePlayer?.inventory!!.getStackInSlot(slot)
    }

}