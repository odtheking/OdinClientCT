package me.odinclient

import cc.polyfrost.oneconfig.utils.commands.CommandManager
import me.odinclient.commands.OdinCommand
import me.odinclient.config.OdinConfig
import me.odinclient.features.auto.*
import me.odinclient.features.general.BrokenHype
import me.odinclient.features.general.FlareTimer
import me.odinclient.features.legit.*
import me.odinclient.features.qol.DioriteFucker
import me.odinclient.features.qol.ESP
import me.odinclient.font.GlyphPageFontRenderer
import me.odinclient.utils.LocationUtils
import net.minecraft.client.Minecraft
import net.minecraftforge.common.MinecraftForge
import net.minecraftforge.fml.common.Mod
import net.minecraftforge.fml.common.Mod.EventHandler
import net.minecraftforge.fml.common.event.FMLInitializationEvent

@Mod(modid = "OdinClient", version = "1.0.0")
open class OdinClient {

    @EventHandler
    fun init(event: FMLInitializationEvent) {

        config = OdinConfig()

        registerEvents(
            this, DragonBoxes(), DragonTimer(), AutoLeap(), PowerDisplay(), GuildCommands(), PartyCommands(),
            AutoMask(), ESP(), AutoShield(), BrokenHype(), FlareTimer(),
            DioriteFucker(), AutoReady(), TermAC(), LocationUtils
        )
        registerCommands(OdinCommand())
    }

    private fun registerEvents(vararg events: Any) {
        for (event in events) {
            MinecraftForge.EVENT_BUS.register(event)
        }
    }

    private fun registerCommands(vararg commands: Any) {
        for (command in commands) {
            CommandManager.register(command)
        }
    }

    companion object {
        const val MOD_ID = "OdinClient"

        val mc: Minecraft = Minecraft.getMinecraft()
        lateinit var config: OdinConfig
        val font: GlyphPageFontRenderer = GlyphPageFontRenderer.create("Open Sans", 25, false, false, false)
    }

}
