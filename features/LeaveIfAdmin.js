import Party from "../../BloomCore/Party"

register("step", () => {
    if (!World.isLoaded()) return
    members = Object.values(Party.members)
    members.forEach(member => {
        if (member.includes("[Admin]") || member.includes("[GM]")) ChatLib.command("p leave")
    });
}).setFps(1)