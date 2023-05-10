import { data } from "../../gui";


/* 
the files need to be .ogg type 
make sure the file name is only p1/p2/p3/p4/p5 based on which phase you want to change
this website is very helpful: https://mp3cut.net/change-volume
to make it to ogg type and make louder 
the sounds are controleled by the main sound switch in game so if its low for you thats why
all sounds are a pling except p1 
make sure u have all the file names else it might crash u
*/

let sounds = [];
register("worldLoad", () => Array.from({length: 5}, (_, i) => sounds[i].setVolume(data.dungeons.customSounds.volume/100)).setDelay(1.0))

const messages = [
    "[BOSS] Maxor: WELL WELL WELL LOOK WHO'S HERE!",
    "[BOSS] Storm: Pathetic Maxor, just like expected.",
    "[BOSS] Goldor: Who dares trespass into my domain?",
    "[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.",
    "[BOSS] Wither King: You.. again?",
]

register("chat", (msg) => {
    if (!messages.includes(msg) || !data.dungeons.customSounds.toggle) return
    const index = messages.indexOf(msg)
    sounds[index]?.play()
    if (index > 0) sounds[index-1]?.stop()
}).setChatCriteria("${msg}")

register("worldLoad", () => {
    try {
        sounds.forEach(s => s.stop)
    } catch (error) {}
})