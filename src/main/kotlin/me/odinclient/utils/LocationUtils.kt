package me.odinclient.utils

import net.minecraft.client.Minecraft
import net.minecraft.client.network.NetHandlerPlayClient
import net.minecraft.util.Vec3
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent
import net.minecraftforge.fml.common.network.FMLNetworkEvent
import kotlin.String

object LocationUtils {

    private val mc = Minecraft.getMinecraft()

    var onHypixel: Boolean = false
    var inSkyblock: Boolean = false
    var inDungeons = false
        get() = inSkyblock && field
    var dungeonFloor: String? = null

    /**
     * Keeps track of elapsed ticks, gets reset at 20
     * */
    private var tickRamp = 0

    @SubscribeEvent
    fun onTick(event: TickEvent.ClientTickEvent) {
        updateFromScoreboard()
        if (event.phase != TickEvent.Phase.START) return
        tickRamp++
        if (tickRamp % 20 != 0) return
        if (mc.thePlayer != null) {

            if (!inSkyblock) {
                inSkyblock = onHypixel && mc.theWorld.scoreboard.getObjectiveInDisplaySlot(1)
                    ?.let { ScoreboardUtils.cleanSB(it.displayName).contains("SKYBLOCK") } ?: false
            }

            // If alr known that in dungeons don't update the value. It does get reset to false on world change.
            if (!inDungeons) {
                inDungeons = inSkyblock && ScoreboardUtils.sidebarLines.any {
                    ScoreboardUtils.cleanSB(it).run {
                        (contains("The Catacombs") && !contains("Queue")) || contains("Dungeon Cleared:")
                    }
                }
            }
        }
        tickRamp = 0

    }

    @SubscribeEvent
    fun onDisconnect(event: FMLNetworkEvent.ClientDisconnectionFromServerEvent) {
        onHypixel = false
        inSkyblock = false
        inDungeons = false
        dungeonFloor = null
    }

    @SubscribeEvent
    fun onWorldChange(@Suppress("UNUSED_PARAMETER") event: WorldEvent.Unload) {
        inDungeons = false
        inSkyblock = false
        tickRamp = 18
        dungeonFloor = null
    }

    /**
     * Taken from [SBC](https://github.com/Harry282/Skyblock-Client/blob/main/src/main/kotlin/skyblockclient/utils/LocationUtils.kt)
     */
    @SubscribeEvent
    fun onConnect(event: FMLNetworkEvent.ClientConnectedToServerEvent) {
        onHypixel = mc.runCatching {
            !event.isLocal && ((thePlayer?.clientBrand?.lowercase()?.contains("hypixel")
                ?: currentServerData?.serverIP?.lowercase()?.contains("hypixel")) == true)
        }.getOrDefault(false)
    }


    /**
     * Returns the current area from the tab list info.
     * If no info can be found return null.
     */
    private fun getArea(): String? {
        if (!inSkyblock) return null
        val nethandlerplayclient: NetHandlerPlayClient = mc.thePlayer?.sendQueue ?: return null
        val list = nethandlerplayclient.playerInfoMap ?: return null
        var area: String? = null
        var extraInfo: String? = null
        for (entry in list) {
            //  "Area: Hub"
            val areaText = entry?.displayName?.unformattedText ?: continue
            if (areaText.startsWith("Area: ")) {
                area = areaText.substringAfter("Area: ")
                if (!area.contains("Private Island")) break
            }
            if (areaText.contains("Owner:")){
                extraInfo = areaText.substringAfter("Owner:")
            }

        }
        return if (area == null)
            null
        else
            area + (extraInfo ?: "")
    }

    private fun updateFromScoreboard() {
        ScoreboardUtils.sidebarLines.forEach {
            val line = ScoreboardUtils.cleanSB(it)
            if (dungeonFloor == null && line.contains("The Catacombs (")) {
                dungeonFloor = line.substringAfter("(").substringBefore(")")

            }
        }
    }

    private fun isCoordinateInsideBox(coord: Vec3, corner1: Vec3, corner2: Vec3): Boolean {
        val min = Vec3(
            minOf(corner1.xCoord, corner2.xCoord),
            minOf(corner1.yCoord, corner2.yCoord),
            minOf(corner1.zCoord, corner2.zCoord)
        )
        val max = Vec3(
            maxOf(corner1.xCoord, corner2.xCoord),
            maxOf(corner1.yCoord, corner2.yCoord),
            maxOf(corner1.zCoord, corner2.zCoord)
        )
        return  coord.xCoord >= min.xCoord && coord.xCoord <= max.xCoord
                && coord.yCoord >= min.yCoord && coord.yCoord <= max.yCoord
                && coord.zCoord >= min.zCoord && coord.zCoord <= max.zCoord
    }

    fun getPhase(): String? {
        val corner1 = Vec3(-8.0, 254.0, 147.0)
        val corner2 = Vec3(134.0, 0.0, -8.0)
        var inPhase: String? = null
        if (dungeonFloor != "F7" && dungeonFloor != "M7" || !inDungeons || !isCoordinateInsideBox(PlayerUtils.getPlayerCoords(), corner1, corner2)) return null
        inPhase = if (mc.thePlayer.posY > 210) {
            "p1"
        } else if (mc.thePlayer.posY > 155) {
            "p2"
        } else if (mc.thePlayer.posY > 100) {
            "p3"
        } else if (mc.thePlayer.posY > 45) {
            "p4"
        } else {
            "p5"
        }
        return inPhase
    }
}