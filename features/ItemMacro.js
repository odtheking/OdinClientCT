import { data } from "../stuff/guidk"
import { modMessage, swapAndRightClick } from "../utils";
const sneakBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
const keyaots = new KeyBind("Aots macro", Keyboard.KEY_NONE, "OdinClient");
const keyspray = new KeyBind("Ice Spray macro", Keyboard.KEY_NONE, "OdinClient");
const keyeye = new KeyBind("Precursor macro", Keyboard.KEY_NONE, "OdinClient");


// Item Macro
let toggled = false

register("tick", () => {
    if (!data.qolOptions[1]) return
    if (keyaots.isPressed()) {
        toggled = !toggled
        modMessage("Item macro swap is now: " + toggled)
    }

    if (!toggled) return
    const items = Player?.getInventory()?.getItems()
    const index = items?.findIndex(item => item?.getName()?.includes("Axe of the Shredded"))
    const index1 = items?.findIndex(item => item?.getName()?.includes("Soul Whip"))

    if (index >= 0 && index < 9) {
        swapAndRightClick(index)
    }
    if (index1 >= 0 && index1 < 9) {
        swapAndRightClick(index1)
    }
})



register("tick", () => {
    if (!data.qolOptions[1]) return
    if (keyspray.isPressed()) {
        index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes("Ice Spray Wand"))
        if (index == -1) return
        swapAndRightClick(index)
    }
})


let precurserswitch = false

register("tick", (ticks) => {
    if (!data.qolOptions[1]) return
    if (keyeye.isPressed()) {
        precurserswitch = !precurserswitch
        modMessage("Precursor eye is now: " + precurserswitch)
        sneakBind.setState(false)
    }
    if (!precurserswitch) return
    if (ticks % 3 == 0) {
        new Thread(() => {
            sneakBind.setState(false)
            Thread.sleep(50)
            sneakBind.setState(true)
        }).start()
    }
}) 