import { modMessage } from "../../utils";

/* 
HELLO
the files need to be .ogg type 
make sure the file name is only p1/p2/p3/p4/p5
depends on which phase u want it on
i recommend using this website https://mp3cut.net/change-volume
for make it both to ogg type and make it the loudest as possible 
the sounds are controleled by the main sound switch in game so if its low for u make it louder in outside programs
thats it i think
currently beside p1 all of te files are a pling sound 
always make sure u have all the file names else it might crash u
*/
const p1 = new Sound({source: "p1.ogg"})
const p2 = new Sound({source: "p2.ogg"});
const p3 = new Sound({source: "p3.ogg"});
const p4 = new Sound({source: "p4.ogg"});
const p5 = new Sound({source: "p5.ogg"});

register("chat", () => {
    p1?.play()
}).setCriteria("[BOSS] Maxor: WELL WELL WELL LOOK WHO’S HERE!")

register("chat", () => {
    p1.stop()
    p2?.play()
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    p2.stop()
    p3?.play()
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", () => {
    p3.stop()
    p4?.play()
}).setCriteria("[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.")

register("chat", () => {
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