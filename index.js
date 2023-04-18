/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import PogObject from "../PogData"

//huge thanks and credits to: Bonsai, AzuredBlue, Bloom, Cezar, Ilmars, Aton, Tebey, Turtle and many more ily all <3
//import "./features/Dungeon/AutoIcefill"
import "./features/Dungeon/AutoLeap"
import "./features/Dungeon/AutoMask"
import "./features/Dungeon/AutoReady"
import "./features/Dungeon/AutoShield"
import "./features/Dungeon/AutoUlt"
import "./features/Dungeon/AutoWish"
import "./features/Dungeon/PowerDisplay"
import "./features/Dungeon/SuperBoom"
import "./features/Dungeon/Triggerbot"
import "./features/Dungeon/WatcherBar"
import "./features/General/PortalFix"
import "./features/General/ArrowTrajectory"
import "./features/General/AutoSell"
import "./features/General/AutoSessionID"
import "./features/General/BlackList"
import "./features/General/ESP"
import "./features/General/DeployableTimer"
import "./features/General/GuildCommands"
import "./features/General/ItemMacro"
import "./features/General/KuudraAlerts"
import "./features/General/PartyCommands"
import "./features/M7/AutoEdrag"
import "./features/M7/DragSpawnTimer"
import "./features/M7/DragonBox"
import "./features/M7/DragonDeathCheck"
import "./features/M7/GhostBlocks"
import "./features/M7/IHATEDIORITE"
import "./features/M7/RelicAura"
import "./features/M7/song"
import "./features/QOL/AutoTerminator"
import "./features/QOL/CookieClicker"
import "./features/QOL/FPS"
import "./features/QOL/Ghosting"
import "./features/QOL/HypeBroken"
import "./features/QOL/NoBlockAnimation"
import "./features/QOL/VanqNotifier"
import "./features/QOL/WayPoints"
import "./gui"

export const userData = new PogObject("OdinCheata", {
  firstLogin: true
}, "config/userData.json")
let metadata = JSON.parse(FileLib.read("OdinCheata", "metadata.json"))

register("worldLoad", () => {
  if (!userData.firstLogin) return
  ChatLib.chat("");
  ChatLib.chat("§6[Odin§4Client] §r")
  ChatLib.chat(`§8On Version: §r${metadata.version}`);
  ChatLib.chat("§8Main cmd is §r/oc /odincheata");
  ChatLib.chat("§8Other commands are:")
  ChatLib.chat("§r/odinlist /esp /autosell /moveflare /movepower /movedrag");
  ChatLib.chat("§rFeel free to join the discord https://discord.gg/2nCbC9hkxT")
  ChatLib.chat("§dENJOY :)");
  ChatLib.chat("");
  userData.firstLogin = false
  userData.save()
})

  





