import Party from "../../../BloomCore/Party"
import { data } from "../../gui"
import { blacklist } from "./BlackList";
import { makeid } from "../../utils/utils";
import { partyCmdOptions, privateCmdOptions, godMod } from "../../utils/ChatUtils";
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText");

register("chat", (rank, name, message) => {
    if (!data.general.partyCmds.toggle || blacklist.igns.includes(name.toLowerCase())) return;
    partyCmdOptions(message, name)
    godMod(message, name)
}).setCriteria(/Party > (\[.+\])? ?(.+): !(.+)/);

register("chat", (rank, name, message) => {
    if (!data.general.partyCmds.toggle || blacklist.igns.includes(name.toLowerCase())) return;
    privateCmdOptions(message, name)
    godMod(message, name)
}).setCriteria(/From (\[.+\])? ?(.+): !(.+)/);

export const c = new ChatComponentText("§cYou are temporarily banned for §f 29d 23h 59m 59s §cfrom this server!\n\n§7Reason: §rCheating through the use of unfair game advantages.\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §r#" + makeid()+"\n§7Sharing your Ban ID may affect the processing of your appeal!")


register('chat', (channel, rank, name, message, num) => {
    if (!data.general.partyCmds.toggle || blacklist.igns.includes(name.toLowerCase())) return;

    if ((message.toLowerCase().startsWith("inv")) || (message.toLowerCase().startsWith("invite")) && (Party?.leader == Player.getName() || Party.leader == null)) {
        ChatLib.command(`party invite ${name}`);
    }
    let chatIncrement = 475645

    if (channel === "Party >" && message.toLowerCase().startsWith("m")) {
        ChatLib.command(`joindungeon master_catacombs ${num}`);
        new Thread(() => {
            chatIncrement++
            let currentChat = chatIncrement
            for (let i = 5; i >= 0; i--) {
                new Message(`§6[Odin§4Client] §rYou should be in a dungeon in ${i} seconds`).setChatLineId(currentChat).chat();
                Thread.sleep(1000);
            }
        }).start()
    }
    if (channel === "Party >" && message.toLowerCase().startsWith("f")) {
        ChatLib.command(`joindungeon catacombs ${num}`);
        new Thread(() => {
            chatIncrement++
            let currentChat = chatIncrement
            for (let i = 5; i >= 0; i--) {
                new Message(`§6[Odin§4Client] §rYou should be in a dungeon in ${i} seconds`).setChatLineId(currentChat).chat();
                Thread.sleep(1000);
            }
        }).start()
    }
}).setCriteria(/(Party >|From) (\[.+\])? ?(.+): !(.+) (.+)/);
