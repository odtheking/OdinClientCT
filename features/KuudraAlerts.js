import { data } from "../stuff/guidk";

// Kuudra Alerts
function alert(title) {
  World.playSound("note.pling", 100, 1)
  Client.showTitle(title, "", 10, 100, 10);
}

// no key
register("chat", () => {
  if (!data.nether.options[3]) return
  alert("&l§4NO KUUDRA KEY!")
}).setCriteria("WARNING: You do not have a key for this tier in your inventory, you will not be able to claim rewards.");

// unready
register("chat", (player) => {
  if (!data.nether.options[3]) return
  const name = player.removeFormatting().toUpperCase();
  alert(`§4${name} IS NO LONGER READY!`);
}).setCriteria("${player} is no longer ready!");

// buy first route
register("chat", () => {
  if (!data.nether.options[3]) return
  alert("&l§4BUY UPGRADE ROUTE!");
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");

// go fuel
register("chat", () => {
  if (!data.nether.options[3]) return
  alert("PICKUP SUPPLY!");
}).setCriteria("[NPC] Elle: Not again!");

// start building
register("chat", () => {
  if (!data.nether.options[3]) return
  alert("&l§4START BUILDING!");
}).setCriteria("[NPC] Elle: It's time to build the Ballista again! Cover me!");

// fresh tools
register("chat", () => {
  if (!settings.kuudraAlerts) return;
  alert(`&l§4EAT FRESH!`);
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 5 seconds!");

// stunned
register("chat", (player) => {
  if (!data.nether.options[3]) return
  alert("&l§4KUUDRA STUNNED!");
}).setCriteria("{player} destroyed one of Kuudra's pods!");
