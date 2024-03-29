import { data } from "../../gui"
import { alert } from "../../utils/utils"

// Kuudra Alerts


const ChatEvents = {
  "WARNING: You do not have a key for this tier in your inventory, you will not be able to claim rewards.": "&l§4NO KUUDRA KEY!",
  "[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!": "&l§4BUY UPGRADE ROUTE!",
  "[NPC] Elle: Not again!": "PICKUP SUPPLY!",
  "[NPC] Elle: It's time to build the Ballista again! Cover me!": "&l§4START BUILDING!",
  "Your Fresh Tools Perk bonus doubles your building speed for the next 5 seconds!": `&l§4EAT FRESH!`
}

register("chat", (msg) => {
  if (!data.general.kuudraAlerts.toggle) return
  Object.entries(ChatEvents).forEach(([message, title]) => {
    if (msg == message) {
      alert(title)
    }
  });
}).setCriteria("${msg}")

// unready
register("chat", (player) => {
  if (!data.general.kuudraAlerts.toggle) return
  const name = player.removeFormatting().toUpperCase();
  alert(`§4${name} IS NO LONGER READY!`);
}).setCriteria("${player} is no longer ready!");

register("chat", (player) => {
  if (!data.general.kuudraAlerts.toggle) return
  alert("&l§4KUUDRA STUNNED!");
}).setCriteria("${player} destroyed one of Kuudra's pods!");