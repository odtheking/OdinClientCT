package me.odinclient.features.auto

import me.odinclient.OdinClient
import me.odinclient.utils.ChatUtils
import me.odinclient.utils.PlayerUtils
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent.ClientTickEvent


class AutoMask: OdinClient() {

    private var spiritProc = 0L
    private var bonzoProc = 0L
    private val spiritCooldown = 30000
    private val bonzoCooldown = 180000

    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        this.spiritProc = 0
        this.bonzoProc = 0
    }

    @SubscribeEvent
    fun onClientChatReceived(event: ClientChatReceivedEvent) {
        if (!config.autoMask) return
        val regex = Regex("^(Second Wind Activated!)? ?Your (.+) saved your life!\$")
        when (regex.find(event.message.unformattedText)?.groupValues?.get(2)) {
            "Spirit Mask" -> spiritProc = System.currentTimeMillis()
            "Bonzo's Mask" -> bonzoProc = System.currentTimeMillis()
            "⚚ Bonzo's Mask" -> bonzoProc = System.currentTimeMillis()
        }
    }

    @SubscribeEvent
    fun onTick(event: ClientTickEvent) {
        if (!config.autoMask) return
        var itemIndex = -1
        val currentTime = System.currentTimeMillis()
        if (currentTime - spiritProc >= spiritCooldown) {
            itemIndex = PlayerUtils.getItemIndexInInventory("Spirit Mask")
        } else if (currentTime - bonzoProc >= bonzoCooldown) {
            itemIndex = PlayerUtils.getItemIndexInInventory("Bonzo's Mask")
            if (itemIndex == -1) {
                itemIndex = PlayerUtils.getItemIndexInInventory("⚚ Bonzo's Mask")
            }
        }
        if (itemIndex != -1) {
            mc.playerController.windowClick(mc.thePlayer.inventoryContainer.windowId, itemIndex, 0, 2, mc.thePlayer)
            mc.playerController.windowClick(mc.thePlayer.inventoryContainer.windowId, 5, 0, 2, mc.thePlayer)
            mc.playerController.windowClick(mc.thePlayer.inventoryContainer.windowId, itemIndex, 0, 2, mc.thePlayer)
        } else {
            ChatUtils.modMessage("Masks are on cooldown or no mask was found!")
        }
    }
}


