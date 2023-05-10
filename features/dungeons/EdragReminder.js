import { data } from "../../gui";
import { modMessage, alert} from "../../utils/utils";

//edrag alart

register("chat", () => {
    if (!data.dungeons.edragReminder.toggle) return
    alert("&3Swap to edrag!")
    modMessage("Get your edrag out!")
}).setCriteria("[BOSS] Wither King: You.. again?")