import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { data } from "../../gui"
import PogObject from "../../../PogData"

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
  if (!powerMove.isOpen()) return
  Renderer.drawStringWithShadow(`&cPower&r: ` + '&a29', powerdata.powerX, powerdata.powerY)
})


var pDisplay = new Display()

const blessings = {
  power: /Blessing of Power (.+)/,
  time: /Blessing of Time (.+)/
};

const updatePowerDisplay = () => {
  if (!Dungeon.inDungeon || !data.dungeons.powerDisplay.toggle || powerMove.isOpen()) {
    pDisplay.clearLines();
    return;
  }
  let atLine = 0;
  const footer = TabList.getFooter().removeFormatting();

  pDisplay.setRenderLoc(powerdata.powerX, powerdata.powerY);

  // Handle power blessing
  let powerMatch = footer.match(blessings.power);
  if (powerMatch) {
    const [, powerValue] = powerMatch;
    pDisplay.setLine(atLine, `&cPower&r: &a${romanToInt(powerValue)}`);
    atLine++;
  }

  // Handle time blessing
  let timeMatch = footer.match(blessings.time);
  if (timeMatch) {
    const [, timeValue] = timeMatch;
    pDisplay.setLine(atLine, `&cTime&r: &a${romanToInt(timeValue)}`);
    atLine++;
  }

  for (let i = 0; i < atLine; i++) {
    pDisplay.getLine(i)
      .setScale(1.7)
      .setShadow(true);
  }
};

register("step", updatePowerDisplay).setFps(1);

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
