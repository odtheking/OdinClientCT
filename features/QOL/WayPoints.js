import { getPlayerCoords } from "../../../BloomCore/utils/Utils";
import { data } from "../../gui";
import { renderCustomBeacon } from "../../utils/utils";

const colors = [
    {r: 37, g: 245, b: 252},
    {r: 242, g: 180, b: 36},
    {r: 124, g: 252, b: 0},
    {r: 0, g: 100, b: 0},
    {r: 232, g: 28, b: 167},
]

let waypoints = []
const sixtySecondBeacon = (ign, xPos, yPos, zPos) => {
    let color = colors[Math.floor(Math.random() * colors.length)]
    waypoints.push([
        ign, 
        parseInt(xPos) + 0.5, 
        parseInt(yPos), 
        parseInt(zPos) + 0.5,
        color.r,
        color.g,
        color.b,
        1,
    ])
    setTimeout(() => {
        waypoints.shift()
    }, 60000);
}

register("chat", (rank, player, x, y, z, loc) => {
    name = getColorFromRank(rank) + player
    sixtySecondBeacon(name,x,y,z)
}).setCriteria(/Party > (\[.+\])? (.{0,16}): Vanquisher spawned at: (-?\d+) (-?\d+) (-?\d+) (.+)/)

register("chat", (rank, player, location, x, y, z) => {
    name = getColorFromRank(rank) + player
    sixtySecondBeacon(name, x,y,z)
}).setCriteria(/Party > (.+)?(.{0,16}): Current area: (.+). X: (-?\d+) Y: (-?\d+) Z: (-?\d+)/)

register("chat", (rank, player, x, y, z) => {
    name = getColorFromRank(rank) + player
    sixtySecondBeacon(name, x,y,z)
}).setCriteria("Party > {rank} ${player}: x: ${x} y: ${y} z: ${z}")

register("chat", (rank, player, x, y, z) => {
    name = getColorFromRank(rank) + player
    sixtySecondBeacon(name, x, y, z)
}).setCriteria("${rank} ${player}: x: ${x}, y: ${y}, z: ${z}")

register("command", () => {
    [px, py, pz] = getPlayerCoords()
    ChatLib.command(`pc x:${Math.floor(px)}, y:${Math.floor(py)}, z:${Math.floor(pz)}`)
}).setName("ow")

register("renderWorld", () => {
    if (!data.qol.wayPoints.toggle) return
    if (waypoints.length == 0) return
    waypoints.forEach(waypoint => {
        renderCustomBeacon(waypoint[0], waypoint[1], waypoint[2], waypoint[3], waypoint[4], waypoint[5], waypoint[6], waypoint[7])
    })
})

const getColorFromRank = (rank) => {
    switch (rank) {
        case "[VIP]":
            return "§a"
        case "[VIP+]":
            return "§a"
        case "[MVP]":
            return "§b"
        case "[MVP+]":
            return "§b"
        case "[MVP++]":
            return "§6"
        default:
            return "§7"
    }
}