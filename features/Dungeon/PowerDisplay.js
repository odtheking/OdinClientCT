import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { data } from "../../gui"
import PogObject from "../../../PogData"
import { fontopenbold, normalString } from "../../utils/utils"

// Power Display
const powerMove = new Gui()

register("command", () => powerMove.open()).setName("movepower")

const powerdata = new PogObject("OdinCheata", {
  powerX: 50,
  powerY: 50,
}, "config/featuredata.json")

register("dragged", (dx, dy, x, y) => {
  if (!powerMove.isOpen()) return
  powerdata.powerX = x
  powerdata.powerY = y
  powerdata.save()
})
register("renderOverlay", (event) => {
  if (powerMove.isOpen()) {
    normalString(fontopenbold, `&cPower&r: ` + '&a29', powerdata.powerX, powerdata.powerY, 1, 0, 0, 1)
  } else { 
    const footer = TabList?.getFooter()?.removeFormatting();
    if (!footer) return;
    // Handle power blessing
    let powerMatch = footer.match(blessings.power);
    if (powerMatch) {
      const [, powerValue] = powerMatch;
      normalString(fontopenbold, `Power: ${romanToInt(powerValue)}`, powerdata.powerX, powerdata.powerY, 1, 0, 0, 1)
    }

    // Handle time blessing
    let timeMatch = footer.match(blessings.time);
    if (timeMatch) {
      const [, timeValue] = timeMatch;
      normalString(fontopenbold, `&cTime&r: &a${romanToInt(timeValue)}`, powerdata.powerX, powerdata.powerY, 1, 0, 0, 1)


    }
  }
})



const blessings = {
  power: /Blessing of Power (.+)/,
  time: /Blessing of Time (.+)/
};



const romanHash = {
  I: 1,
  V: 5,
  X: 10
};
function romanToInt(s) {
  let accumulator = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I" && (s[i + 1] === "V" || s[i + 1] === "X")) {
      accumulator += romanHash[s[i + 1]] - romanHash[s[i]];
      i++;
    } else {
      accumulator += romanHash[s[i]];
    }
  }
  return accumulator;
}
