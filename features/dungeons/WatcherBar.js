import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { data } from "../../gui"
import { BossStatus, modMessage } from "../../utils/utils"

let name
register("tick", () => {
    if (!data.dungeons.bloodTracker.toggle || !Dungeon.inDungeon || BossStatus.field_82827_c.removeFormatting() != "The Watcher") return
    if (BossStatus.field_82828_a < 0.05) {
        name = undefined
        return
    }
    const amount = parseInt(Dungeon.floor.toString().substring(1)) + 12
    name = ` ${Math.round(amount*BossStatus.field_82828_a)}/${amount}`
})

register("renderBossHealth", () => {
    if (!Dungeon.inDungeon || BossStatus.field_82827_c.removeFormatting() != "The Watcher" || !name) return
    BossStatus.field_82827_c += name
})