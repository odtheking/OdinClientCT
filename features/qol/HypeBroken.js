import Skyblock from "../../../BloomCore/Skyblock"
import { data } from "../../gui";
import { alert} from "../../utils/utils";

//broken hype

// Hype Broken Alert
var tracker_kills = 0;
var tracker_xp = 0;

function isHeldItemWitherBlade() {
  const heldItem = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getString("id");
  const witherBlades = ["HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED"];
  return witherBlades.includes(heldItem);
}

function getExtraAttributes() {
  return Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes");
}

register("entityDeath", () => {
  if (data.qol.brokenHype.toggle && Player.getHeldItem() !== null && Skyblock.area !== 'Dungeon') {
    if (isHeldItemWitherBlade()) {
      const ExtraAttributes = getExtraAttributes();
      const new_kills = ExtraAttributes.getInteger("stats_book");
      const new_xp = ExtraAttributes.getDouble("champion_combat_xp");
      const kill_difference = new_kills - tracker_kills;

      if (tracker_kills !== new_kills) {
        if (tracker_xp === new_xp) {
          alert(`&l&5HYPE BROKEN!`);
        }
        tracker_kills = new_kills;
        tracker_xp = new_xp;
      }
    }
  }
});
