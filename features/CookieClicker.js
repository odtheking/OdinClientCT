import { data } from "../stuff/guidk"

// Cookie Clicker
register('tick', () => {
    if (!data.qol.cookieClicker.toggle) return
    let container = Player.getContainer()
    if (!container) return
    if (container?.getName()?.startsWith('Cookie Clicker')) {
        container.click(13, false, "MIDDLE")
    }
})

register('soundPlay', (pos, name, vol, pitch, category, event) => {
    if (!data.qol.cookieClicker.toggle) return
    let container = Player.getContainer()
    if (container?.getName()?.includes('Cookie Clicker v')) {
        if (name == 'random.eat' && vol == 1) {
            cancel(event)
        }
    }
})