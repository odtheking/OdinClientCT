import Skyblock from "../../BloomCore/Skyblock";
import { data } from "../stuff/guidk"
import { modMessage} from "../utils";

//bonsai being lazy


register("step", () => {
    if (Skyblock.inSkyblock) return
    modMessage("WTF NOT IN SB???")
    ChatLib.command("play sb")
    modMessage("NOW U R IN STUPOID LAZY MOTHERFUCKER")
}).setFps(1)

register('tick', () => {
    let container = Player.getContainer()
    if (container.getName() === "Wood Chest") {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes('Open Reward Chest'))
        container.click(index, false, "MIDDLE")
    }
})