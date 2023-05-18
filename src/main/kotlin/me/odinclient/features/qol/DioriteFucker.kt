package me.odinclient.features.qol

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.odinclient.OdinClient
import net.minecraft.block.Block.getIdFromBlock
import net.minecraft.init.Blocks
import net.minecraft.util.BlockPos
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent
import net.minecraftforge.fml.common.gameevent.TickEvent.ClientTickEvent

class DioriteFucker: OdinClient() {

    private val green = setOf<BlockPos>(
        BlockPos(45, 169, 44),
        BlockPos(46, 169, 44),
        BlockPos(47, 169, 44),
        BlockPos(44, 169, 43),
        BlockPos(45, 169, 43),
        BlockPos(46, 169, 43),
        BlockPos(47, 169, 43),
        BlockPos(48, 169, 43),
        BlockPos(43, 169, 42),
        BlockPos(44, 169, 42),
        BlockPos(45, 169, 42),
        BlockPos(46, 169, 42),
        BlockPos(47, 169, 42),
        BlockPos(48, 169, 42),
        BlockPos(49, 169, 42),
        BlockPos(43, 169, 41),
        BlockPos(44, 169, 41),
        BlockPos(45, 169, 41),
        BlockPos(46, 169, 41),
        BlockPos(47, 169, 41),
        BlockPos(48, 169, 41),
        BlockPos(49, 169, 41),
        BlockPos(43, 169, 40),
        BlockPos(44, 169, 40),
        BlockPos(45, 169, 40),
        BlockPos(46, 169, 40),
        BlockPos(47, 169, 40),
        BlockPos(48, 169, 40),
        BlockPos(49, 169, 40),
        BlockPos(44, 169, 39),
        BlockPos(45, 169, 39),
        BlockPos(46, 169, 39),
        BlockPos(47, 169, 39),
        BlockPos(48, 169, 39),
        BlockPos(45, 169, 38),
        BlockPos(46, 169, 38),
        BlockPos(47, 169, 38)
    )

    private val yellow = setOf<BlockPos>(
        BlockPos(45, 169, 68),
        BlockPos(46, 169, 68),
        BlockPos(47, 169, 68),
        BlockPos(44, 169, 67),
        BlockPos(45, 169, 67),
        BlockPos(46, 169, 67),
        BlockPos(47, 169, 67),
        BlockPos(48, 169, 67),
        BlockPos(43, 169, 66),
        BlockPos(44, 169, 66),
        BlockPos(45, 169, 66),
        BlockPos(46, 169, 66),
        BlockPos(47, 169, 66),
        BlockPos(48, 169, 66),
        BlockPos(49, 169, 66),
        BlockPos(43, 169, 65),
        BlockPos(44, 169, 65),
        BlockPos(45, 169, 65),
        BlockPos(46, 169, 65),
        BlockPos(47, 169, 65),
        BlockPos(48, 169, 65),
        BlockPos(49, 169, 65),
        BlockPos(43, 169, 64),
        BlockPos(44, 169, 64),
        BlockPos(45, 169, 64),
        BlockPos(46, 169, 64),
        BlockPos(47, 169, 64),
        BlockPos(48, 169, 64),
        BlockPos(49, 169, 64),
        BlockPos(44, 169, 63),
        BlockPos(45, 169, 63),
        BlockPos(46, 169, 63),
        BlockPos(47, 169, 63),
        BlockPos(48, 169, 63),
        BlockPos(45, 169, 62),
        BlockPos(46, 169, 62),
        BlockPos(47, 169, 62)
    )

    @OptIn(DelicateCoroutinesApi::class)
    @SubscribeEvent
    fun onTick(event: ClientTickEvent) {
        GlobalScope.launch {
            if (mc.theWorld == null || !config.fuckDiorite /* && getPhase == "p2" */) return@launch
            for (height in 0 until 37) {
                for (block in green) {
                    if (getIdFromBlock( mc.theWorld.getBlockState(block).block ) != 1) continue
                    mc.theWorld.setBlockState(block, Blocks.glass.defaultState)
                }
                for (block in yellow) {
                    if (getIdFromBlock( mc.theWorld.getBlockState(block).block ) != 1) continue
                    mc.theWorld.setBlockState(block, Blocks.glass.defaultState)
                }
            }
        }
    }
}