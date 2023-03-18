import { data } from "../stuff/guidk"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { getPhase, modMessage } from "../utils"

let inp5
const killEntity = entity => entity.func_70106_y()
register("renderEntity", (entity,pos,ticks,event) => {
  if (inp5 && data.legit.fpsBoost.toggle) {
    if (entity.getName() == "Armor Stand") {
      killEntity(entity.getEntity())
    }
  }
})

register("renderTileEntity", (entity, pos, ticks, event) => {
    if (!Dungeon.inDungeon || data.legit.fpsBoost.toggle) return
    try {
        if (entity.blockType.name.toString() != "Sign") return
        cancel(event)
    } catch (e) {}
})

register("chat", () => {
    inp5 = true
}).setChatCriteria("[BOSS] Wither King: You.. again?")

register("worldLoad", () => {
    inp5 = false
})

register("chat", () => {
  inp5 = false
}).setCriteria("[BOSS] Wither King: Incredible. You did what I couldn't do myself.")