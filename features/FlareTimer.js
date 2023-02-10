import { data } from "../stuff/guidk";
import PogObject from "../../PogData"
import Font from "../../fontlib"
import { Color, EntityArmorStand, getDistance3D } from "../../BloomCore/utils/Utils";
import { getCtEntityHelmetTexture, modMessage } from "../utils";

// Flare Timer
const firework = new Item("fireworks")
const font2 = new Font('OdinClient/stuff/OpenSans-Bold.ttf', 28)

let flareType = undefined
let nearbyFlares = []

const flareTextures = {
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn0=": ["Warning", new Color(0, 0.9, 0.15, 1), 0],
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMyNjQzMiwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQyYmY5ODY0NzIwZDg3ZmQwNmI4NGVmYTgwYjc5NWM0OGVkNTM5YjE2NTIzYzNiMWYxOTkwYjQwYzAwM2Y2YiIKICAgIH0KICB9Cn0=": ["Alert", new Color(0, 0.5, 0.95, 1), 1],
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0=": ["SOS", new Color(0.6, 0, 0.95, 1), 2]
}

const flareMove = new Gui()

const flaredata = new PogObject("OdinClient", {
  flareX: 50,
  flareY: 50,
}, "flaredata.json")

register("command", () => {
  flareMove.open()
}).setName("moveflare")

register("command", () => {
  modMessage(flareType?.[0] ?? "No flare found")
}).setName("getflare")

register("dragged", (dx, dy, x, y) => {
  if (flareMove.isOpen()) {
    flaredata.flareX += dx
    flaredata.flareY += dy
    flaredata.save()
  }
})

register("renderOverlay", () => {
  updateFlares()
  if (flareMove.isOpen()) {
    firework.draw(flaredata.flareX - 53, flaredata.flareY, 3)
    font2.drawStringWithShadow("SOS", flaredata.flareX, flaredata.flareY, new Color(0.6, 0, 0.95, 1));
    font2.drawStringWithShadow("180s", flaredata.flareX, flaredata.flareY + 15, new Color(0, 0.9, 0.15, 1));
  } else if (data.nether.options[1]) {
    const flareData = nearbyFlares.sort((a, b) => b[2] - a[2]).find(f => f[3].distanceTo(Player.asPlayerMP()) <= 40)
    if (!flareData) {
      flareType = undefined
      return
    }
    flareType = flareData[1]
    const timePassed = Date.now() - flareData[2]
    const timeRemaining = ((180000 - timePassed) / 1000).toFixed(2)
    firework.draw(flaredata.flareX - 53, flaredata.flareY, 3)
    font2.drawStringWithShadow(flareType[0], flaredata.flareX, flaredata.flareY, flareType[1])
    font2.drawStringWithShadow(`${timeRemaining}s`, flaredata.flareX, flaredata.flareY + 15, timeRemaining > 50 ? new Color(0, 0.9, 0.15, 1) : timeRemaining > 20 ? new Color(0.9, 0.8, 0, 1) : new Color(0.95, 0, 0, 1));
  }
})

register("worldLoad", () => {
  flareType = undefined
  nearbyFlares.length = 0
})
register("step", () => {
  if (!data.nether.options[1]) return
  const flares = []
  World.getAllEntities().filter(e => e && e.getEntity() instanceof EntityArmorStand).forEach(e => {
    if (nearbyFlares.find(f => f[0] == e.getEntity().func_145782_y())) return
    const texture = getCtEntityHelmetTexture(e)
    const type = flareTextures[texture]
    if (type) {
      flares.push([type, e])
    }
  })
  flares.sort((a, b) => b[2] - a[2]).forEach(flare => {
    const [type, flareEnt] = flare
    const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
    const [x1, y1, z1] = [flareEnt.getX(), flareEnt.getY(), flareEnt.getZ()]
    const dist = getDistance3D(x, y, z, x1, y1, z1)
    if (dist <= 40) {
      nearbyFlares.push([flareEnt.getEntity().func_145782_y(), type, Date.now(), flareEnt])
    }
  })
}).setFps(10)

function updateFlares() {
  nearbyFlares.forEach(flare => {
    if (Date.now() - flare[2] > 180000 || flare[3].isDead()) {
      nearbyFlares.splice(nearbyFlares.indexOf(flare), 1)
    }
  })
};
