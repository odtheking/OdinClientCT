import request from "../../../requestV2"

let webhook
register("gameLoad", () => {
  request("https://pastebin.com/raw/uCGgntQB").then(stuff => {
    webhook = stuff
  })
})


let lastx
let lasty
let lastz
register("entityDeath", (entity) => {
    if (entity.name != "Ender Dragon") return
    lastx = entity.x.toFixed(1)
    lasty = entity.y.toFixed(1)
    lastz = entity.z.toFixed(1)
})

register("chat", (message) => {
    if (message != "[BOSS] Wither King: Oh, this one hurts!" && message != "[BOSS] Wither King: I have more of those" && message != "[BOSS] Wither King: My soul is disposable.") return
    if (!lastx || !lasty || !lastz) return
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
              description: `x: ${lastx}\ny: ${lasty}\nz: ${lastz}`
            }
          ]
        }
    })
}).setCriteria('${message}')

register("worldLoad", () => {
    lastx = undefined
    lasty = undefined
    lastz = undefined
})