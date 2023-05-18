package me.odinclient.features.general

import me.odinclient.OdinClient
import me.odinclient.utils.UserUtils
import net.minecraftforge.event.entity.living.LivingDeathEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent

class BrokenHype: OdinClient() {

    private var trackerKills = 0
    private var trackerXP = 0.0
    private val witherBlades = arrayOf("HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED")

    @SubscribeEvent
    fun onLivingDeath(event: LivingDeathEvent) {
        if (
            !config.brokenHype ||
            mc.thePlayer.heldItem == null
            /* || !inDungeons */ ||
            !witherBlades.contains(mc.thePlayer.heldItem.serializeNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getString("id"))
        ) return


        val newKills = mc.thePlayer.heldItem.serializeNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getInteger("stats_book")
        val newXP = mc.thePlayer.heldItem.serializeNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp")

        if (trackerKills == newKills) return

        if (trackerXP == newXP && config.brokenHypeShowTitle) UserUtils.alert("&l&5HYPE BROKEN!", config.brokenHypePlaySound)

        trackerKills = newKills
        trackerXP = newXP
    }
}