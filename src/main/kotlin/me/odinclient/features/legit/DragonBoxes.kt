package me.odinclient.features.legit

import me.odinclient.OdinClient
import me.odinclient.utils.RenderUtils
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.client.event.RenderWorldLastEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import java.awt.Color

class DragonBoxes: OdinClient() {

    private var p4done = false

    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        p4done = false
    }

    @SubscribeEvent
    fun onChatReceived(event: ClientChatReceivedEvent) {
        if (event.message.unformattedText.equals("[BOSS] Wither King: You.. again?") && config.dragonBoxes) {
            p4done = true
        }
    }

    @SubscribeEvent
    fun onRenderWorld(event: RenderWorldLastEvent) {
        if (!config.dragonBoxes) return
        // Blue
        RenderUtils.drawCustomEspBox(71.5, 25.0, 16.0, 10.0, 82.5, 25.0, Color(0, 170, 170, 255), config.dragonBoxesLineWidth, phase = config.dragonBoxesPhase)
        // Purple
        RenderUtils.drawCustomEspBox(45.5, 23.0, 13.0, 10.0, 113.5, 23.0, Color(170, 0, 170, 255), config.dragonBoxesLineWidth, phase = config.dragonBoxesPhase)
        // Green
        RenderUtils.drawCustomEspBox(7.0, 30.0, 8.0, 20.0, 80.0, 30.0, Color(85, 255, 85, 255), config.dragonBoxesLineWidth, phase = config.dragonBoxesPhase)
        // Red
        RenderUtils.drawCustomEspBox(14.5, 25.0, 13.0, 15.0, 45.5, 25.0, Color(255, 85, 85, 255), config.dragonBoxesLineWidth, phase = config.dragonBoxesPhase)
        // Orange
        RenderUtils.drawCustomEspBox(72.0, 30.0, 8.0, 20.0, 47.0, 30.0, Color(255, 170, 0, 255), config.dragonBoxesLineWidth, phase = config.dragonBoxesPhase)
    }

}