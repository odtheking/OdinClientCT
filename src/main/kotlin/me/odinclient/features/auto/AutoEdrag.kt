package me.odinclient.features.auto

import me.odinclient.OdinClient
import me.odinclient.utils.ChatUtils.modMessage
import me.odinclient.utils.ChatUtils.sendCommand
import me.odinclient.utils.PlayerUtils.getItemIndexInInventory
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent

class AutoEdrag: OdinClient() {

    var p5Start = false
    var shouldOpen = true

    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        p5Start= false
    }
    @SubscribeEvent
    fun playerReady(event: ClientChatReceivedEvent) {
        val message = event.message.unformattedText
        if (message == "[BOSS] Wither King: You.. again?") {
            p5Start = true
        } else if (message == "Pets are disabled while spectating!") {
            shouldOpen = false
        }
    }

    @SubscribeEvent
    fun edrag(event: TickEvent.ClientTickEvent) {
        if (!config.autoEdrag || !p5Start) return
        val container = mc.thePlayer.inventoryContainer

        if (container == null || shouldOpen) {
            sendCommand("pet")
            modMessage("Trying to equip Ender Dragon pet")
            return
        }

        if ((container?.toString()?.matches(Regex("\\(\\d/\\d\\)? ?Pets")) == true)) {
            val edragIndex = getItemIndexInInventory("§.[Lvl \\d+] §.Ender Dragon")
            if (edragIndex == -1) {
                mc.thePlayer.closeScreen()
                modMessage("No Ender Dragon pet found.")
            } else {
                container.slotClick(edragIndex, 0, 0, mc.thePlayer)
                p5Start = false
            }
        }

    }


}




