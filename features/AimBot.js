import Skyblock from "../../BloomCore/Skyblock"
import { data } from "../stuff/guidk"
import { modMessage } from "../utils"
const rightClickKey = Client.getKeyBindFromDescription('key.use')
// for future projects?
// Aimbot
/*
const MOB = "Villager";
let enabled = false;

register("step", () => {
  if (!enabled) return;

  World.getAllEntities().forEach((entity) => {
    if (!entity) return;
    if (entity.getName() !== MOB) return;

    const player = Player.getPlayer();
    const [x0, y0, z0] = [player.getX(), player.getY(), player.getZ()];
    const [x1, y1, z1] = [entity.getX(), entity.getY(), entity.getZ()];
    const dist = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2 + (z1 - z0) ** 2);
    const yaw = -Math.atan2(x1 - x0, z1 - z0) / Math.PI * 180;
    const pitch = -Math.atan2(y1 - y0, Math.sqrt((x1 - x0) ** 2 + (z1 - z0) ** 2)) / Math.PI * 180;

    player.field_70177_z = yaw;
    player.field_70125_A = pitch - dist / 6;
  });
});

*/

