import { data } from "../stuff/guidk";
import { modMessage } from "../utils";

let ghosting = false;

register("chat", (npc, event) => {
    if (!data.legit.abiphoneGhoster.toggle) return
    modMessage(`Ghosted a call from ${npc}!`);
    ghosting = true;
    setTimeout(() => {
        ghosting = false
    }, 5000);
    cancel(event);

}).setCriteria("✆ ${npc} ✆ ");

register("chat", (rings, event) => {
    if (!data.legit.abiphoneGhoster.toggle || !ghosting) return;
    cancel(event);
}).setCriteria("✆ ${rings} [PICK UP]");

register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (!data.legit.abiphoneGhoster.toggle || !ghosting) return;
    if (name.equals("note.pling")) cancel(event);
})