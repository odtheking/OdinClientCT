import { modMessage } from "../../utils/utils"
import { data } from "../../gui"

/* 
the files need to be .ogg type 
make sure the file name is only p1/p2/p3/p4/p5 based on which phase you want to change
this website is very helpful: https://mp3cut.net/change-volume
to make it to ogg type and make louder 
the sounds are controleled by the main sound switch in game so if its low for you thats why
all sounds are a pling except p1 
make sure u have all the file names else it might crash u
*/

let p1
let p2
let p3
let p4
let p5

register("gameLoad", () => {
    p1 = new Sound({source: "p1.ogg", priority: true, loop: true}).setVolume(1.0)
    p2 = new Sound({source: "p2.ogg", priority: true, loop: true}).setVolume(1.0)
    p3 = new Sound({source: "p3.ogg", priority: true, loop: true}).setVolume(1.0)
    p4 = new Sound({source: "p4.ogg", priority: true, loop: true}).setVolume(1.0)
    p5 = new Sound({source: "p5.ogg", priority: true, loop: true}).setVolume(1.0)
})

register("chat", () => {
    if (!data.m7.m7Sounds.toggle) return
    p1?.play()
}).setCriteria("[BOSS] Maxor: WELL WELL WELL LOOK WHO'S HERE!")

register("chat", () => {
    if (!data.m7.m7Sounds.toggle) return
    p1.stop()
    p2?.play()
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    if (!data.m7.m7Sounds.toggle) return
    p2.stop()
    p3?.play()
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", () => {
    if (!data.m7.m7Sounds.toggle) return
    p3.stop()
    p4?.play()
}).setCriteria("[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.")

register("chat", () => {
    if (!data.m7.m7Sounds.toggle) return
    p4.stop()
    p5?.play()
}).setCriteria("[BOSS] Wither King: You.. again?")

register("worldLoad", () => {
    p1?.stop()
    p2?.stop()
    p3?.stop()
    p4?.stop()
    p5?.stop()
})

