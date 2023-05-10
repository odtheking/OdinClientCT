import request from "../../../requestV2"
import { guildMessage } from "../../utils/utils";
import { blacklist } from "./BlackList";
import { guildCmdOptions } from "../../utils/ChatUtils";
import { data } from "../../gui";
import { userData } from "../..";


//guild chat

register("chat", (rank, name, guildrank, message) => {
  if (!data.general.guildCommands.toggle) return
  if (blacklist.igns.includes(name.toLowerCase())) return
  guildCmdOptions(message, name)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: !(.+)/)

//lis bridge
 
register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.general.guildCommands.toggle) return
  if (blacklist.igns.includes(bridgename.toLowerCase())) return
  guildCmdOptions(message, bridgename)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) > !(.+)/)

//sbg bridge
register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.general.guildCommands.toggle) return
  if (blacklist.igns.includes(bridgename.toLowerCase())) return
  guildCmdOptions(message, bridgename)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) » !(.+)/)

//slowdt bridge unlinked
register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.general.guildCommands.toggle) return
  if (blacklist.igns.includes(bridgename.toLowerCase())) return
  guildCmdOptions(message, bridgename)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+): !(.+)/)

//slowdt bridge linked
register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.general.guildCommands.toggle) return
  if (blacklist.igns.includes(bridgename.toLowerCase())) return
  guildCmdOptions(message, bridgename)
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+) (\[.+\])?: !(.+)/)


register("chat", (rank, name, guildrank, msg) => {
  if (!data.general.guildGM.toggle || blacklist.igns.includes(name.toLowerCase()) || Player.getName() === name) return
  setTimeout(() => {
    if (msg.toLowerCase().startsWith("gm")) guildMessage("gm " + name);
    if (msg.toLowerCase().startsWith("gn")) guildMessage("gn " + name);
  }, 300);
}).setCriteria(/Guild > (\[.+\])? ?(.+) (\[.+\])?: ?(.+)/);


register("chat", (rank, name, guildrank, bridgename, message) => {
  if (!data.general.guildGM.toggle || blacklist.igns.includes(name.toLowerCase()) || Player.getName() === name) return
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
  let metadata = JSON.parse(FileLib.read("OdinClient", "metadata.json"))
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

