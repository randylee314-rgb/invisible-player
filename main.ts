import { world } from "@minecraft/server";

world.beforeEvents.itemUseOn.subscribe((event) => {
    const player = event.source;
    const item = event.itemStack;
    const block = event.block;

    if (!player || !item || !block) return;

    // Check for Netherite Hoe
    if (item.typeId !== "minecraft:netherite_hoe") return;

    // Check for Bedrock block
    if (block.typeId !== "minecraft:bedrock") return;

    // Run commands
    try {
        player.runCommandAsync("scoreboard objectives add hidden dummy");
        player.runCommandAsync("scoreboard objectives setdisplay list hidden");
    } catch (e) {
        console.warn("Command failed:", e);
    }
});

import { world, ItemStack, Player } from "@minecraft/server";

// Listen for item use (Amethyst Shard)
world.events.itemUse.subscribe((eventData) => {
    const player = eventData.source;  // The player who used the item
    const item = eventData.item;      // The item being used by the player

    // Check if the player used an Amethyst Shard (use the item id for Amethyst Shard)
    if (item.id === "minecraft:amethyst_shard") {
        // Store a flag for the player that they used an Amethyst Shard
        player.getTags().add("amethystUsed");
    }
});

// Listen for the chat event
world.events.chat.subscribe((eventData) => {
    const player = eventData.sender;  // The player sending the message
    const message = eventData.message;

    // Check if the player has the "amethystUsed" tag (i.e., they've used the Amethyst Shard)
    if (player.hasTag("amethystUsed")) {
        // Remove the player's name from the message
        const newMessage = message.replace(player.name, "");
        
        // Send the new message (without the player's name)
        world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"${newMessage}"}]}`);

        // Cancel the default chat broadcast to prevent the original message from appearing
        eventData.cancel = true;

        // Remove the tag after the message is sent
        player.getTags().remove("amethystUsed");
    }
});

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
