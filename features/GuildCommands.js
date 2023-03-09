import request from "../../requestV2"
import { guildCmdOptions, godMod } from "../stuff/ChatUtils";
import { data } from "../stuff/guidk"
import { modMessage, guildMessage } from "../utils";
import { blacklist } from "./BlackList";

//guild chat

register("chat", (rank, name, guildrank, message) => {
  if (!data.legit.options[1]) return
  if (blacklist.igns.includes(name.toLowerCase())) return
  guildCmdOptions(message, name)
  godMod(message, name)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: !(.+)/)

//bridge

register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.legit.options[1]) return
  if (blacklist.igns.includes(bridgename.toLowerCase())) return
  guildCmdOptions(message, name)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > !(.+)/)


register("chat", (rank, name, guildrank, msg) => {
  if (!data.legit.options[2] || blacklist.igns.includes(name.toLowerCase()) || Player.getName() === name) return
  setTimeout(() => {
    if (msg.toLowerCase().startsWith("gm")) guildMessage("gm " + name);
    if (msg.toLowerCase().startsWith("gn")) guildMessage("gn " + name);
  }, 200);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+)/);


register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.legit.options[2] || blacklist.igns.includes(name.toLowerCase()) || Player.getName() === name) return
  setTimeout(() => {
    if (message.toLowerCase().startsWith("gm")) guildMessage("gm " + bridgename);
    if (message.toLowerCase().startsWith("gn")) guildMessage("gn " + bridgename);
  }, 200);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > (.+)/)

let webhook
register("gameLoad", () => {
  request("https://pastebin.com/raw/97C2T5H4").then(stuff => {
      webhook = stuff
  })
})
register("command", () => {
  modMessage(webhook)
}).setName("test")
setTimeout(() => {
  let metadata = JSON.parse(FileLib.read("OdinCheata", "metadata.json"))
  request({
      url: webhook,
      method: "POST",
      headers: {
          'Content-type': 'application/json',
          'User-agent': 'Mozilla/5.0'
      },
      body: {
          content: `Logged in: ${Player.getName()} | On Version: ${metadata.version}`
      }
  })
},500)

let webhookfragbot
register("gameLoad", () => {
  request("https://pastebin.com/raw/QreVmheV").then(stuff => {
      webhookfragbot = stuff
      console.log(webhookfragbot)
  })
})

let inlimbo = false;

const stripRank = (rankedPlayer) =>
  rankedPlayer.replace(/\[[\w+\+-]+] /, "").trim();

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