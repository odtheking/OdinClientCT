import PogObject from "../../../PogData"
import { Color, EntityArmorStand, getDistance3D } from "../../../BloomCore/utils/Utils";
import { File, fontopenbold, getCtEntityHelmetTexture, modMessage } from "../../utils/utils"
import { data } from "../../gui";


// Flare Timer
const flaredata = new PogObject("OdinCheata", {
  flareX: 50,
  flareY: 50,
}, "config/featuredata.json")

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

const firework = new Item("fireworks")
const PLASMAPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinCheata/assets/PLASMAPOWERORB.png"))
const OVERFLUXPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinCheata/assets/OVERFLUXPOWERORB.png"))
const MANAFLUXPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinCheata/assets/MANAFLUXPOWERORB.png"))
const RADIANTPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinCheata/assets/RADIANTPOWERORB.png"))

const flareTextures = {
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn0=": ["Warning", new Color(0, 0.9, 0.15, 1), 0],
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMyNjQzMiwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQyYmY5ODY0NzIwZDg3ZmQwNmI4NGVmYTgwYjc5NWM0OGVkNTM5YjE2NTIzYzNiMWYxOTkwYjQwYzAwM2Y2YiIKICAgIH0KICB9Cn0=": ["Alert", new Color(0, 0.5, 0.95, 1), 1],
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0=": ["SOS", new Color(0.6, 0, 0.95, 1), 2]
}

const orbPriorities = {  
  "null": 0,
  "radiant": 1,
  "mana": 2,
  "warning": 3,
  "overflux": 4,
  "alert": 5, 
  "plasma": 6,
  "sos": 7,
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

let activeOrbs = []
let activeFlare
const flareMove = new Gui()
let flareType = undefined
let nearbyFlares = []

register("step", () => {
  if (!data.general.deployableTimer.toggle) return
  getOrb()
  const flares = []
  World.getAllEntities().filter(e => e && e.getEntity() instanceof EntityArmorStand).forEach(e => {
    if (nearbyFlares.find(f => f[0] == e.getEntity().func_145782_y())) return
    const texture = getCtEntityHelmetTexture(e)
    const type = flareTextures[texture]
    if (type) {
      flares.push([type, e])
    }
  })
  activeOrbs.sort((a, b) => orbPriorities[b.orb] - orbPriorities[a.orb])
  flares.sort((a, b) => orbPriorities[b] - orbPriorities[a]).forEach(flare => {
    const [type, flareEnt] = flare
    const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
    const [x1, y1, z1] = [flareEnt.getX(), flareEnt.getY(), flareEnt.getZ()]
    const dist = getDistance3D(x, y, z, x1, y1, z1)
    if (dist <= 40) {
      nearbyFlares.push([flareEnt.getEntity().func_145782_y(), type, Date.now(), flareEnt])
    }
  })
}).setFps(10)

const getOrb = () => {
  Object.keys(orbPriorities).forEach((orb) => {
    World.getAllEntitiesOfType(EntityArmorStand).forEach((armorStand) => {
      const name = armorStand.getName().removeFormatting();
      if (name.startsWith(orb.capitalize())) {
        const match = name.match(/(.+) (\d+)s/);
        const timeRemaining = parseInt(match[2]);
          if (armorStand.distanceTo(Player.asPlayerMP()) <= 20) {
            activeOrbs.push({ 
              orb: orb, 
              time: timeRemaining,
              entity: armorStand
            })
          }
      }
    });
  });
}


register("renderOverlay", () => {
  if (!data.general.deployableTimer.toggle) return
  updateFlares();
  
  if (flareMove.isOpen()) {
    fontopenbold.drawStringWithShadow("SOS", flaredata.flareX, flaredata.flareY, new Color(0.6, 0, 0.95, 1));
    fontopenbold.drawStringWithShadow("180s", flaredata.flareX, flaredata.flareY + 15 , new Color(0, 0.9, 0.15, 1));
    firework.draw(flaredata.flareX - 40, flaredata.flareY - 9, 3)
  } else if (data.general.deployableTimer.toggle) {
    const flareData = nearbyFlares.sort((a, b) => b[2] - a[2]).find(f => f[3].distanceTo(Player.asPlayerMP()) <= 40)

    const activeOrb = activeOrbs[0]
    const activeOrbTime = activeOrb?.time
    if (!flareData) {
      if (activeOrb) {
        drawOrb(activeOrb, activeOrbTime)
        return
      }
      flareType = undefined
      return
    }
    
    const flareType = flareData[1]
    const timePassed = Date.now() - flareData[2]
    const timeRemaining = ((180000 - timePassed) / 1000).toFixed(0)
    
    if (activeOrb) {
      if (orbPriorities[activeOrb] > orbPriorities[activeFlare]) {
        drawOrb(activeOrb, activeOrbTime)
      } else {
        drawFlare(flareType, timeRemaining)
      }
    } else {
      drawFlare(flareType, timeRemaining)
    }
  }
});

const drawOrb = (orb, time) => {
  if (time === 0) return
  orb = orb.orb
  let activeOrbImage = orb === 'plasma' ? PLASMAPOWERORB : 
  orb === 'mana' ? MANAFLUXPOWERORB : 
  orb === 'radiant' ? RADIANTPOWERORB : 
  orb === 'overflux' ? OVERFLUXPOWERORB : null
  activeOrbImage?.draw(flaredata.flareX, flaredata.flareY, 22, 22)
  fontopenbold.drawStringWithShadow(`${time}s`, flaredata.flareX + 25, flaredata.flareY + 2, time >= 30 ? Color.GREEN : time >= 10 ? Color.YELLOW : Color.RED);
}

const drawFlare = (flare, time) => {
  const flareString = flare[0]
  const color = flare[1]
  firework.draw(flaredata.flareX - 40, flaredata.flareY - 9, 3)
  fontopenbold.drawStringWithShadow(flareString.capitalize(), flaredata.flareX, flaredata.flareY, color);
  fontopenbold.drawStringWithShadow(`${parseInt(time)}s`, flaredata.flareX, flaredata.flareY + 15, 
  time > 50 ? new Color(0, 0.9, 0.15, 1) : time > 20 ? new Color(0.9, 0.8, 0, 1) : new Color(0.95, 0, 0, 1));
}

function updateFlares() {
  activeOrbs.forEach(orb => {
    if (orb.entity?.distanceTo(Player.asPlayerMP()) > 20 || orb.time <= 1 || orb.entity?.isDead()) {
      activeOrbs.splice(activeOrbs.indexOf(orb), 1)
    }
  })
  
  nearbyFlares.forEach(flare => {
    if (Date.now() - flare[2] > 180000 || flare[3].isDead()) {
      nearbyFlares.splice(nearbyFlares.indexOf(flare), 1)
    }
  })
};

register("worldLoad", () => {
  flareType = undefined
  nearbyFlares.length = 0
})