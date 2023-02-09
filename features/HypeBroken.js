import Skyblock from "../../BloomCore/Skyblock";
import { data } from "../stuff/guidk"
import { modMessage } from "../utils";

// Hype Broken Alert
var tracker_kills = 0
var tracker_xp = 0

register("entityDeath", () => {
  if (!data.nether.options[0] && Player.getHeldItem() == null && Skyblock.area != 'Dungeon') return

  const heldItem = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getString("id");
  const witherBlades = ["HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED"];

  if (!witherBlades.includes(heldItem)) return
  new_kills = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getInteger("stats_book");
  new_xp = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getDouble("champion_combat_xp");
  kill_difference = new_kills - tracker_kills;

  if (tracker_kills != new_kills) {
    if (tracker_xp == new_xp) {
      Client.Companion.showTitle(`&l&5HYPE BROKEN!`, "", 10, 50, 10)
      World.playSound("note.pling", 150, 1)
    }
    tracker_kills = new_kills
    tracker_xp = new_xp
  }
    
})