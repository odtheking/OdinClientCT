import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import { data } from "../../gui"
import { BossStatus } from "../../utils/utils"

const mobAmounts = {
    "1": 13,
    "2": 14,
    "3": 15,
    "4": 16,
    "5": 17,
    "6": 18,
    "7": 19,
}

let name
register("tick", () => {
    if (!data.dungeons.bloodTracker.toggle) return
    if (!Dungeon.inDungeon) return
    const bossName = BossStatus.field_82827_c
    if (bossName.removeFormatting() != "The Watcher") return
    const health = BossStatus.field_82828_a
    const floor = Dungeon.floor.toString().substring(1)
    if (health < 0.05) {
        name = undefined
        return
    }
    amount = mobAmounts[floor]
    name = ` ${Math.round(amount*health)}/${amount}`
})

register("renderbosshealth", () => {
    if (!Dungeon.inDungeon || BossStatus.field_82827_c.removeFormatting() != "The Watcher" || !name) return
    BossStatus.field_82827_c += name
})