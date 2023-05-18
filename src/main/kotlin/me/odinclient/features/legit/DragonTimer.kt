package me.odinclient.features.legit

import me.odinclient.OdinClient
import me.odinclient.events.SpawnParticleEvent
import me.odinclient.utils.RenderUtils
import net.minecraftforge.client.event.RenderWorldLastEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import java.util.*

class DragonTimer: OdinClient() {

    private val dragonColors = listOf("Orange", "Red", "Green", "Blue", "Purple")
    private val colorCodes = listOf("6", "c", "a", "b", "5")

    var times: MutableMap<String, Long> = mutableMapOf(
        "orange" to 0L,
        "red" to 0L,
        "green" to 0L,
        "blue" to 0L,
        "purple" to 0L
    )
    private var colors = mapOf(
        "orange" to mapOf("x" to listOf(82, 88), "y" to listOf(15, 22), "z" to listOf(53, 59)),
        "red" to mapOf("x" to listOf(24, 30), "y" to listOf(15, 22), "z" to listOf(56, 62)),
        "green" to mapOf("x" to listOf(23, 29), "y" to listOf(15, 22), "z" to listOf(91, 97)),
        "purple" to mapOf("x" to listOf(53, 59), "y" to listOf(15, 22), "z" to listOf(122, 128)),
        "blue" to mapOf("x" to listOf(82, 88), "y" to listOf(15, 22), "z" to listOf(91, 97))
    )
    private var dragonSpawnTime = 5000
    private var textLocations = listOf(
        intArrayOf(84, 18, 56),
        intArrayOf(27, 18, 60),
        intArrayOf(26, 18, 95),
        intArrayOf(84, 18, 95),
        intArrayOf(57, 18, 125)
    )

    @SubscribeEvent
    fun onSpawnParticleEvent(event: SpawnParticleEvent) {
        if (!config.dragonTimer) return

        colors.keys.forEach{c ->
            if (checkParticle(event, c) && times[c] == 0L) {
                times[c] = System.currentTimeMillis()
            }
        }
    }

    private fun checkParticle(event: SpawnParticleEvent, color: String): Boolean {
        val (x, y, z) = listOf(event.x, event.y, event.z)
        return  x >= colors[color]!!["x"]!![0] && x <= colors[color]!!["x"]!![1] &&
                y >= colors[color]!!["y"]!![0] && y <= colors[color]!!["y"]!![1] &&
                z >= colors[color]!!["z"]!![0] && z <= colors[color]!!["z"]!![1]
    }

    @SubscribeEvent
    fun onRenderWorld(event: RenderWorldLastEvent) {
        if (!config.dragonTimer) return
        val currentTime: Long = System.currentTimeMillis()
        dragonColors.forEachIndexed { index, dragonColor ->
            val time = times[dragonColor]
            if (time == 0L || time == null) return
            if (currentTime - time < dragonSpawnTime) {
                val spawnTime = dragonSpawnTime - (currentTime - time)
                val colorCode = when {
                    spawnTime <= 1000 -> "§c"
                    spawnTime <= 3000 -> "§e"
                    else -> "§a"
                }
                RenderUtils.drawFontStringInWorld(
                    "§${colorCodes[index]}${dragonColor} spawning in: ${colorCode}${spawnTime} ms",
                    textLocations[index][0].toFloat(),
                    textLocations[index][1].toFloat(),
                    textLocations[index][2].toFloat(),
                    partialTicks = event.partialTicks,
                    scale = if (config.dragonTimerScaleWithDist) 1.0 else config.dragonTimerTextScale.toDouble() / 10.0,
                    shadow = config.dragonTimerDrawStringShadow,
                    increase = config.dragonTimerScaleWithDist
                )
            } else {
                times[dragonColor] = 0L
            }

        }
    }

    @SubscribeEvent
    fun onWorldLoad(event: WorldEvent.Load) {
        times.replaceAll { _, _ -> 0L }
    }
}