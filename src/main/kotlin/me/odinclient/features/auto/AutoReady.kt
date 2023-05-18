package me.odinclient.features.auto

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import me.odinclient.OdinClient
import me.odinclient.utils.PlayerUtils
import net.minecraft.client.gui.inventory.GuiChest
import net.minecraft.entity.EntityLivingBase
import net.minecraft.inventory.ContainerChest
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.client.event.GuiOpenEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent

class AutoReady: OdinClient() {


    private var tped = false
    private var click = false
    private var playerReady = false

    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        tped = false
        click = false
        playerReady = false
    }

    @OptIn(DelicateCoroutinesApi::class)
    @SubscribeEvent
    fun onClientTick(event: TickEvent.ClientTickEvent) {
        //if (!data.auto.options[1]) return@register
        //if (Skyblock.area != "Dungeon") return@register
        val mort = mc.theWorld?.loadedEntityList?.find { it.name.contains("Mort") } as? EntityLivingBase ?: return
        val x = mc.thePlayer.posX
        val y = mc.thePlayer.posY
        val z = mc.thePlayer.posZ
        val mx = mort.posX
        val my = mort.posY
        val mz = mort.posZ

        val dist = PlayerUtils.getDistance(x, y, z, mx, my, mz)
        if (dist <= 5) {
            PlayerUtils.interactWithEntity(mort)
            click = true

            GlobalScope.launch {
                delay(4000L)
                if (playerReady) return@launch
                mc.thePlayer.closeScreen()
                PlayerUtils.interactWithEntity(mort)
            }
        }
        if (tped) return
        PlayerUtils.swapAndRightClick("Aspect of the Void")
        tped = true

    }

    @SubscribeEvent
    fun playerReady(event: ClientChatReceivedEvent) {
        val message = event.message.unformattedText
        if (message == "${mc.thePlayer.name} is now ready!") {
            playerReady = true
            mc.thePlayer.closeScreen()
        }
    }

    @SubscribeEvent
    fun onGuiOpen(event: GuiOpenEvent) {
        if (playerReady || event.gui !is GuiChest) return
        val playerName = mc.thePlayer?.name.toString()
        val container = (event.gui as GuiChest).inventorySlots
        if (container is ContainerChest) {
            val chestName = container.lowerChestInventory.displayName.unformattedText

            when {
                chestName.startsWith("Start Dungeon?") -> {
                    val index = PlayerUtils.getItemIndexInInventory("Start Dungeon?")
                    container.slotClick(index, 0, 0, mc.thePlayer)
                }

                chestName.startsWith("Catacombs -") -> {
                    val index = PlayerUtils.getItemIndexInInventory(playerName)
                    container.slotClick(index, 0, 0, mc.thePlayer)
                }
            }
        }
    }

/*
    @SubscribeEvent
    fun guiReady(event: TickEvent.ClientTickEvent) {
        if (playerReady) return
        val container = mc.thePlayer?.openContainer
        val playerName = mc.thePlayer?.name.toString()
        when (container.toString()) {
            "Start Dungeon?" -> {
                val index = PlayerUtils.getItemIndexInInventory("Start Dungeon?")
                container?.slotClick(index, 0, 0, mc.thePlayer)
            }
            "Catacombs - " -> {
                val index = PlayerUtils.getItemIndexInInventory(playerName)
                container?.slotClick(index, 0, 0, mc.thePlayer)
            }

        }
    }
 */
}


