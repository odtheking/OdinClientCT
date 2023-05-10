import { EntityArmorStand } from "../../../BloomCore/utils/Utils"
import PogObject from "../../../PogData/index.js"
import RenderLib from "../../../RenderLib/index.js"
import { data } from "../../gui"
import { Executors, getEntityRenderParams, modMessage, noSqrt3DDistance } from "../../utils/utils.js"
//legit esp

register("command", (...args) => {

    if (!args || args.length < 2) { 
        modMessage("Incorrect usage. /esp add/remove <entity>")
        return
    }
    const entity = args[1].toLowerCase()
    switch (args[0]) {
        case "add":
            if (esplist.names.includes(entity)) {
                modMessage("Couldn't add " + entity + " to the list")
            } else {
                esplist.names.push(entity)
                modMessage(entity + " has been added to the list")
                esplist.save()
                reloadMap()
            }
            break
        case "remove":
            if (!esplist.names.includes(entity)) {
                modMessage("Couldn't remove " + entity + " from the list")
            } else {
                esplist.names = esplist.names.filter(ent => ent !== entity)
                modMessage(entity + " has been removed from the list")
                esplist.save()
                reloadMap()
            }
            break
    }
}).setName("esp")

register("command", () => {
    modMessage(esplist.names)
}).setName("getlist")


const esplist = new PogObject("OdinClient", {
    names: []
}, "config/featuredata.json")


function reloadMap() {
    entitiesToRender.clear()
    const allEntities = World.getAllEntitiesOfType(EntityArmorStand);
    for (let i = 0; i < allEntities.length; i++) {
        const stand = allEntities[i];
      const mcStand = stand.getEntity()
      const name = stand.getName().removeFormatting().toLowerCase()
      // Check if the entity's name is in the esplist
      if (!esplist.names.some(espName => name.includes(espName))) return
      const entities = World.getWorld().func_72839_b(mcStand, mcStand.func_174813_aQ().func_72314_b(1, 5, 1)).filter(e => e && !(e instanceof EntityArmorStand) && e != Player.getPlayer())
        .sort((a, b) => noSqrt3DDistance(a, mcStand) - noSqrt3DDistance(b, mcStand))
      if (entities.length == 0) return
      entitiesToRender.set(mcStand.func_145782_y(), entities[0])
    }
  }

register("worldLoad", () => {
    reloadMap()
})

let entitiesToRender = new Map() // key: ArmorStand, value: McEntity

register('step', () => {
    if (!data.general.highLight.toggle) return
    const allEntities = World.getAllEntitiesOfType(EntityArmorStand);
    for (let i = 0; i < allEntities.length; i++) {
        const stand = allEntities[i];
        const mcStand = stand.getEntity()
        const matchingEntity = entitiesToRender.get(mcStand.func_145782_y())
        if (matchingEntity && matchingEntity.field_70128_L) {
            entitiesToRender.delete(mcStand.func_145782_y())
        } else if (matchingEntity) continue;
        const name = stand.getName().removeFormatting().toLowerCase()
        if (!esplist.names.some(espName => name.includes(espName))) {
            entitiesToRender.delete(mcStand.func_145782_y())
            continue
        }
        const entities = World.getWorld().func_72839_b(mcStand, mcStand.func_174813_aQ().func_72314_b(1, 5, 1)).filter(e => e && !(e instanceof EntityArmorStand) && e != Player.getPlayer())
            .sort((a, b) => noSqrt3DDistance(a, mcStand) - noSqrt3DDistance(b, mcStand))
        if (entities.length == 0) continue;
        entitiesToRender.set(mcStand.func_145782_y(), entities[0])
    }
}).setFps(2)


const espLoop = Executors.newSingleThreadExecutor();
espLoop.execute(() => {
    register("renderWorld", (partialTicks) => {
        if (!data.general.highLight.toggle) return;

        for (const [key, value] of entitiesToRender.entries()) {
            if (value && value.field_70128_L) {
                entitiesToRender.delete(key);
                continue;
            }
            const [x, y, z, w, h] = getEntityRenderParams(value, partialTicks);
            RenderLib.drawEspBox(x, y, z, w, h, 1, 1, 0, 1, false);
        }
    });
});