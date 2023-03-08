import { EntityArmorStand } from "../../BloomCore/utils/Utils"
import PogObject from "../../PogData/index.js"
import RenderLib from "../../RenderLib/index.js"
import { Executors } from "../java-stuff.js"
import { data } from "../stuff/guidk"
import { getEntityRenderParams, modMessage, noSqrt3DDistance } from "../utils.js"

// field_70131_O - Height
// field_70130_N - Width
// net.minecraft.entity.Entity
// float of the entity's heigth and width

// Cheater ESP
register("command", (...args) => {
    if (!data.qol.options[4]) {
        modMessage("Feature is disabled please turn on with /oc")
        return
    }
    if (!args || args.length < 2) {
        modMessage("Incorrect usage. /esp add/remove <entity>")
        return
    }
    let entity
    (!args[2]) ? entity = args[1].toLowerCase() : entity = args[1].toLowerCase() + " " + args[2].toLowerCase()
    switch (args[0]) {
        case "add":
            if (esplist.names.includes(entity)) {
                modMessage("Couldn't add " + entity + " to the list")
            } else {
                esplist.names.push(entity)
                modMessage(entity + " has been added to the list")
                reloadMap()
                esplist.save()
            }
            break
        case "remove":
            if (!esplist.names.includes(entity)) {
                modMessage("Couldn't remove " + entity + " from the list")
            } else {
                esplist.names = esplist.names.filter(ent => ent !== entity)
                modMessage(entity + " has been removed from the list")
                reloadMap()
                esplist.save()
            }
            break
    }
}).setName("esp").setTabCompletions("add, remove")


register("command", () => {
    modMessage(esplist.names)
}).setName("getlist")

register("command", () => {
    esplist.names = []
    modMessage("Cleared esp list")
}).setName("clearlist")

const esplist = new PogObject("OdinClient", {
    names: []
}, "flaredata.json")

function reloadMap() {
    entitiesToRender.clear()
    World.getAllEntities().forEach(stand => {
      const mcStand = stand.getEntity()
      if (!(mcStand instanceof EntityArmorStand)) return
      const name = stand.getName().removeFormatting().toLowerCase()
      // Check if the entity's name is in the esplist
      if (!esplist.names.some(espName => name.includes(espName))) return
      const entities = World.getWorld().func_72839_b(mcStand, mcStand.func_174813_aQ().func_72314_b(1, 5, 1)).filter(e => e && !(e instanceof EntityArmorStand) && e != Player.getPlayer())
        .sort((a, b) => noSqrt3DDistance(a, mcStand) - noSqrt3DDistance(b, mcStand))
      if (entities.length == 0) return
      entitiesToRender.set(mcStand.func_145782_y(), entities[0])
    })
  }

  
let entitiesToRender = new Map() // key: ArmorStand, value: McEntity

register('step', () => {
    //console.log(entitiesToRender.size)
    if (!data.qol.options[4]) return
    World.getAllEntities().forEach(stand => {
        const mcStand = stand.getEntity()
        if (!(mcStand instanceof EntityArmorStand)) return
        const matchingEntity = entitiesToRender.get(mcStand.func_145782_y())
        if (matchingEntity && matchingEntity.field_70128_L) {
            entitiesToRender.delete(mcStand.func_145782_y())
        } else if (matchingEntity) return
        const name = stand.getName().removeFormatting().toLowerCase()
        // Check if the entity's name is in the esplist
        if (!esplist.names.some(espName => name.includes(espName))) {
            // If the entity's name is not in the esplist, remove it from the entitiesToRender map
            entitiesToRender.delete(mcStand.func_145782_y())
            return
        }
        const entities = World.getWorld().func_72839_b(mcStand, mcStand.func_174813_aQ().func_72314_b(1, 5, 1)).filter(e => e && !(e instanceof EntityArmorStand) && e != Player.getPlayer())
            .sort((a, b) => noSqrt3DDistance(a, mcStand) - noSqrt3DDistance(b, mcStand))
        if (entities.length == 0) return
        entitiesToRender.set(mcStand.func_145782_y(), entities[0])
    })
}).setFps(2)

const espLoop = Executors.newSingleThreadExecutor()
espLoop.execute(() => {
    register("renderWorld", (partialTicks) => {
        if (!data.qol.options[4]) return
        entitiesToRender.forEach((value, key) => {
            if (value && value.field_70128_L) {
                entitiesToRender.delete(key)
                return
            }
            const [x, y, z, w, h] = getEntityRenderParams(value, partialTicks)
            RenderLib.drawEspBox(x, y, z, w, h, 1, 1, 0, 1, true)
        })
    })
})
