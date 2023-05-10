import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { data } from "../../gui";
import { renderBoxWithText } from "../../utils/utils"

/*

add remove and change waypoints by the following order
[xvalue, yvalue, zvalue, "name"],
make sure after the last ] there is no comma
and in the others there is between each

*/


const locations = [
  [37, 15, 44, 'decoy'],
  [90, 12, 100, 'decoy'],
  [28, 6, 50, 'gyro'],
  [21, 12, 88, 'decoy'],
  [34, 6, 46, 'gyro'],
  [21, 12, 53, 'decoy'],
  [25, 6, 83, 'gyro'],
  [85, 6, 101, 'gyro'],
  [27, 16,94, 'green'],
  [23, 21, 54, 'red'],
  [84, 20, 59, 'orange'],
  [85, 20, 98, 'blue'],
  [56, 20, 124, 'purple']
];


register("renderWorld", () => {
  if (!data.dungeons.p5Waypoints.toggle || Player.getY() > 45 || Dungeon.floor !== "M7") return
  for (let coords of locations) renderBoxWithText(...coords);
})
