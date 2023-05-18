package me.odinclient.utils

import net.minecraft.client.Minecraft
import net.minecraft.scoreboard.Score
import net.minecraft.scoreboard.ScorePlayerTeam
import java.util.*

object FuncUtils {

    private val mc = Minecraft.getMinecraft()
    private var isInM7: Boolean = false

    fun stripColorCodes(string: String): String {
        return string.replace("§.".toRegex(), "")
    }

    fun getLines(): MutableList<String> {
        val scoreboard = mc.thePlayer.worldScoreboard
        val sidebarObjective = scoreboard.getObjectiveInDisplaySlot(1)
        val scores: List<Score> = ArrayList(scoreboard.getSortedScores(sidebarObjective))
        val lines: MutableList<String> = ArrayList()
        for (i in scores.indices.reversed()) {
            val score = scores[i]
            val scoreplayerteam1 = scoreboard.getPlayersTeam(score.playerName)
            val line = ScorePlayerTeam.formatPlayerName(scoreplayerteam1, score.playerName)
            lines.add(line)
        }
        return lines
    }

    fun inM7(): Boolean {
        if (!isInSkyblock()) {
            isInM7 = false
            return false
        }
        val lines = getLines()
        if (lines.size < 4) {
            isInM7 = false
            return false
        }
        val line = lines.getOrNull(3)
        var unformattedText = line?.replace(Regex("\\p{So}|\\p{Sk}"), "")
        if (unformattedText != null) {
            unformattedText = stripColorCodes(unformattedText)
        }
        if (unformattedText == "  The Catacombs (M7)") {
            isInM7 = true
            return true
        }
        isInM7 = false
        return false
    }

    /**
     * Returns the current floor level of the player in the Catacombs.
     * Returns an empty string if the player is not in Skyblock, or if
     * the Catacombs floor level cannot be determined.
     */
    fun getCurrentCatacombsFloor(): String {
        if (!isInSkyblock()) {
            return ""
        }

        // Get the third line of the scoreboard
        val lines = getLines()
        if (lines.size < 4) {
            return ""
        }
        val line = lines[3]

        // Strip any formatting codes from the line
        var unformattedText = line.replace(Regex("\\p{So}|\\p{Sk}"), "")
        unformattedText = stripColorCodes(unformattedText)

        // Extract the floor number using a regular expression with a capture group
        val floorPattern = Regex(".*\\((\\w+)\\)")
        val matchResult = floorPattern.matchEntire(unformattedText)

        return matchResult?.groupValues?.get(1) ?: ""
    }


    fun isInSkyblock(): Boolean {
        if ((mc.theWorld != null) && (mc.thePlayer != null)) {
            if (mc.isSingleplayer || mc.thePlayer.clientBrand == null ||
                !mc.thePlayer.clientBrand.lowercase(Locale.getDefault()).contains("hypixel")
            ) {
                return false
            }
            if (mc.thePlayer.worldScoreboard.getObjectiveInDisplaySlot(1) == null)
                return false
            return stripColorCodes(mc.thePlayer.worldScoreboard.getObjectiveInDisplaySlot(1).displayName).contains("SKYBLOCK")
        }
        return false
    }
}