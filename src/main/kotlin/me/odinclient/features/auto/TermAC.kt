package me.odinclient.features.auto

import me.odinclient.OdinClient
import me.odinclient.utils.PlayerUtils.rightClick
import net.minecraftforge.client.event.RenderWorldLastEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent

class TermAC: OdinClient() {
    private var nextClick = Double.MIN_VALUE
    @SubscribeEvent
    fun onRenderWorldLast(event: RenderWorldLastEvent) {
        if (!config.terminatorAC || mc.thePlayer?.heldItem?.displayName?.contains("Terminator") != true || !mc.gameSettings.keyBindUseItem.isKeyDown) return
        val nowMillis = System.currentTimeMillis()
        if (nowMillis < nextClick) return
        nextClick = nowMillis + 35L + (Math.random() * 30)
        rightClick()
    }
}