package me.odinclient.features.auto

import me.odinclient.OdinClient
import me.odinclient.utils.ChatUtils
import me.odinclient.utils.PlayerUtils
import net.minecraft.item.ItemStack
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.client.event.GuiScreenEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent

class AutoLeap: OdinClient() {


    // Maybe works maybe not idk didn't test :(

    private var opened = false
    private var target: String? = null

    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        opened = false
        target = null
    }

    @SubscribeEvent
    fun onClientChatReceived(event: ClientChatReceivedEvent) {
        if (!config.autoLeap) return
        mc.thePlayer?.inventory
        val playerName = Regex("^Party > ?(?:\\[.+\\])? (.{0,16}): !tp ?(?:.+)?").find(event.message.unformattedText)?.groupValues?.get(1)
        if (playerName == mc.thePlayer?.name?.lowercase()) return
        PlayerUtils.swapAndRightClick("Leap")
        opened = true
        target = playerName

    }

    private fun getItems(): List<ItemStack> {
        return (0 until mc.thePlayer.inventory.sizeInventory).map(::getStackInSlot)
    }

    private fun getStackInSlot(slot: Int): ItemStack {
        return if (mc.thePlayer.inventory == null)  mc.thePlayer.inventoryContainer.getSlot(slot).stack else mc.thePlayer.inventory.getStackInSlot(slot)
    }

    @SubscribeEvent
    fun onGuiDrawBackGround(event: GuiScreenEvent.BackgroundDrawnEvent) {
        if (!opened || !config.autoLeap) return
        // if (Skyblock.area != "Dungeon") return
        val container = mc.thePlayer.inventoryContainer
        if (target == null || container.inventory.toString() != "Spirit Leap") return
        val items = getItems()
        val head = items.indexOfFirst { item -> item.displayName.contains(target!!) }
        mc.playerController.windowClick(container.windowId, head, 2, 3, mc.thePlayer)
        ChatUtils.modMessage("§rLeaped to $target")
        opened = false
        target = null
    }
}