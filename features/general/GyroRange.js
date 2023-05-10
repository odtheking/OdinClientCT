import RenderLib from "../../../RenderLib"
import { data } from "../../gui"
import { modMessage } from "../../utils/utils";


// Register renderWorld event
register("renderWorld", () => {
    if (!data.general.gyroRange.toggle || Player.getHeldItem()?.getName()?.removeFormatting() !== "Gyrokinetic Wand") return;
    let p = Player.getPlayer().func_174822_a(25, 0.0)?.func_178782_a()
    if (!p) return;
    [x,y,z] = [p.func_177958_n(), p.func_177956_o(), p.func_177952_p()]
    let b = World.getBlockAt(x,y,z);
    if (!b?.type?.getID()) return;
    RenderLib.drawCyl(x + 0.5, y + 1, z + 0.5, 10, 10, 0.2, 30, 1, 0, 90, 90, 0.74901960784, 0.25098039215, 0.74901960784, 0.5, false, false);
  });