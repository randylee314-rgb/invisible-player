Player.onPlayerUseItemTypeOnBlockType(Data.itemPicker(MinecraftItemTypes.AmethystShard), Data.blockPicker(MinecraftBlockTypes.NetheriteBlock), function (player) {
    let myPlayer: mcServer.Vector3 = null
    World.spawnParticle(BasicParticleTypes.BlueFlameParticle, myPlayer)
    World.runCommandAsync("/give @p netherite_block 5")
    World.runCommandAsync("/give @p netherite_template 10")
})
Player.onPlayerUseItemTypeOnBlockType(Data.itemPicker(MinecraftItemTypes.DiamondHoe), Data.blockPicker(MinecraftBlockTypes.Bedrock), function (player) {
    World.runCommandAsync("/effect @p invisibility 999999 255 true")
    World.runCommandAsync("/effect @p resistance 999999 1 true")
    World.runCommandAsync("/effect @p strength 999999 1 true")
})
