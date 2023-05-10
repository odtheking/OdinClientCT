/// <reference types="../../CTAutocomplete" />
const S37PacketStatistics = net.minecraft.network.play.server.S37PacketStatistics
const S03PacketTimeUpdate = net.minecraft.network.play.server.S03PacketTimeUpdate
const System = Java.type("java.lang.System")

export default new class Server {
    constructor() {
        this.prevTime = null
        this.averageTps = 20
        this.averagePing = 0
        this.isPinging = false
        this.pingStartTime = 0

        register("worldLoad", () => { this.prevTime = null; this.averageTps = 20; this.averagePing = 0 })
        register("step", () => this.sendPing()).setDelay(2)

        register("packetReceived", (p) => {
            this.isPinging = false
            if (p instanceof S37PacketStatistics) this.averagePing = (System.nanoTime() - this.pingStartTime) / 1e6 * 0.4 + this.averagePing * 0.6
            else if (p instanceof S03PacketTimeUpdate) {
                if (this.prevTime) this.averageTps = MathLib.clampFloat(20000 / (Date.now() - this.prevTime), 0, 20) * 0.182 + this.averageTps * 0.818
                this.prevTime = Date.now()
            }
            else this.averagePing = 0
        }).setFilteredClasses([S37PacketStatistics, net.minecraft.network.play.server.S01PacketJoinGame, S03PacketTimeUpdate])
    }

    getAverageTps = () => this.averageTps
    getAveragePing = () => this.averagePing

    sendPing = () => {
        if (this.isPinging) return
        this.pingStartTime = System.nanoTime()
        this.isPinging = true
        Client.sendPacket(new net.minecraft.network.play.client.C16PacketClientStatus(net.minecraft.network.play.client.C16PacketClientStatus.EnumState.REQUEST_STATS))
    }
}