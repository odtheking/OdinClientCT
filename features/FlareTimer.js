import { data } from "../stuff/guidk";
import PogObject from "../../PogData"
import Font from "../../fontlib"
import { EntityArmorStand, getDistance3D } from "../../BloomCore/utils/Utils";
import { modMessage } from "../utils";

// Flare Timer
const firework = new Item ("fireworks")
const font2 = new Font('OdinClient - legit/stuff/OpenSans-Bold.ttf', 28)

const warningflare = '[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjk2OTIzYWQyNDczMTAwMDdmNmFlNWQzMjZkODQ3YWQ1Mzg2NGNmMTZjMzU2NWExODFkYzhlNmIyMGJlMjM4NyJ9fX0="}]';
const alertflare = ' [0:{Value:"ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMyNjQzMiwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQyYmY5ODY0NzIwZDg3ZmQwNmI4NGVmYTgwYjc5NWM0OGVkNTM5YjE2NTIzYzNiMWYxOTkwYjQwYzAwM2Y2YiIKICAgIH0KICB9Cn0="}]'
const sosflare = '[0:{Value:"ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0="}]'

const flareMove = new Gui()

register("command", () => {
  flareMove.open()
}).setName("moveflare")

const flaredata = new PogObject("OdinClient", {
  flareX: 50,
  flareY: 50,
}, "flaredata.json")

register("dragged", (dx, dy, x, y) => {
  if (flareMove.isOpen()) {
    flaredata.flareX += dx
    flaredata.flareY += dy
    flaredata.save()
  }
})

register("renderOverlay", (event) => {
  if (!flareMove.isOpen()) return
  firework.draw(flaredata.flareX - 53, flaredata.flareY, 3)
  font2.drawStringWithShadow("SOS", flaredata.flareX - 12, flaredata.flareY + 12, new java.awt.Color(0.6, 0, 0.95, 1));
  font2.drawStringWithShadow("180s", flaredata.flareX - 12, flaredata.flareY + 27, new java.awt.Color(0, 0.9, 0.15, 1));

})

register("worldLoad", () => {
  disabletimer = true
  flareShot = null
})

let flareShot = null;
let disabletimer = false
let flaretype


const flaretimerRenderOverlay = () => {
  if (!data.nether.options[1] || !flareShot || disabletimer) return
  if (!flare) return
  const timePassed = Date.now() - flareShot
  if (timePassed > 180000) {
    flareShot = null;
    return;
  }

  let timeRemaining = (180000 - timePassed).toFixed(0) / 1000

  if (flareMove.isOpen()) return
  firework.draw(flaredata.flareX - 53, flaredata.flareY, 3)
  if (flaretype == "SOS") {
    font2.drawStringWithShadow(flaretype, flaredata.flareX - 12, flaredata.flareY + 12, new java.awt.Color(0.6, 0, 0.95, 1))
  } else if (flaretype == "Warning") {
    font2.drawStringWithShadow(flaretype, flaredata.flareX - 12, flaredata.flareY + 12, new java.awt.Color(0, 0.9, 0.15, 1))
  } else if (flaretype == "Alert") {
    font2.drawStringWithShadow(flaretype, flaredata.flareX - 12, flaredata.flareY + 12, new java.awt.Color(0, 0.5, 0.95, 1))
  }
  font2.drawStringWithShadow(`${timeRemaining}s`, flaredata.flareX - 12, flaredata.flareY + 27, timeRemaining > 50 ? new java.awt.Color(0, 0.9, 0.15, 1) : timeRemaining > 20 ? new java.awt.Color(0.9, 0.8, 0, 1) : new java.awt.Color(0.95, 0, 0, 1));
};

register("renderOverlay", flaretimerRenderOverlay);

register("step", () => {
  armorstands = World.getAllEntitiesOfType(EntityArmorStand.class)
  for (let i = 0; i < armorstands.length; i++) {
    flare = new EntityLivingBase(armorstands[i]?.getEntity()).getItemInSlot(4)?.getNBT()?.getTag("tag")?.getTag("SkullOwner")?.getTag("Properties")?.getTag("textures")
    if (flare == warningflare) flaretype = "Warning"
    else if (flare == sosflare) flaretype = "SOS"
    else if (flare == alertflare) flaretype = "Alert"
   
    if (flare == warningflare || flare == sosflare || flare == alertflare) {
      flareloc = armorstands[i]
      const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
      const [x1, y1, z1] = [flareloc.getX(), flareloc.getY(), flareloc.getZ()]
      dist = getDistance3D(x, y, z, x1, y1, z1)
      if (dist <= 40) {
        if (!flareShot) flareShot = new Date().getTime()
        disabletimer = false
      } else {
        flareShot = null
      }
    }
  }
}).setFps(10)

register("command", () => {
  ChatLib.chat(flare)
  
}).setName("getflare")