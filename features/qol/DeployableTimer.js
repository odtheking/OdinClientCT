import PogObject from "../../../PogData"
import { Color, EntityArmorStand, getDistance3D } from "../../../BloomCore/utils/Utils";
import { File, getCtEntityHelmetTexture, getMcEntityHelmetTexture, modMessage, opensansbold } from "../../utils/utils";
import { data } from "../../gui";

//Flare timer
const flareMove = new Gui()

const flaredata = new PogObject("OdinClient", {
  flareX: 50,
  flareY: 50,
}, "config/featuredata.json")

register("dragged", (dx, dy, x, y) => {
  if (flareMove.isOpen()) {
    flaredata.flareX += dx
    flaredata.flareY += dy
    flaredata.save()
  }
})

register("command", () => {
  flareMove.open()
}).setName("moveflare")

register("command", () => {
  modMessage(deployableArray?.[0] ?? "No flare found")
}).setName("getflare")

const firework = new Item("fireworks")
const PLASMAPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinClient/assets/PLASMAPOWERORB.png"))
const OVERFLUXPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinClient/assets/OVERFLUXPOWERORB.png"))
const MANAFLUXPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinClient/assets/MANAFLUXPOWERORB.png"))
const RADIANTPOWERORB = new Image(new File("./config/ChatTriggers/modules/OdinClient/assets/RADIANTPOWERORB.png"))

const flareTextures = {
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn0=": "Warning",
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMyNjQzMiwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQyYmY5ODY0NzIwZDg3ZmQwNmI4NGVmYTgwYjc5NWM0OGVkNTM5YjE2NTIzYzNiMWYxOTkwYjQwYzAwM2Y2YiIKICAgIH0KICB9Cn0=": "Alert",
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0=": "SOS"
}

const flareColors = {
  "SOS": new Color(0.6, 0, 0.95, 1), 
  "Alert": new Color(0, 0.5, 0.95, 1),
  "Warning": new Color(0, 0.9, 0.15, 1),
}

const orbPriorities = {  
  "null": 0,
  "Radiant": 1,
  "Mana": 2,
  "Warning": 3,
  "Overflux": 4,
  "Alert": 5, 
  "Plasma": 6,
  "Sos": 7,
};

const deployableArray = []
const orbKeys = Object.keys(orbPriorities);

register("step", () => {
  if (!data.qol.deployableTimer.toggle) return

  const deployables = World.getAllEntitiesOfType(EntityArmorStand)
    .filter(entity => Player.asPlayerMP().distanceTo(entity) < 40 && entity.getTicksExisted() <= 3600);

  for (let i = 0; i < deployables.length; i++) {
    const deployable = deployables[i];
    if (deployableArray.find(deployableEntry => deployableEntry[0] == deployable.getEntity().func_145782_y())) continue;

    const deployableName = deployable.getName().removeFormatting();
    const time = parseInt(deployableName.substr(-3, 2));

    if (!isNaN(time)) {
      for (let j = 0; j < orbKeys.length; j++) {
        const orb = orbKeys[j];
        if (deployableName.startsWith(orb)) {
          deployableArray.push({
            priority: orb,
            time: time,
            entity: deployable,
            type: "orb"
          });
        }
      }
    } else {
      const texture = getCtEntityHelmetTexture(deployable);
      if (texture) {
        const flareType = flareTextures[texture];
        if (flareType) {
          deployableArray.push({
            priority: flareType,
            time: 180,
            entity: deployable,
            type: "flare"
          });
        }
      }
    }
  }

  deployableArray.sort((a, b) => orbPriorities[b.priority] - orbPriorities[a.priority]);
}).setFps(7);

const updateDeployables = () => {
  if (deployableArray.length == 0) return;

  for (let i = 0; i < deployableArray.length; i++) {
    const deployable = deployableArray[i];

    if (deployable.entity.isDead()) {
      deployableArray.splice(i, 1);
      continue;
    }

    if (deployable.type == "orb" && Player.asPlayerMP().distanceTo(deployable.entity) > 20) {
      deployableArray.splice(i, 1);
      continue;
    }

    if (deployable.type == "flare" && Player.asPlayerMP().distanceTo(deployable.entity) > 40) {
      deployableArray.splice(i, 1);
      continue;
    }
  }
};

register("renderOverlay", () => {
  updateDeployables();
  if (flareMove.isOpen()) {
    drawFlare("SOS", "180");
  } else if (data.qol.deployableTimer.toggle) {
    if (deployableArray.length == 0) return;

    const deployable = deployableArray[0];
    if (deployable.type == "orb") {
      drawOrb(deployable.priority, deployable.time);
    } else if (deployable.type == "flare") {
      const timeRemaining = Math.round(deployable.time - (deployable.entity.getTicksExisted() / 20));
      drawFlare(deployable.priority, timeRemaining);
    }
  }
});


const drawOrb = (orb, time) => {
  if (time === 0) return
  let activeOrbImage = orb === 'Plasma' ? PLASMAPOWERORB : 
  orb === 'Mana' ? MANAFLUXPOWERORB : 
  orb === 'Radiant' ? RADIANTPOWERORB : 
  orb === 'Overflux' ? OVERFLUXPOWERORB : null
  activeOrbImage?.draw(flaredata.flareX, flaredata.flareY, 22, 22)
  opensansbold.drawStringWithShadow(`${time}s`, flaredata.flareX + 25, flaredata.flareY + 2, time >= 30 ? Color.GREEN : time >= 10 ? Color.YELLOW : Color.RED);
}

const drawFlare = (flare, time) => {
  const color = flareColors[flare]
  firework.draw(flaredata.flareX - 40, flaredata.flareY - 9, 3)
  opensansbold.drawStringWithShadow(flare, flaredata.flareX, flaredata.flareY, color);
  opensansbold.drawStringWithShadow(`${time}s`, flaredata.flareX, flaredata.flareY + 15, 
  time > 50 ? new Color(0, 0.9, 0.15, 1) : time > 20 ? new Color(0.9, 0.8, 0, 1) : new Color(0.95, 0, 0, 1));
}


