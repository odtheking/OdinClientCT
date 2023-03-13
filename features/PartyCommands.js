import Party from "../../BloomCore/Party"
import { data } from "../stuff/guidk"
import { blacklist } from "./BlackList";
import { partyCmdOptions, privateCmdOptions, godMod } from "../stuff/ChatUtils";


register("chat", (rank, name, message) => {
    if (!data.legit.options[0] || blacklist.igns.includes(name.toLowerCase())) return;
    partyCmdOptions(message, name)
    godMod(message, name)
}).setCriteria(/Party > (\[.+\])? ?(.+): !(.+)/);

register("chat", (rank, name, message) => {
    if (!data.legit.options[0] || blacklist.igns.includes(name.toLowerCase())) return;
    privateCmdOptions(message, name)
    godMod(message, name)
}).setCriteria(/From (\[.+\])? ?(.+): !(.+)/);


register('chat', (channel, rank, name, message, num) => {
    if (!data.legit.options[0] || blacklist.igns.includes(name.toLowerCase())) return;

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
