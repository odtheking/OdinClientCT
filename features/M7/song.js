import { modMessage } from "../../utils/utils"
import { data } from "../../gui"

/* 
the files need to be .ogg type 
make sure the file name is only p1/p2/p3/p4/p5 based on which phase you want to change
this website is very helpful: https://mp3cut.net/change-volume
to make it to ogg type and make louder 
the sounds are controleled by the main sound switch in game so if its low for you thats why
all sounds arent set except p1 and p5
make sure u have all the file names else it might crash u
*/

let sounds = {};

register("worldLoad", () => {
    sounds.p1 = new Sound({source: "p1.ogg", priority: true, loop: true, stream: true}).setVolume(1.0);
    sounds.p2 = new Sound({source: "p2.ogg", priority: true, loop: true, stream: true}).setVolume(1.0);
    sounds.p3 = new Sound({source: "p3.ogg", priority: true, loop: true, stream: true}).setVolume(1.0);
    sounds.p4 = new Sound({source: "p4.ogg", priority: true, loop: true, stream: true}).setVolume(1.0);
    sounds.p5 = new Sound({source: "p5.ogg", priority: true, loop: true, stream: true}).setVolume(1.0);
});

register("chat", () => {
    if (!data.dungeons.customSounds.toggle) return;
    sounds.p1?.play();
}).setCriteria("[BOSS] Maxor: WELL WELL WELL LOOK WHO'S HERE!");

register("chat", () => {
    if (!data.dungeons.customSounds.toggle) return;
    sounds.p1.stop();
    sounds.p2?.play();
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.");

register("chat", () => {
    if (!data.dungeons.customSounds.toggle) return;
    sounds.p2.stop();
    sounds.p3?.play();
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");

register("chat", () => {
    if (!data.dungeons.customSounds.toggle) return;
    sounds.p3.stop();
    sounds.p4?.play();
}).setCriteria("[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.");

register("chat", () => {
    if (!data.dungeons.customSounds.toggle) return;
    sounds.p4.stop();
    sounds.p5?.play();
}).setCriteria("[BOSS] Wither King: You.. again?");

register("worldLoad", () => {
    try {
        sounds.p1?.stop();
    } catch (error) {

    }
    try {
        sounds.p2?.stop();
    } catch (error) {

    }
    try {
        sounds.p3?.stop();
    } catch (error) {

    }
    try {
        sounds.p4?.stop();
    } catch (error) {

    }
    try {
        sounds.p5?.stop();
    } catch (error) {

    }
});
