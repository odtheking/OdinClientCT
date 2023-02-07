import { data } from "../stuff/guidk";

// Kuudra Alerts
function alert(title) {
  World.playSound("note.pling", 100, 1)
  Client.showTitle(title, "", 10, 100, 10);
}

// NO KUUDRA KEY ALERT
register("chat", () => {
  if (!data.netherOptions[3]) return
  alert("&l§4NO KUUDRA KEY!")
}).setCriteria("WARNING: You do not have a key for this tier in your inventory, you will not be able to claim rewards.");

// UNREADY ALERT
register("chat", (player) => {
  if (!data.netherOptions[3]) return
  const name = player.removeFormatting().toUpperCase();
  alert(`§4${name} IS NO LONGER READY!`);
}).setCriteria("${player} is no longer ready!");

// CHOOSE PERK ALERT
register("chat", () => {
  if (!data.netherOptions[3]) return
  alert("&l§4BUY UPGRADE ROUTE!", "");
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");

// FUELING ALERT
register("chat", () => {
  if (!data.netherOptions[3]) return
  alert("PICKUP SUPPLY!", "");
}).setCriteria("[NPC] Elle: Not again!");

// BUILDING ALERT
register("chat", () => {
  if (!data.netherOptions[3]) return
  alert("&l§4START BUILDING!", "");
}).setCriteria("[NPC] Elle: It's time to build the Ballista again! Cover me!");

register("chat", (player) => {
  if (!data.netherOptions[3]) return
  // Kuudra stunned alert
  alert("&l§4KUUDRA STUNNED!", player);
}).setCriteria("{player} destroyed one of Kuudra's pods!");
