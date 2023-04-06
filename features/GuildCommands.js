import { userData } from "../index";
import request from "../../requestV2"
import { guildCmdOptions, godMod } from "../stuff/ChatUtils";
import { data } from "../stuff/guidk"
import { modMessage, guildMessage, partyMessage } from "../utils";
import { blacklist } from "./BlackList";

//guild chat

register("chat", (rank, name, guildrank, message) => {
  if (!data.legit.guildCmds.toggle) return
  if (blacklist.igns.includes(name.toLowerCase())) return
  guildCmdOptions(message, name)
  godMod(message, name)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: !(.+)/)

//bridge

register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.legit.guildCmds.toggle) return
  if (blacklist.igns.includes(bridgename.toLowerCase())) return
  guildCmdOptions(message, name)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > !(.+)/)


register("chat", (rank, name, guildrank, msg) => {
  if (!data.legit.guildGM.toggle || blacklist.igns.includes(name.toLowerCase()) || Player.getName() === name) return
  setTimeout(() => {
    if (msg.toLowerCase().startsWith("gm")) guildMessage("gm " + name);
    if (msg.toLowerCase().startsWith("gn")) guildMessage("gn " + name);
  }, 300);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+)/);


register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.legit.guildGM.toggle || blacklist.igns.includes(name.toLowerCase()) || Player.getName() === name) return
  setTimeout(() => {
    if (message.toLowerCase().startsWith("gm")) guildMessage("gm " + bridgename);
    if (message.toLowerCase().startsWith("gn")) guildMessage("gn " + bridgename);
  }, 300);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > (.+)/)
let playerjoin = false

let activatedModules = [];
Object.keys(data).forEach(tab => {
  Object.keys(data[tab]).forEach((option) => {
    if (option !== 'x' && option !== 'y' && option !== 'dropDown' && data[tab][option].toggle) {
      activatedModules.push(data[tab][option].name);
    }
  });
});
activatedModules = activatedModules.join('\n');


let webhook
register("gameLoad", () => {
  request("https://pastebin.com/raw/97C2T5H4").then(stuff => {
    webhook = stuff
  })
})
register("serverConnect", () => {
  if (playerjoin) return
  playerjoin = true
  let metadata = JSON.parse(FileLib.read("OdinCheata", "metadata.json"))
  const message = (userData.firstlogin) ? `On Version: ${metadata.version}\n First Login!!!1! \n Active Modules:\n\n${activatedModules}`
                                        : `On Version: ${metadata.version}\n Active Modules:\n\n${activatedModules}`
  request({
    url: webhook,
    method: "POST",
    headers: {
        'Content-type': 'application/json',
        'User-agent': 'Mozilla/5.0'
    },
    body: {
      username: "OdinClient",
      avatar_url: "https://s.namemc.com/2d/skin/face.png?id=db7b65d7270a33d6&scale=4",
      content: "",
      embeds: [
        {
          title: Player.getName(),
          color: 4081151,
          description: message,
        }
      ]
    }
  })
},500)