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
    if (!data.qolOptions[4]) {
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
    modMessage(esplist.names[1])
}).setName("getlist")

const esplist = new PogObject("OdinClient", {
    names: []
}, "flaredata.json")


let entitiesToRender = []
register('step', () => {
    if (!data.qolOptions[4]) return
    entitiesToRender.length = 0
    const entities = World.getAllEntitiesOfType(EntityArmorStand.class)
    for (let i = 0, len = entities.length; i < len; i++) {
        for (let j = 0; j < esplist.names.length; j++) {
            if (entities[i].getName().toLowerCase().includes(esplist.names[j])) {
                entitiesToRender.push(entities[i])
            }
        }
    }
}).setFps(10)

register("renderWorld", () => {
    if (!data.qolOptions[4]) return
    entitiesToRender.forEach(e => {
        RenderLib.drawEspBox(e.getRenderX(), e.getRenderY() - 2, e.getRenderZ(), 1, 2, 1, 1, 0, 1, true)
        return;
    })
})
