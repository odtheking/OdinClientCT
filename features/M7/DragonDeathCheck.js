import request from "../../../requestV2"
import { modMessage } from "../../utils/utils"

let webhook, lastx, lasty, lastz, lastColor
let entityColors = {}


register("gameLoad", () => request("https://pastebin.com/raw/XSxKVbvR").then(s => webhook = s))

const dragonLocations = [
  {x:85,y:14,z:56,color:"Orange"},
  {x:27,y:14,z:59,color:"Red"},
  {x:27,y:14,z:94,color:"Green"},
  {x:84,y:14,z:94,color:"Blue"},
  {x:56,y:14,z:125,color:"Purple"}
]

function findColor(x, y, z) {return dragonLocations.find(l => l.x === x && l.y === y && l.z === z)?.color}

register(net.minecraftforge.event.entity.EntityJoinWorldEvent, (event) => {
  const e = event.entity
  if (new Entity(e).getName() != "Ender Dragon") return
  const color = findColor(e.field_70165_t, e.field_70163_u, e.field_70161_v)
  if (!color) return
  entityColors[e.func_145782_y()] = color
})

register("entityDeath", (e) => {
  const entityId = e.getEntity().func_145782_y()
  if (!entityColors[entityId] || e.getName() != "Ender Dragon") return
  [lastx, lasty, lastz, lastColor] = [e.x.toFixed(1), e.y.toFixed(1), e.z.toFixed(1), entityColors[entityId]]
  delete entityColors[entityId]
})

register("chat", (message) => {
  if (message != "[BOSS] Wither King: Oh, this one hurts!" && message != "[BOSS] Wither King: I have more of those" && message != "[BOSS] Wither King: My soul is disposable." || !lastx || !lasty || !lastz) return
  modMessage(lastColor + " Counted!")
  if (lastColor == "Purple") return
  request({
    url: webhook,
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'User-agent': 'Mozilla/5.0'
    },
    body: {
      username: "OdinClient",
      avatar_url: "https://s.namemc.com/2d/skin/face.png?id=db7b65d7270a33d6&scale=4",
      content: "",
      embeds: [
        {
          title: "Dragon Counted!",
          color: 4081151,
          description: `Color: ${lastColor}\nx: ${lastx}\ny: ${lasty}\nz: ${lastz}`
        }
      ]
    }
  })
}).setCriteria('${message}')

register("worldLoad", () => {
  lastx,lasty,lastz = undefined
})