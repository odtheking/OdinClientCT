import { data } from "../../gui"
import { modMessage, swapAndRightClick } from "../../utils/utils"
const sneakBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
//const first = new KeyBind("Slot 1", Keyboard.KEY_NONE, "Auto Wardrobe").registerKeyPress(() => swapToSlot(1))
const keyaots = new KeyBind("Aots macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {toggled = !toggled;  modMessage("Item macro swap is now: " + toggled)})
const keyspray = new KeyBind("Ice Spray macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => swapAndRightClick("Ice Spray Wand")) 
const keyeye = new KeyBind("Precursor macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {precurserswitch = !precurserswitch; modMessage("Precursor eye is now: " + precurserswitch); sneakBind.setState(false)});
const keyveil = new KeyBind("Fire Veil macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {veilswitch = !veilswitch ;modMessage("Fire veil is now: " + veilswitch)})
const keywand = new KeyBind("Wand macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {wandswitch = !wandswitch ;modMessage("Auto wand is now: " + wandswitch)})


// Item Macro
let toggled = false
let precurserswitch = false
let veilswitch = false
let wandswitch = false
let lastUseTime = 0;
let lastUseTime1 = 0;



register("tick", (ticks) => { 
    if (toggled) {
        swapAndRightClick("Axe of the Shredded")
        swapAndRightClick("Soul Whip")
    }
    if (precurserswitch) {
        if (Client.isInGui()) return
        sneakBind.setState(ticks % 2 !== 0);
    }
    if (veilswitch) {
        const currentTime = new Date().getTime();
        if (currentTime - lastUseTime < 4500) return;
        swapAndRightClick("Fire Veil Wand");
        lastUseTime = currentTime;
    }
    if (wandswitch) {
        const currentTime1 = new Date().getTime();
        if (currentTime1 - lastUseTime1 < 6000) return;
        swapAndRightClick("Wand of Atonement");
        lastUseTime1 = currentTime1;
    }
})



