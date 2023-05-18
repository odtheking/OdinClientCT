package me.odinclient.events

import net.minecraft.util.EnumParticleTypes
import net.minecraftforge.fml.common.eventhandler.Event

class SpawnParticleEvent(enumParticleTypes: EnumParticleTypes, longDistance: Boolean, x: Double, y: Double, z: Double): Event() {

    var enumParticleTypes: EnumParticleTypes
    var longDistance: Boolean
    var x: Double
    var y: Double
    var z: Double

    init {
        this.enumParticleTypes = enumParticleTypes
        this.longDistance = longDistance
        this.x = x
        this.y = y
        this.z = z
    }
}