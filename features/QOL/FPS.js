import { data } from "../../gui"
import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { centeredString, fontmc } from "../../utils/utils"


let inp5 = false
let lastClear = Date.now()

register("renderEntity", (entity) => {
  if (!data.qol.fpsBoost.toggle || entity) return
  if (inp5) {
    if (entity?.getName() == "Armor Stand") {
      entity?.getEntity()?.func_70106_y()
    }
  }
  if (entity?.getName() == "Falling Block") {
    entity?.getEntity()?.func_70106_y()
  }
})

register("chat", (event) => {
  startTimer(5000); // 5 seconds
}).setCriteria("Wither").setContains();

let timerStarted = false;
let timerEndTime = 0;

function startTimer(duration) {
  timerStarted = true;
  timerEndTime = Date.now() + duration;
}

register("tick", () => {
  if (!data.qol.fpsBoost.toggle || !World.getWorld()) return
  if (Date.now() - lastClear >= 30000) {
    const players = World.getWorld().field_73010_i;
    for (let i = 0; i < players.length; i++) {
      const e = players[i];
      if (e.field_70128_L) {
        World.getWorld().func_72900_e(e);
      }
      if (e.field_70165_t == 0 && e.field_70163_u == 0 && e.field_70161_v == 0) {
        World.getWorld().func_72900_e(e);
      }
    }
    lastClear = Date.now();
  }
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