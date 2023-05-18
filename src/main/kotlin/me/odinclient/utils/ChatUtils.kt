package me.odinclient.utils

import net.minecraft.client.Minecraft
import net.minecraft.util.ChatComponentText
import net.minecraftforge.client.ClientCommandHandler

object ChatUtils {

    private val mc = Minecraft.getMinecraft()

    fun eightBall(): String {
        val responses = arrayOf(
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        )
        return responses.random()
    }

    fun catPics(): String {
        val pics = arrayOf(
            "https://cdn.discordapp.com/attachments/910078453481627678/1055577574765502484/Z.png cat image no way",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770049715122186/cat-1045782__340.png that is a cat image??",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770156028145664/communityIcon_x4lqmqzu1hi81.png wtf this is a cat image??",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770278573117520/cat-1285634_960_720.png YO this is insane",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770366892593172/cat-323262__340.png this is so cool man",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770426518818816/cat-1455468__340.png :yes:",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770589262008380/cat-300572__340.png o/ <3",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770703900725318/cat-1046544__340.png PEEPOAWESOME",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770788248158288/cat-914110__340.png :fire:",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055770861044519012/cat-5778777__340.png no way he just did that",
            "https://cdn.discordapp.com/attachments/984220286666813460/1056647474221158410/image.png odinclient is so fucking cool",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055771007383769179/cat-5337501__340.png I love cats!",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055771075302137896/tabby-5946499__340.png try the help command for more cool features!",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055771214418804806/cat-6748193__340.png cat feature in a skyblock mod??",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055771282144247828/cat-7094808__340.png i have no idea what to write",
            "https://cdn.discordapp.com/attachments/910078453481627678/1055772251246559252/cat-6838844__340.png another cat!",
            "https://cdn.discordapp.com/attachments/984220286666813460/1056647167319752775/cheese_cat.png AAAAAAAAAA",
            "https://cdn.discordapp.com/attachments/984220286666813460/1056647167609147453/da5eac86fe994bc1ba23460d6273f31c.png skyblock is such a good game trust me",
            "https://cdn.discordapp.com/attachments/984220286666813460/1056647168468979732/juicecat.png is the cat drinking??",
            "https://cdn.discordapp.com/attachments/984220286666813460/1056647168762597467/stare.png #votefordanta",
            "https://cdn.discordapp.com/attachments/917006226133504061/1045399878865518684/IMG_0319.jpg WAIT THATS A DOG"
        )
        return pics.random()
    }
    fun flipCoin(): String {
        return if (Math.random() < 0.5) {
            "heads"
        } else {
            "tails"
        }
    }
    fun rollDice(max: Int): Int {
        return (1..max).random()
    }


    fun sendChatMessage(message: String) {
        mc.thePlayer.sendChatMessage(message)
    }

    fun sendCommand(text: String, clientSide: Boolean = false) {
        if (clientSide) ClientCommandHandler.instance.executeCommand(mc.thePlayer, "/$text")
        else sendChatMessage("/$text")
    }

    fun modMessage(message: String) {
        mc.thePlayer?.addChatMessage(ChatComponentText("§6[Odin§4Client] §r$message"))
    }

    fun guildMessage(message: String) {
        sendCommand("gc $message")
    }

    fun partyMessage(message: String) {
        sendCommand("pc $message")
    }

    fun privateMessage(message: String) {
        sendCommand("r $message")
    }
}