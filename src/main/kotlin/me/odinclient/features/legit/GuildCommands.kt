package me.odinclient.features.legit
import me.odinclient.OdinClient
import me.odinclient.utils.ChatUtils
import net.minecraftforge.client.event.ClientChatReceivedEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent


class GuildCommands: OdinClient() {


    @SubscribeEvent
    fun guild(event: ClientChatReceivedEvent) {
        if (!config.guildCommands) return

        val regex = Regex("Guild > (\\[.+])? ?(.+) (\\[.+])?: ?!(.+)")
        val match = regex.find(event.message.unformattedText) ?: return

        val ign = match.groupValues[2]
        val msg = match.groupValues[4].lowercase()

        when (msg.split(" ")[0]) {
            "help" -> ChatUtils.guildMessage("[OdinClient] available commands are: odin, boop, 8ball, cf, fragbot, cat, dice (max)")
            "odin" -> ChatUtils.guildMessage("OdinClient! https://discord.gg/2nCbC9hkxT")
            "boop" -> ChatUtils.sendChatMessage("/msg $ign boop")
            "cf" -> ChatUtils.guildMessage(ChatUtils.flipCoin())
            "8ball" -> ChatUtils.guildMessage(ChatUtils.eightBall())
            "cat" -> ChatUtils.guildMessage(ChatUtils.catPics())
            "fragbot" -> ChatUtils.guildMessage("Fragbot mod is currently: inlimbo")
        }
    }

    @SubscribeEvent
    fun guildBridge(event: ClientChatReceivedEvent) {
        if (!config.guildCommands) return

        val regex = Regex("Guild > (\\[.+\\])? ?(.+) (\\[.+\\])?: ?(.+) > !(.+)")
        val match = regex.find(event.message.unformattedText) ?: return

        val ign = match.groupValues[2]
        val msg = match.groupValues[4].lowercase()

        when (msg.split(" ")[0]) {
            "help" -> ChatUtils.guildMessage("[OdinClient] available commands are: odin, boop, 8ball, cf, fragbot, cat, dice (max)")
            "odin" -> ChatUtils.guildMessage("OdinClient! https://discord.gg/2nCbC9hkxT")
            "boop" -> ChatUtils.sendChatMessage("/msg $ign boop")
            "cf" -> ChatUtils.guildMessage(ChatUtils.flipCoin())
            "8ball" -> ChatUtils.guildMessage(ChatUtils.eightBall())
            "cat" -> ChatUtils.guildMessage(ChatUtils.catPics())
            "fragbot" -> ChatUtils.guildMessage("Fragbot mod is currently: inlimbo")
        }
    }


    @SubscribeEvent
    fun dice(event: ClientChatReceivedEvent) {
        if (!config.guildCommands) return

        val regex = Regex("Guild > (\\[.+\\])? ?(.+) (\\[.+\\])?: !(.+) (.+)")
        val match = regex.find(event.message.unformattedText) ?: return

        val msg = match.groupValues[4].lowercase()
        val max = match.groupValues[5].toInt()

        if (msg.startsWith("dice")) {
            val result = ChatUtils.rollDice(max)
            ChatUtils.guildMessage("The dice roll result is: $result")
        }
    }

    @SubscribeEvent
    fun bridgeDice(event: ClientChatReceivedEvent) {
        if (!config.guildCommands) return

        val regex = Regex("Guild > (\\[.+\\])? ?(.+) (\\[.+\\])?: ?(.+) > !(.+) (.+)")
        val match = regex.find(event.message.unformattedText) ?: return

        val msg = match.groupValues[4].lowercase()
        val max = match.groupValues[5].toInt()

        if (msg.startsWith("dice")) {
            val result = ChatUtils.rollDice(max)
            ChatUtils.guildMessage("The dice roll result is: $result")
        }
    }

    @SubscribeEvent
    fun gm(event: ClientChatReceivedEvent) {
        if (!config.guildGM) return

        val regex = Regex("Guild > (\\[.+\\])? ?(.+) (\\[.+\\])?: ?(.+)")
        val match = regex.find(event.message.unformattedText) ?: return

        val msg = match.groupValues[4].lowercase()
        val ign = match.groupValues[2]

        if (msg.startsWith("gm")) {
            ChatUtils.guildMessage("gm $ign")
        } else if (msg.startsWith("gn")) {
            ChatUtils.guildMessage("gn $ign")
        }
    }

    @SubscribeEvent
    fun gmBridge(event: ClientChatReceivedEvent) {
        if (!config.guildGM) return

        val regex = Regex("Guild > (\\[.+\\])? ?(.+) (\\[.+\\])?: ?(.+) > (.+)")
        val match = regex.find(event.message.unformattedText) ?: return

        val msg = match.groupValues[5].lowercase()
        val ign = match.groupValues[4]

        if (msg.startsWith("gm")) {
            ChatUtils.guildMessage("gm $ign")
        } else if (msg.startsWith("gn")) {
            ChatUtils.guildMessage("gn $ign")
        }
    }
}