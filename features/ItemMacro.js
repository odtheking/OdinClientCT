import { data } from "../stuff/guidk"
import { modMessage, swapAndRightClick } from "../utils";
const sneakBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
//const first = new KeyBind("Slot 1", Keyboard.KEY_NONE, "Auto Wardrobe").registerKeyPress(() => swapToSlot(1))
const keyaots = new KeyBind("Aots macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {toggled = !toggled;  modMessage("Item macro swap is now: " + toggled)})
const keyspray = new KeyBind("Ice Spray macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => swapAndRightClick("Ice Spray Wand")) 
const keyeye = new KeyBind("Precursor macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {precurserswitch = !precurserswitch; modMessage("Precursor eye is now: " + precurserswitch); sneakBind.setState(false)});
const keyveil = new KeyBind("Fire Veil macro", Keyboard.KEY_NONE, "OdinClient").registerKeyPress(() => {veilswitch = !veilswitch;modMessage("Fire veil is now: " + veilswitch)})


// Item Macro
let toggled = false
let precurserswitch = false
let veilswitch = false
let lastUseTime = 0;

register("tick", () => {
    if (!data.qol.options[1]) return
    if (!toggled) return
    swapAndRightClick("Axe of the Shredded")
    swapAndRightClick("Soul Whip")
})

register("tick", (ticks) => {
    if (!data.qol.options[1]) return 
    if (!precurserswitch) return
    if (Client.isInGui()) return
    
    sneakBind.setState(ticks % 2 !== 0);
}) 

register("tick", (ticks) => {
    if (!data.qol.options[1]) return;
    if (!veilswitch) return;

    const currentTime = new Date().getTime();
    if (currentTime - lastUseTime < 4500) return;

    swapAndRightClick("Fire Veil Wand");
    lastUseTime = currentTime;
});
