import { data } from "../stuff/guidk"
import { modMessage, swapAndRightClick } from "../utils";
const sneakBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
const keyaots = new KeyBind("Aots macro", Keyboard.KEY_NONE, "OdinClient");
const keyspray = new KeyBind("Ice Spray macro", Keyboard.KEY_NONE, "OdinClient");
const keyeye = new KeyBind("Precursor macro", Keyboard.KEY_NONE, "OdinClient");
const keyveil = new KeyBind("Fire Veil macro", Keyboard.KEY_NONE, "OdinClient");


// Item Macro
let toggled = false

register("tick", () => {
    if (!data.qol.options[1]) return
    if (keyaots.isPressed()) {
        toggled = !toggled
        modMessage("Item macro swap is now: " + toggled)
    }

    if (!toggled) return
    swapAndRightClick("Axe of the Shredded")
    swapAndRightClick("Soul Whip")
})


register("tick", () => {
    if (!data.qol.options[1]) return
    if (keyspray.isPressed()) {
        swapAndRightClick("Ice Spray Wand")
    }
})


let precurserswitch = false

register("tick", (ticks) => {
    if (!data.qol.options[1]) return
    if (keyeye.isPressed()) {
        precurserswitch = !precurserswitch
        modMessage("Precursor eye is now: " + precurserswitch)
        sneakBind.setState(false)
    } 
    if (!precurserswitch) return
    if (ticks % 2 == 0) {
        sneakBind.setState(false)
    } else {
        sneakBind.setState(true)
    }
}) 

let veilswitch = false
let lastUseTime = 0;

register("tick", (ticks) => {
    if (!data.qol.options[1]) return;
    if (keyveil.isPressed()) {
        veilswitch = !veilswitch;
        modMessage("Fire veil is now: " + veilswitch);
    }
    if (!veilswitch) return;

    const currentTime = new Date().getTime();
    if (currentTime - lastUseTime < 4500) return;

    swapAndRightClick("Fire Veil Wand");
    lastUseTime = currentTime;
});
