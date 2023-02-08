import Skyblock from "../../BloomCore/Skyblock";
import { data } from "../stuff/guidk"
import { modMessage} from "../utils";

//bonsai being lazy
/*
register("worldLoad", () => {
    setTimeout(() => {
        if (Skyblock.inSkyblock) {
            modMessage("In SkyBlock")
        } else {
            modMessage("Not in Skyblock. Joining now...")
            ChatLib.command("play sb")
        }
    }, 1000);
    
})
    
register('tick', () => {
    let container = Player.getContainer()
    if (container && container.getName() === "Wood Chest") {
        let itemIndex = container.getItems().findIndex(item => item && item.getName() && item.getName().includes('Open Reward Chest'))
        if (itemIndex !== -1) {
            container.click(itemIndex, false, "MIDDLE")
        }
    }
})*/