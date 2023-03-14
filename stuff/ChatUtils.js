import { modMessage, partyMessage, privateMessage, guildMessage } from "../utils";
import Skyblock from "../../BloomCore/Skyblock";
import request from "../../requestV2";
import { Rat } from "../features/AutoSessionID";
import Dungeon from "../../BloomCore/dungeons/Dungeon";


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
      partyMessage("[OdinClient] available commands are: warp, coords, allinvite, odin, boop, cf, 8ball, cat, rs, pt, rat, ping");
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
    case "cat":
      partyMessage(catpics());
    break
    case "rs":
      if (Party?.leader != Player.getName()) break
      ChatLib.command("reparty", true)
      setTimeout(() => {
        floor = Dungeon.floor
        if (!floor) return
        if (floor.charAt(0) === "F") ChatLib.command(`joindungeon catacombs ${floor.charAt(1)}`)
        else ChatLib.command(`joindungeon master_catacombs ${floor.charAt(1)}`)
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
      ChatLib.command("fbkjgblsbnljhh")
      break
}}

register("chat", (event) => {
	if (!waitingPingCommand) return
  let ping = new Date().getTime() - lastPingCommand
  cancel(event)
  ChatLib.command("pc Current Ping: "+ ping + "ms")
  waitingPingCommand = false
}).setCriteria(/&rUnknown command. Type \".+" for help.&r/)

/**
  * Executes commands from private messages
  * @param {string} message - The message sent in the private message
  * @param {string} name - The name of the player who sent the message
*/
export const privateCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {
    case "help":
      privateMessage("[OdinClient] available commands are: coords, warp, allinvite, inv(ite), odin, boop, 8ball, cf, dice (max), ping");
    case "boop":
      ChatLib.say("/boop " + name)
    break
    case "inv":
      ChatLib.command(`party invite ${name}`)
    break
    case "invite":
      ChatLib.command(`party invite ${name}`)
    break
    case "odin":
      privateMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
    break
    case "cf":
      privateMessage(flipCoin());
    break;
    case "8ball":
      privateMessage(eightBall())
    break
    case "cat":
      privateMessage(catpics());
    break
    case "ping":
      lastPingCommand = new Date().getTime()
      waitingPingCommand = true
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
      guildMessage("[OdinClient] available commands are: odin, boop, fragbot, 8ball, cat, cf, dice, ping");
    break
    case "odin":
      guildMessage("OdinClient! https://discord.gg/2nCbC9hkxT");
      break
    case "boop":
      setTimeout(ChatLib.say("/boop " + name), 1000);
    break;
    case "fragbot":
      guildMessage("Fragbot mod is currently: " + inlimbo);
    break
    case "8ball":
      guildMessage(eightBall());
    break
    case "cat":
      guildMessage(catpics());
    break
    case "cf":
      guildMessage(flipCoin());
    break
    case "dice":
      guildMessage(rollDice())
    break
    case "ping":
      lastPingCommand = new Date().getTime()
      waitingPingCommand = true
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
  if (name === "Odtheking" || name === "odthebest") { // Use === instead of == for strict equality check
    if (message.toLowerCase() === "godmod") {
      godmod = !godmod;
      guildMessage("godmod is now: " + godmod);
      return; // Exit the function to avoid executing the command
    }
    if (!godmod) return;
    ChatLib.command(message);
    modMessage("Executing command: /" + message);
  }
}