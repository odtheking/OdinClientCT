package me.odinclient.features.auto

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import me.odinclient.OdinClient
import me.odinclient.utils.ChatUtils
import me.odinclient.utils.PlayerUtils
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent

class AutoUlt: OdinClient() {


    private var firstLaser = false
    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        firstLaser = false
    }

    @SubscribeEvent
    fun ultDetect(event: ClientChatReceivedEvent) {
        when (event.message.unformattedText) {
            "[BOSS] Maxor: YOU TRICKED ME!", "[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!" -> {
                if (firstLaser) return
                frenzyAndUlt()
                firstLaser = true
            }
            "[BOSS] Goldor: You have done it, you destroyed the factory…" -> {
                ChatUtils.modMessage("§2Goldor time zzz")
                PlayerUtils.dropItem()
            }
            "[BOSS] Sadan: My giants! Unleashed!" -> {
                GlobalScope.launch {
                    delay(1000L)
                    ChatUtils.modMessage("§2Giants incoming")
                    PlayerUtils.dropItem()
                }
            }
        }
    }

    private fun frenzyAndUlt() {
        ChatUtils.modMessage("§2Frenzy soon... ULT TIME!")
        PlayerUtils.dropItem()
    }

}