/**
 * This is just a messy testfile yet, 
 * which hopelessy fails to save custom meta-data to ItemStacks.
 *
 * Yet it can save custom meta data to item entities.
 * 
 */

(function() {

    console.log(
        java.lang.System.getProperty("java.class.path")
    );

    Object.keys = Object.keys || 
    function ( 
        o, // object
        k, // key
        r  // result array
    ){
        // initialize object and result
        r=[];
        // iterate over object keys
        for (k in o) 
            // fill result array with non-prototypical keys
            r.hasOwnProperty.call(o, k) && r.push(k);
        // return result
        return r
    };

    //imports

    var HashMap            = java.util.HashMap,
        EntityType         = org.bukkit.entity.EntityType,
        Vector             = org.bukkit.util.Vector,
        NBTTagCompound     = net.minecraft.server.v1_7_R3.NBTTagCompound,
        MCItemStack        = net.minecraft.server.v1_7_R3.ItemStack,
        ItemStack          = org.bukkit.inventory.ItemStack,
        CraftItemStack     = org.bukkit.craftbukkit.v1_7_R3.inventory.CraftItemStack,
        asNMSCopy          = org.bukkit.craftbukkit.v1_7_R3.inventory.CraftItemStack.asNMSCopy,
        Bukkit             = org.bukkit.Bukkit,
        FixedMetadataValue = org.bukkit.metadata.FixedMetadataValue,

        ConfigurationSerialization = org.bukkit.configuration.serialization.ConfigurationSerialization
        ;

        function updateMetaInfo(targetStack) {
           console.log('getting keys of keyset');

            var metaMap = targetStack.serialize();
            var newMeta = {
                '==': 'ItemMeta',
                'ID': 'bar',
                'MEH': 'muh'
            };

            newMeta = new HashMap();
            newMeta.put('==', 'ItemMeta');
            newMeta.put('display-id', 'berberber');
            newMeta.put('display-name', 'HAHAHAHA');
            newMeta.put('meta-type', 'UNSPECIFIC');
            //UNSPECIFIC_META

            // copy all old metadata
            metaMap.keySet().toArray().forEach(function(key, idx) {
                var value;

                value = metaMap.get(key);

                console.log(key + ' --> ' + value);
                // newMeta[key] = value;
                newMeta.put(key, value);
            });

            console.log('TRY setting ' + newMeta);
            console.log('---------');

            var tmp    = ConfigurationSerialization.deserializeObject(newMeta),
                result = targetStack.setItemMeta(tmp);

            console.log('----?['+ result +']-----');

            // //Apply ItemMeta before doing this
            console.log('9999'+ targetStack.getClass());
            console.log('xxxx'+ targetStack.getAmount());

            var nativeItemStack = CraftItemStack.asNMSCopy(targetStack);
            var tag;
            if(nativeItemStack.tag != undefined) {
                console.log('TAG 1' + nativeItemStack.tag);
                tag = nativeItemStack.tag;
            } else {
                tag = new NBTTagCompound();
                nativeItemStack.tag = tag;
            }
            console.log('TAG 3' + tag);

            tag.setInt("narfnarf", 1337);
            var hh = CraftItemStack.asCraftMirror(nativeItemStack);
            console.log('OOOOO '+  nativeItemStack);
            console.log('OOOOO '+  nativeItemStack.tag);
            console.log('OOOOO '+  hh);
            console.log('OOOOO '+  hh.tag);

            return nativeItemStack;
        }


    function addMetaItem(player) {
        var location,
            itemStack,
            item;

        console.log('try to drop stack');

        location = player.getEyeLocation().toVector().add(
            player.getLocation().getDirection().multiply(2)
        ).toLocation(
            player.getWorld(),
            player.getLocation().getYaw(),
            player.getLocation().getPitch()
        );

        itemStack = new ItemStack(268);
        console.log('itemstack -> ' + itemStack.getClass());

        updateMetaInfo(itemStack);

        // drop meta Entity->Item
        item = player.getWorld().dropItemNaturally(
            location,
            itemStack
        );

        // printObject(item.getEntityId());
        // var plugin = Bukkit.getServer().getPluginManager().getPlugin("scriptcraft");
        // item.setMetadata('foo', new FixedMetadataValue(plugin, 'woooot'));
        // console.log('---> ' + item.getMetadata('foo'));
        // console.log('---> ' + item.getMetadata('foo').get(0).asString());
    }

    function onProjectileLaunchEvent(evnt) {

        var projectile,
            world,
            shooter,
            fireball,
            metadata,
            fireballLocation,
            fireballVelocity;

        projectile    = evnt.entity;
        world         = projectile.world;
        shooter       = projectile.shooter;

        addMetaItem(shooter);

        // place fireball somewhere infront of shooter
        fireballLocation = projectile.location.clone();
        fireballLocation.add(
            projectile.getVelocity().clone().multiply(2)
        );

        fireballLocation = shooter.getEyeLocation().toVector().add(
                    shooter.getLocation().getDirection().multiply(2)
               ).toLocation(
                    shooter.getWorld(),
                    shooter.getLocation().getYaw(),
                    shooter.getLocation().getPitch()
               );

        // player.launchProjectile(Fireball.class);
        // fireball = shooter
        //     .location
        //     .world
        //     .spawnEntity(fireballLocation, EntityType.FIREBALL);

        // fireball.setVelocity(fireballVelocity);

        // evnt.entity.remove();
    }

    function onProjectileHitEvent(evnt) {
        var projectile,
            shooter,
            world;

        projectile = evnt.entity;
        world      = projectile.world;
        shooter    = projectile.shooter;

        // world.strikeLightning(projectile.location);
        projectile.setFireTicks(200);
    }

    function printObject(obj) {
        console.log('------');
        Object.keys(obj).forEach(function(key, idx, keys){
            var output = [
                '\t -->',
                 key,
                 typeof obj[key]
            ].join(' ');

           console.log(output);
        });
    }

    function onEntityDamageByEntityEvent(evnt) {

        var damager,
            itemStack,
            itemMeta;

        // FALL
        // LAVA
        // FIRE_TICK
        // FIRE
        // PROJECTILE
    
        if(evnt.getCause() == 'ENTITY_ATTACK') {
            // printObject(evnt);

            damager   = evnt.damager;
            itemStack = damager.getInventory().getItemInHand();
            itemMeta  = itemStack.getItemMeta();

            console.log("!!!! ITS" + itemStack);
            // console.log(['damager',
            //     damager,
            //     damager.getName(),
            //     damager.getInventory(),
            //     damager.getInventory().getItemInHand(),
            // ].join(' // '));

            // console.log([
                
            //     'item.getType',
            //     itemStack.getType(),

            //     'item.getEnchantments',
            //     itemStack.getEnchantments(),

            //     'item.getData',
            //     itemStack.getData(),

            //     'item.getItemMeta',

            // ].join(' // '));

            console.log([
                'BEFORE',
                itemStack.getItemMeta()
            ].join(' // '));

            // updateMetaInfo(itemStack);

            console.log([
                'AFTER',
                itemStack.getItemMeta()
            ].join(' // '));


            if(itemStack.getType()) {
                // DIAMOND_SWORD
                // AIR
                // BOW (only when hit damage)

            }
        }

        // console.log('getEntity' + evnt.getEntity());
        // console.log('getCause' + evnt.getCause());

// getEntityCraftHorse{variant=HORSE, owner=null}
    }

    // events.on('entity.ProjectileHitEvent', onProjectileHitEvent);
    // events.on('entity.ProjectileLaunchEvent',     onProjectileLaunchEvent);
    // events.on('entity.ProjectileHitEvent',        onProjectileHitEvent);
    // events.on('entity.EntityDamageByEntityEvent', onEntityDamageByEntityEvent);

})();
