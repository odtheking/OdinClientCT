package me.odinclient.utils

import net.minecraft.client.Minecraft

object UserUtils {

    private val mc = Minecraft.getMinecraft()

    fun playSound(name: String, volume: Float, pitch: Float) {
        mc.thePlayer.playSound(name, volume, pitch)
    }

    fun alert(title: String, playSound: Boolean = true) {
        if (playSound) playSound("note.pling", 100F, 1F)
        mc.ingameGUI.displayTitle(title, "", 10, 150, 10)
    }
}