import RenderLib from "../../RenderLib/index.js"
import PogObject from "../../PogData/index.js"
import { data } from "../stuff/guidk"
import { EntityArmorStand } from "../../BloomCore/utils/Utils"
import { modMessage } from "../utils.js"

// field_70131_O - Height
// field_70130_N - Width
// net.minecraft.entity.Entity
// float of the entity's heigth and width

// Cheater ESP
register("command", (...args) => {
    if (!data.qol.options[4]) {
        modMessage("Feature is disabled please turn on with /od")
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
                esplist.save()
            }
            break
        case "remove":
            if (!esplist.names.includes(entity)) {
                modMessage("Couldn't remove " + entity + " from the list")
            } else {
                esplist.names = esplist.names.filter(ent => ent !== entity)
                modMessage(entity + " has been removed from the list")
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

let entitiesToRender = []
register('step', () => {
    if (!data.qol.options[4]) return
    entitiesToRender.length = 0
    World.getAllEntitiesOfType(EntityArmorStand.class)
        .filter(e => esplist.names.some(name => e.getName().toLowerCase().includes(name)))
        .map(e => e.getEntity())
        .forEach(e => entitiesToRender.push(World.getWorld().func_72839_b(e, e.func_174813_aQ()).filter(e => !(e instanceof EntityArmorStand))[0]))
}).setFps(10)

register("renderWorld", () => {
    if (!data.qol.options[4]) return
    entitiesToRender.forEach(e => {
        try {
            RenderLib.drawEspBox(e.field_70142_S, e.field_70137_T, e.field_70136_U, e.field_70130_N, e.field_70131_O, 1, 1, 0, 1, true)
        } catch (e) {}
    })
})