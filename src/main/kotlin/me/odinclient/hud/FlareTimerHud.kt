package me.odinclient.hud

import cc.polyfrost.oneconfig.hud.BasicHud
import cc.polyfrost.oneconfig.libs.universal.UMatrixStack
import me.odinclient.OdinClient
import net.minecraft.client.renderer.GlStateManager
import net.minecraft.client.renderer.RenderHelper
import net.minecraft.item.Item
import net.minecraft.item.ItemStack

class FlareTimerHud: BasicHud(true) {

    override fun draw(matrices: UMatrixStack?, x: Float, y: Float, scale: Float, example: Boolean) {
        val firework = ItemStack(Item.getByNameOrId("fireworks"))
        GlStateManager.scale(scale, scale, 1f)
        GlStateManager.translate(x / scale, y / scale, 0f)
        GlStateManager.color(1f, 1f, 1f, 1f)
        RenderHelper.enableStandardItemLighting()
        RenderHelper.enableGUIStandardItemLighting()
        OdinClient.mc.renderItem.zLevel = 200F
        OdinClient.mc.renderItem.renderItemIntoGUI(firework, 0, 0)
    }

    override fun getWidth(scale: Float, example: Boolean): Float {
        return scale
    }

    override fun getHeight(scale: Float, example: Boolean): Float {
        return scale
    }

}