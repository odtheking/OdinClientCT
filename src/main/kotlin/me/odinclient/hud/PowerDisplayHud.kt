package me.odinclient.hud

import cc.polyfrost.oneconfig.hud.TextHud
import me.odinclient.features.legit.PowerDisplay

class PowerDisplayHud: TextHud(true) {

    override fun getLines(lines: MutableList<String>?, example: Boolean) {
        if (example) {
            lines?.add(0, "§cPower§r: §a69")
            lines?.add(1, "§cT§6i§am§1e§r: §a420")
        } else {
            if (PowerDisplay.power != 0) {
                lines?.add(0, "§cPower§r: §a${PowerDisplay.power}")
            }
            if (PowerDisplay.time != 0) {
                lines?.add(1, "§cT§6i§am§1e§r: §a${PowerDisplay.time}")
            }
        }
    }
}