package me.odinclient.config

import cc.polyfrost.oneconfig.config.Config
import cc.polyfrost.oneconfig.config.annotations.Checkbox
import cc.polyfrost.oneconfig.config.annotations.HUD
import cc.polyfrost.oneconfig.config.annotations.Slider
import cc.polyfrost.oneconfig.config.annotations.Switch
import cc.polyfrost.oneconfig.config.data.Mod
import cc.polyfrost.oneconfig.config.data.ModType
import me.odinclient.hud.FlareTimerHud
import me.odinclient.hud.PowerDisplayHud

class OdinConfig : Config(Mod("Odin Client", ModType.SKYBLOCK, "/assets/odinclient/OdinClientNoBackground.png"), "odinclient.json") {

    init {
        initialize()
    }

    // Auto

    @Switch(
        name = "Enabled",
        description = "Automatically clicks in the ready GUI",
        category = "Auto",
        subcategory = "Auto Ready",
        size = 2,
    )
    var autoReady = false

    @Switch(
        name = "Enabled",
        description = "Automatically gets in range of mort and opens his GUI",
        category = "Auto",
        subcategory = "Auto Mort",
        size = 2,
    )
    var autoMort = false

    @Switch(
        name = "Enabled",
        description = "Automatically uses class ultimate on certain times",
        category = "Auto",
        subcategory = "Auto Ult",
        size = 2
    )
    var autoUlt = false

    @Switch(
        name = "Enabled",
        description = "Automatically uses wither shield when not full hp",
        category = "Auto",
        subcategory = "Auto Shield",
        size = 2
    )
    var autoShield = false

    @Switch(
        name = "Enabled",
        description = "Automatically uses wish when a temmate is low HP",
        category = "Auto",
        subcategory = "Auto Wish",
        size = 2
    )
    var autoWish = false

    @Switch(
        name = "Enabled",
        description = "Automatically swaps between bonzo and spirit mask",
        category = "Auto",
        subcategory = "Auto Mask",
        size = 2
    )
    var autoMask = false

    @Switch(
        name = "Enabled",
        description = "Automatically equips edrag after relics",
        category = "Auto",
        subcategory = "Auto Edrag",
        size = 2
    )
    var autoEdrag = false

    @Switch(
        name = "Enabled",
        description = "Automatically leaps to a player when writing !tp in party chat",
        category = "Auto",
        subcategory = "Auto Leap",
        size = 2
    )
    var autoLeap = false

    // Legit


    @Switch(
        name = "Enabled",
        description = "Custom party commands use !help in party chat",
        category = "Legit",
        subcategory = "Party Commands",
        size = 2
    )
    var partyCommands = false

    @Switch(
        name = "Enabled",
        description = "Custom guild commands use !help in guild chat",
        category = "Legit",
        subcategory = "Guild Commands",
        size = 2
    )
    var guildCommands = false

    @Switch(
        name = "Enabled",
        description = "Responds to anyone in guild chat saying gm/gn",
        category = "Legit",
        subcategory = "Guild GM",
        size = 2
    )
    var guildGM = false

    @Switch(
        name = "Enabled",
        description = "Creates custom and decently accurate boxes in p5",
        category = "Legit",
        subcategory = "Dragon Boxes",
        size = 2
    )
    var dragonBoxes = false

    @Checkbox(
        name = "Phase",
        description = "Renders the boxes through walls",
        category = "Legit",
        subcategory = "Dragon Boxes"
    )
    var dragonBoxesPhase = false

    @Slider(
        name = "Line Width",
        min = 1f,
        max = 5f,
        category = "Legit",
        subcategory = "Dragon Boxes"
    )
    var dragonBoxesLineWidth = 2f

    @Switch(
        name = "Enabled",
        description = "Shows when a M7 dragon will spawn",
        category = "Legit",
        subcategory = "Dragon Timer",
        size = 2
    )
    var dragonTimer = false

    @Checkbox(
        name = "Draw Text Shadow",
        category = "Legit",
        subcategory = "Dragon Timer",
        size = 1
    )
    var dragonTimerDrawStringShadow = false

    @Checkbox(
        name = "Increase with Distance",
        category = "Legit",
        subcategory = "Dragon Timer",
        size = 1
    )
    var dragonTimerScaleWithDist = false

    @Slider(
        name = "Text Scale",
        description = "Scale may be different if 'Increase with Distance' is off/on",
        category = "Legit",
        subcategory = "Dragon Timer",
        min = 1f,
        max = 1f
    )
    var dragonTimerTextScale = 1f

    @HUD(
        name = "Power Display HUD",
        category = "Legit",
        subcategory = "Power Display",
    )
    var powerDisplayHud: PowerDisplayHud = PowerDisplayHud()


    // General

    @Switch(
        name = "Enabled",
        description = "Automatically alerts when your hype is broken",
        category = "General",
        subcategory = "Broken Hype",
        size = 2
    )
    var brokenHype = false

    @Checkbox(
        name = "Play Sound",
        category = "General",
        subcategory = "Broken Hype",
        size = 1
    )
    var brokenHypePlaySound = true

    @Checkbox(
        name = "Display Title",
        category = "General",
        subcategory = "Broken Hype",
        size = 1
    )
    var brokenHypeShowTitle = true

    @HUD(
        name = "Flare Timer HUD",
        category = "General",
        subcategory = "Flare Timer",
    )
    var flareTimerHUD: FlareTimerHud = FlareTimerHud()

    @Switch(
        name = "Enabled",
        description = "Automatically sends a message in party chat and makes a beacon whenever odinclient/patcher sends coords in party chat",
        category = "General",
        subcategory = "Vanq Notifier",
        size = 2
    )
    var vanqNotifier = false

    @Switch(
        name = "Enabled",
        description = "Shows messages on screen on specific events in kuudra",
        category = "General",
        subcategory = "Kuudra Alerts",
        size = 2
    )
    var kuudraAlerts = false


    // Qol

    @Switch(
        name = "Enabled",
        description = "Looks at and picks up relics (WIP)",
        category = "Qol",
        subcategory = "Relic Aura",
        size = 2
    )
    var relicAura = false

    @Switch(
        name = "Enabled",
        description = "Custom item macros check minecraft settings",
        category = "Qol",
        subcategory = "Item Macros",
        size = 2
    )
    var itemMacros = false

    @Switch(
        name = "Enabled",
        description = "Spams right click while term is held ranomized cps",
        category = "Qol",
        subcategory = "Terminator AC",
        size = 2
    )
    var terminatorAC = false

    @Switch(
        name = "Enabled",
        description = "Spams the cookie while in the cookie clicker menu",
        category = "Qol",
        subcategory = "Cookie Clicker",
        size = 2
    )
    var cookieClicker = false

    @Switch(
        name = "Enabled",
        description = "You can add whatever mob you want into the list /esp",
        category = "Qol",
        subcategory = "ESP",
        size = 2
    )
    var esp = false

    @Switch(
        name = "Enabled",
        description = "Replaces diorite with glass in p2 (don't use connected blocks)",
        category = "Qol",
        subcategory = "FUCK DIORITE",
        size = 2
    )
    var fuckDiorite = false


    // Boss

}