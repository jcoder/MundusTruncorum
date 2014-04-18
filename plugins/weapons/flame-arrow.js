(function() {

    //imports

    // event handlers
    
    function onProjectileHitEvent(evnt) {
        // @TODO: check projectile name before applying behaviour
        var projectile;

        projectile = evnt.entity;
        projectile.setFireTicks(200);
    }

    // event bindings
    // events.on('entity.ProjectileHitEvent', onProjectileHitEvent);
})();
