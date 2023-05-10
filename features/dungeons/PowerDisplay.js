import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import PogObject from "../../../PogData"
import { data } from "../../gui"
import { fontpower, normalString, romanToInt } from "../../utils/utils"


//power display

const powerMove = new Gui()

register("command", () => powerMove.open()).setName("movepower")

const powerdata = new PogObject("OdinClient", {
  powerX: 50,
  powerY: 50,
}, "config/featuredata.json")

register("dragged", (dx, dy, x, y) => {
  if (!powerMove.isOpen()) return
  powerdata.powerX += dx
  powerdata.powerY += dy
  powerdata.save()
})


let powerMatch
let timeMatch

register("step", () => {
  if (!data.dungeons.powerDisplay.toggle) return
  
  let footer = TabList?.getFooter()?.removeFormatting()
  if (!footer) return
  powerMatch = footer.match(blessings.power);
  timeMatch = footer.match(blessings.time);

}).setFps(2)

register("renderOverlay", () => {
  if (powerMove.isOpen()) {
    normalString(fontpower, `Power: ` + '§f29', powerdata.powerX, powerdata.powerY, 1, 0, 0, 1)
    normalString(fontpower, `Time: §f5`, powerdata.powerX, powerdata.powerY + 20, 1, 0, 0, 1)
  } else if (data.dungeons.powerDisplay.toggle) { 
    if (powerMatch) normalString(fontpower, `Power: §f${romanToInt(powerMatch[1])}`, powerdata.powerX, powerdata.powerY, 1, 0, 0, 1)

    if (timeMatch) normalString(fontpower, `Time: §f${romanToInt(timeMatch[1])}`, powerdata.powerX, powerdata.powerY + 20, 1, 0, 0, 1)
  }
})

const blessings = {
  power: /Blessing of Power (.+)/,
  time: /Blessing of Time (.+)/
};

