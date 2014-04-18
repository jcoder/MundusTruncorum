(function() {

    //imports

    var EntityType         = org.bukkit.entity.EntityType;


    // event handlers
    
    function onProjectileLaunchEvent(evnt) {

        // @TODO: check projectile name before applying behaviour

        var projectile,
            shooter,
            fireball,
            fireballLocation;

        projectile    = evnt.entity;
        shooter       = projectile.shooter;

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

        fireball = shooter
            .location
            .world
            .spawnEntity(fireballLocation, EntityType.FIREBALL);

        evnt.entity.remove();
    }

    // event bindings
    
    events.on('entity.ProjectileLaunchEvent', onProjectileLaunchEvent);
})();
