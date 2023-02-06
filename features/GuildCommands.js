import request from "../../requestV2"
import { data } from "../stuff/guidk"
import { modMessage, partyMessage, privateMessage } from "../utils";

// Guild Commands

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
  var index = Math.floor(Math.random() * responses.length)

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
//guild chat



let godmod = false

register("chat", (rank, name, guildrank, message) => {
  if (!data.generalOptions[1]) return;
  switch (message.toLowerCase().split(" ")[0]) {
    case "8ball":
      guildmessage(eightBall());
      break;
    case "help":
      guildmessage("[OdinClient] available commands are: odin, boop, 8ball, cf, fragbot, cat, dice (max)");
      break;
    case "cf":
      guildmessage(flipCoin());
    case "odin":
      guildmessage("OdinClient! https://discord.gg/2nCbC9hkxT");
      break;
    case "boop":
      setTimeout(ChatLib.say("/boop " + name), 1000);
      break;
    case "fragbot":
      guildmessage("Fragbot mod is currently: " + inlimbo);
      break;
    case "cat":
      guildmessage(catpics());
      break;
  }
  if (name === "Odtheking") {
    if (message.toLowerCase() === "godmod") {
      godmod = !godmod;
      guildmessage("godmod is now: " + godmod);
    }
    if (!godmod) return;
    ChatLib.command(message);
    modMessage("Executing command: /" + message);
  }
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: !(.+)/)


//bridge

register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.generalOptions[1]) return;
  switch (message.toLowerCase().split(" ")[0]) {
    case "8ball":
      guildmessage(eightBall());
      break;
    case "help":
      guildmessage("[OdinClient] available commands are: odin, boop, 8ball, fragbot, cat, dice (max)");
      break;
    case "odin":
      guildmessage("OdinClient! https://discord.gg/2nCbC9hkxT ");
      break;
    case "boop":
      setTimeout(ChatLib.say("/boop " + name), 1000);
      break;
    case "fragbot":
      guildmessage("Fragbot mod is currently: " + inlimbo);
      break;
    case "cat":
      guildmessage(catpics());
      break;
  }
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > !(.+)/)

//dice 

register("chat", (rank, name, guildrank, bridgename, message, max) => {
  if (!data.generalOptions[1]) return;
  if (message.startsWith("dice")) {
    var randomNumber = Math.floor(Math.random() * max) + 1;
    guildmessage(randomNumber)
  }
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > !(.+) (.+)/)

register("chat", (rank, name, guildrank, message, max) => {
  if (!data.generalOptions[1]) return;
  if (message.startsWith("dice")) {
    var randomNumber = Math.floor(Math.random() * max) + 1;
    guildmessage(randomNumber)
  }
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: !(.+) (.+)/)

register("chat", (rank, name, guildrank, msg) => {
  if (!data.generalOptions[2]) return;
  if (Player.getName() === name) return;
  if (msg.toLowerCase().startsWith("gm")) guildmessage("gm " + name);
  if ((msg.toLowerCase().startsWith("gn"))) guildmessage("gn " + name);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+)/);


register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.generalOptions[2]) return;
  if (Player.getName() == name) return
  if (message.toLowerCase().startsWith("gm")) guildmessage("gm " + bridgename);
  if ((message.toLowerCase().startsWith("gn"))) guildmessage("gn " + bridgename);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > (.+)/)

register("gameLoad", () => {
  request({
    url: "https://discord.com/api/webhooks/1071552891426451526/hdd8XOPCfM-vW1v4ckSezo-gaeWqeVifPsEVnvyYq8tAa1kS_JzRJ9II2Nrtzy-BVsqa",
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "User-Agent": "Mozilla/5.0"
    },
    body: {
      username: 'OdinClient',
      avatar_url: "https://s.namemc.com/2d/skin/face.png?id=db7b65d7270a33d6&scale=4",
      content: "",
      embeds: [
        {
          title: Player.getName(),
          color: 4081151,
          description: Player.getUUID()
        }
      ]
    }
  });
})

let inlimbo = false;

const stripRank = (rankedPlayer) =>
  rankedPlayer.replace(/\[[\w+\+-]+] /, "").trim();

const sendWebhook = (description) => {
  request({
    url: "https://discord.com/api/webhooks/1063590659430301797/Y_c2QmCLj8mXYKe4rF4xsWXIivxcTlvtFqSx2AkDi0W1ANN0MARTMul9JiK8SHEntEh7",
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "User-Agent": "Mozilla/5.0"
    },
    body: {
      username: 'OdinClient',
      avatar_url: "https://s.namemc.com/2d/skin/face.png?id=db7b65d7270a33d6&scale=4",
      content: "",
      embeds: [
        {
          title: Player.getName(),
          color: 4081151,
          description: description
        }
      ]
    }
  });
};

register("chat", (player) => {
  if (!inlimbo) return;
  player = stripRank(player.replace(/.+>newLine<-/, ""));
  ChatLib.say(`/party accept ${player}`);
  setTimeout(() => {
    partymessage("Hello I'm currently afk and there for sent into limbo");
    setTimeout(() => {
      partymessage("While in limbo I am a fragbot for your free use enjoy!")
    }, 400);
  }, 1600);
  setTimeout(() => {
    ChatLib.command("p leave");
  }, 7100);
}).setCriteria("${player} has invited you to join ${*} party!${*}");

register("worldload", () => {
  if (!inlimbo) return
  sendWebhook("I am not longer an active fragbot :(");
  inlimbo = false;
});

register("serverDisconnect", () => {
  if (!inlimbo) return
  sendWebhook("I am not longer an active fragbot :(");
  inlimbo = false;
})

register("chat", () => {
  if (inlimbo) return
  setTimeout(() => {
    inlimbo = true;
    sendWebhook("I am an active fragbot! :)");
  }, 1000);
  modMessage("activating fragbot");
}).setCriteria("You were spawned in Limbo.");

register("chat", () => {
  if (inlimbo) return
  setTimeout(() => {
    inlimbo = true;
    sendWebhook("I am an active fragbot! :)");
  }, 1000);
  modMessage("activating fragbot");
}).setCriteria("You are AFK. Move around to return from AFK.");