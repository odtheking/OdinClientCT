import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { data } from "../../stuff/guidk"
import PogObject from "../../../PogData"
import Font from "../../../fontlib"
const font2 = new Font('OdinCheata/stuff/Minecraft.ttf', 21)

// Power Display
const powerMove = new Gui()

register("command", () => {
  powerMove.open()
}).setName("movepower")

const powerdata = new PogObject("OdinCheata", {
  powerX: 50,
  powerY: 50,
}, "flaredata.json")

register("dragged", (dx, dy, x, y) => {
  if (powerMove.isOpen()) {
    powerdata.powerX = x
    powerdata.powerY = y
    powerdata.save()
  }
})
register("renderOverlay", (event) => {
  if (!powerMove.isOpen()) return
  Renderer.drawStringWithShadow(`&cPower&r: ` + '&a29', powerdata.powerX, powerdata.powerY)
})


var pDisplay = new Display()


const updatePowerDisplay = () => {
  if (!Dungeon.inDungeon || !data.legit.options[5] || powerMove.isOpen()) {
    pDisplay.clearLines();
    return;
  }
  let atLine = 0;
  const footer = TabList.getFooter().removeFormatting();
  const blessings = {
    power: /Blessing of Power (.+)/,
    time: /Blessing of Time (.+)/
  };
  pDisplay.setRenderLoc(powerdata.powerX, powerdata.powerY);
  Object.entries(blessings).forEach(([name, pattern]) => {
    const match = footer.match(pattern);
    if (match) {
      const [, value] = match;
      pDisplay.setLine(atLine, `&c${name.charAt(0).toUpperCase() + name.slice(1)}&r: &a${romanToInt(value)}`);
      atLine++;
    }
  });
  for (let i = 0; i < atLine; i++) {
    pDisplay.getLine(i).setScale(1.7).setShadow(true);
  }
};

register("step", updatePowerDisplay).setFps(60);

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
