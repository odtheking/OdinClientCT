package me.odinclient.utils

import me.odinclient.OdinClient
import me.odinclient.font.GlyphPageFontRenderer
import net.minecraft.client.Minecraft
import net.minecraft.client.renderer.GlStateManager
import net.minecraft.client.renderer.Tessellator
import net.minecraft.client.renderer.WorldRenderer
import net.minecraft.client.renderer.entity.RenderManager
import net.minecraft.client.renderer.vertex.DefaultVertexFormats
import net.minecraft.util.Vec3
import org.lwjgl.opengl.GL11
import java.awt.Color
import kotlin.math.sqrt

object RenderUtils {

    private val mc: Minecraft = Minecraft.getMinecraft()
    private val tessellator: Tessellator = Tessellator.getInstance()
    private val worldRenderer: WorldRenderer = tessellator.worldRenderer
    private val renderManager: RenderManager = mc.renderManager
    private val font: GlyphPageFontRenderer = OdinClient.font

    fun drawCustomEspBox(x: Double, xWidth: Double, y: Double, yWidth: Double, z: Double, zWidth: Double, color: Color, thickness: Float = 3f, phase: Boolean) {

        GlStateManager.pushMatrix()

        GlStateManager.color(color.red.toFloat() / 255f, color.green.toFloat() / 255f, color.blue.toFloat() / 255f, color.alpha.toFloat())
        GlStateManager.translate(-renderManager.viewerPosX, -renderManager.viewerPosY, -renderManager.viewerPosZ)
        GlStateManager.blendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA)
        if (phase) GlStateManager.disableDepth()
        GlStateManager.disableTexture2D()
        GlStateManager.disableLighting()
        GlStateManager.enableBlend()

        GL11.glLineWidth(thickness)

        val x1 = x + xWidth
        val y1 = y + yWidth
        val z1 = z + zWidth

        worldRenderer.begin(GL11.GL_LINE_STRIP, DefaultVertexFormats.POSITION)
        worldRenderer.pos(x1,y1,z1).endVertex()
        worldRenderer.pos(x1,y1,z).endVertex()
        worldRenderer.pos(x,y1,z).endVertex()
        worldRenderer.pos(x,y1,z1).endVertex()
        worldRenderer.pos(x1,y1,z1).endVertex()
        worldRenderer.pos(x1,y,z1).endVertex()
        worldRenderer.pos(x1,y,z).endVertex()
        worldRenderer.pos(x,y,z).endVertex()
        worldRenderer.pos(x,y,z1).endVertex()
        worldRenderer.pos(x,y,z).endVertex()
        worldRenderer.pos(x,y1,z).endVertex()
        worldRenderer.pos(x,y,z).endVertex()
        worldRenderer.pos(x1,y,z).endVertex()
        worldRenderer.pos(x1,y1,z).endVertex()
        worldRenderer.pos(x1,y,z).endVertex()
        worldRenderer.pos(x1,y,z1).endVertex()
        worldRenderer.pos(x,y,z1).endVertex()
        worldRenderer.pos(x,y1,z1).endVertex()
        worldRenderer.pos(x1,y1,z1).endVertex()

        tessellator.draw()

        GlStateManager.enableTexture2D()
        GlStateManager.disableBlend()
        GlStateManager.enableDepth()

        GlStateManager.popMatrix()

    }

    fun drawFontStringInWorld(string: String, x: Float, y: Float, z: Float, scale: Double = 1.0, increase: Boolean = true, shadow: Boolean = true, partialTicks: Float = 1f) {
        var lScale = scale
        val renderPos = Vec3((x - mc.thePlayer.lastTickPosX + (mc.thePlayer.posX - mc.thePlayer.lastTickPosX) * partialTicks), (y - mc.thePlayer.lastTickPosY + (mc.thePlayer.posY - mc.thePlayer.lastTickPosY) * partialTicks), (z - mc.thePlayer.lastTickPosZ + (mc.thePlayer.posZ - mc.thePlayer.lastTickPosZ) * partialTicks))
        if (increase) {
            val distance = sqrt(renderPos.xCoord * renderPos.xCoord + renderPos.yCoord * renderPos.yCoord + renderPos.zCoord * renderPos.zCoord)
            val multiplier = distance / 120f
            lScale *= 0.45f * multiplier
        }
        val xMultiplier = if (mc.gameSettings.thirdPersonView == 2) -1 else 1
        GlStateManager.color(1f, 1f, 1f, 0.5f)
        GlStateManager.pushMatrix()
        GlStateManager.translate(renderPos.xCoord, renderPos.yCoord, renderPos.zCoord)
        GlStateManager.rotate(-renderManager.playerViewY, 0.0f, 1.0f, 0.0f)
        GlStateManager.rotate(renderManager.playerViewX * xMultiplier, 1.0f, 0.0f, 0.0f)
        GlStateManager.scale(-lScale, -lScale, lScale)
        GlStateManager.disableLighting()
        GlStateManager.depthMask(false)
        GlStateManager.disableDepth()
        GlStateManager.enableBlend()
        GlStateManager.blendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA)
        val textWidth = font.getStringWidth(string)
        font.drawString(string, (-textWidth / 2).toFloat(), 0f, 0xffffffff.toInt(), shadow)
        GlStateManager.color(1.0f, 1.0f, 1.0f, 1.0f)
        GlStateManager.depthMask(true)
        GlStateManager.enableDepth()
        GlStateManager.popMatrix()
    }

    fun renderCustomBeacon(title: String, x: Double, y: Double, z: Double, r: Int, g: Int, b: Int) {
        this.drawCustomEspBox(x, 0.5, y, 0.5, z, 0.5, Color(r, g, b, 255), 3f, true)
        this.drawFontStringInWorld(title, x.toFloat(), y.toFloat(), z.toFloat(), 1.0, increase = true, shadow = true)
    }
}