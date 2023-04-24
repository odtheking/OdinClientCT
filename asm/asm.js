export default ASM => {
    const { desc, L, BOOLEAN, OBJECT, JumpCondition } = ASM

    // Bigger Lever Hitbox
    ASM.injectBuilder(
        "net/minecraft/block/BlockLever",
        "setBlockBoundsBasedOnState",
        desc("V", L("net/minecraft/world/IBlockAccess"), L("net/minecraft/util/BlockPos")),
        ASM.At(ASM.At.HEAD)
    )
    .methodMaps({
        func_180654_a: "setBlockBoundsBasedOnState",
    })
    .instructions($ => {
        $.array(0, OBJECT, ($) => {}).invokeJS("toggleSecretHitboxes")
        $.checkcast(BOOLEAN).invokeVirtual(BOOLEAN, "booleanValue", desc("Z"))
        $.ifClause([JumpCondition.FALSE], ($) => {
            $.methodReturn()
        })
    })
    .execute()
}