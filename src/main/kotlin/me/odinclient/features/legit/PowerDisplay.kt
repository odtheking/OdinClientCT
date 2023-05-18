package me.odinclient.features.legit

import me.odinclient.OdinClient
import me.odinclient.mixin.GuiPlayerTabOverlayAccessor
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent

class PowerDisplay: OdinClient() {

    private val romanMap = hashMapOf(
        'I' to 1, 'V' to 5, 'X' to 10
    )

    private fun romanToInt(s: String): Int {
        var result = 0

        for (i in 0 until s.length - 1) {
            val current = romanMap[s[i]] ?: 0
            val next = romanMap[s[i + 1]] ?: 0

            result += if (current < next) -current else current
        }

        return result + (romanMap[s.last()] ?: 0)
    }

    @SubscribeEvent
    fun onClientTick(event: TickEvent.ClientTickEvent) {
        if (!config.powerDisplayHud.isEnabled) return
        val footer = (mc.ingameGUI?.tabList as GuiPlayerTabOverlayAccessor).footer?.unformattedText ?: return
        power = Regex("Blessing of Power (X{0,3}(IX|IV|V?I{0,3}))")
                .find(footer)
                ?.groupValues
                ?.get(1)
                ?.let { romanToInt(it) }!!

        time = if (Regex("Blessing of Time").containsMatchIn(footer)) 5 else 0
    }

    companion object {
        var power: Int = 0
        var time: Int = 0
    }
}