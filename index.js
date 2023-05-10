/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import PogObject from "../PogData"
import "./features/dungeons/DragonBox"
import "./features/dungeons/DragonDeathCheck"
import "./features/dungeons/EdragReminder"
import "./features/dungeons/PowerDisplay"
import "./features/dungeons/ReadyReminder"
import "./features/dungeons/Spots"
import "./features/dungeons/UltReminder"
import "./features/dungeons/WatcherBar"
import "./features/dungeons/dragspawntimer"
import "./features/dungeons/song"
import "./features/dungeons/stairDisplay"
import "./features/general/AutoSessionID"
import "./features/general/BlackList"
import "./features/general/ESP"
import "./features/general/GuildCommands"
import "./features/general/GyroRange"
import "./features/general/PartyCommands"
import "./features/qol/DeployableTimer"
import "./features/qol/FPS"
import "./features/qol/Ghosting"
import "./features/qol/HypeBroken"
import "./features/qol/KuudraAlerts"
import "./features/qol/VanqNotifier"
import "./features/qol/WayPoints"
import "./gui"


export const userData = new PogObject("OdinClient", {
  firstLogin: true
}, "config/userData.json")
let metadata = JSON.parse(FileLib.read("OdinClient", "metadata.json"))
  
register("worldLoad", () => {
  if (!userData.firstLogin) return
  setTimeout(() => {
    ChatLib.chat("");
    ChatLib.chat("§6[Odin§4Client] §r")
    ChatLib.chat(`§8On Version: §r${metadata.version}`);
    ChatLib.chat("§8Main cmd is §r/od /odinclient");
    ChatLib.chat("§8Other commands are:")
    ChatLib.chat("§r/odinlist, /esp, /moveflare, /movepower, /movedrag");
    ChatLib.chat("§dENJOY :)");
    ChatLib.chat("");
  }, 1000);
  userData.firstLogin = false
  userData.save()
})