import { EntityArmorStand } from "../../../BloomCore/utils/Utils"
import { alert, modMessage, partyMessage } from "../../utils"

register("step", () => {
    if (World.getAllEntitiesOfType(EntityArmorStand).find(mort => mort.getName().includes('Trinity') )) {
        modMessage("TRINITY?")
        alert("TRINITY")
        partyMessage("TRINITY FOUND LEAP TO ME!")
    }
}).setFps(1)