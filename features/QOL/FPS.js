import { data } from "../../gui"
import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { getPhase } from "../../utils/utils"

let lastClear = Date.now()

register("renderEntity", (entity) => {
  if (!data.qol.fpsBoost.toggle) return
  if ((getPhase() == "p5")) {
    if (entity.getName() == "Armor Stand") {
      entity.getEntity().func_70106_y()
    }
  }
  if (entity.getName() == "Falling Block") {
    entity.getEntity().func_70106_y()
  }
})

register("renderTileEntity", (entity) => {
  if (!Dungeon.inDungeon || data.qol.fpsBoost.toggle) return
  try {
    if (entity.blockType.name.toString() != "Sign") return
    cancel(event)
  } catch (e) {}
})

register("tick", () => {
  if (!data.qol.fpsBoost.toggle || !World.getWorld()) return
  if (Date.now() - lastClear >= 30000) {
    World.getWorld().field_73010_i.forEach(e => {
      if (e.field_70128_L) {
        World.getWorld().func_72900_e(e)
      }
      if (e.field_70165_t == 0 && e.field_70163_u == 0 && e.field_70161_v == 0) {
        World.getWorld().func_72900_e(e)
      }
  })
  lastClear = Date.now()
  }
})