/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import PogObject from "../PogData"

//huge thanks and credits to: Bonsai, AzuredBlue, Bloom, Cezar, Ilmars, Aton, Tebey, Turtle and many more ily all <3
import "./stuff/guidk"
import "./features/Dungeon/AutoLeap"
import "./features/PartyCommands"
import "./features/Dungeon//AutoMask"
import "./features/Dungeon/AutoShield"
import "./features/Dungeon/AutoUlt"
import "./features/Dungeon/AutoReady"
import "./features/Dungeon/AutoWish"
import "./features/GuildCommands"
import "./features/CookieClicker"
import "./features/Dungeon/AutoEdrag"
import "./features/ItemMacro"
import "./features/Dungeon/AutoTerminator"
import "./features/AutoSessionID"
import "./features/Dungeon/GhostBlocks"
import "./features/FlareTimer"
import "./features/VanqNotifier"
import "./features/Dungeon/PowerDisplay"
import "./features/HypeBroken"
import "./features/Kuudra/KuudraAlerts"
import "./features/ESP"
import "./features/Dungeon/dragspawntimer"
import "./features/Dungeon/IHATEDIORITE"
import "./features/Dungeon/DragonBox"
import "./features/BlackList"
import "./stuff/ChatUtils"
import "./features/Ghosting"
import "./features/FPS"
import "./features/Kuudra/UpgradeButton"
import "./features/Dungeon/RelicAura"
import "./features/AutoSell"
import "./features/Dungeon/song"
import "./features/Dungeon/SuperBoom"
import "./features/Dungeon/Triggerbot"
import "./features/Dungeon/AutoIcefill"

export const userData = new PogObject("OdinCheata", {
  firstLogin: true
}, "userData.json")
let metadata = JSON.parse(FileLib.read("OdinCheata", "metadata.json"))

register("worldLoad", () => {
  if (!userData.firstLogin) return
  ChatLib.chat("");
  ChatLib.chat("§6[Odin§4Client] §r")
  ChatLib.chat(`§8On Version: §r${metadata.version}`);
  ChatLib.chat("§8Main cmd is §r/oc /odincheata");
  ChatLib.chat("§8Other commands are:")
  ChatLib.chat("§r/odinlist /esp /autosell /moveflare /movepower");
  ChatLib.chat("§dENJOY :)");
  ChatLib.chat("");
  userData.firstLogin = false
  userData.save()
})