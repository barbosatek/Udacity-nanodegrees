class Enemy extends Entity {
    constructor(x, y, width, height, velocity) {
     super('images/enemy-bug.png', x, y, width, height);
     this.velocity = velocity;
    }

    canMoveRight(backgroundContext){
        return (this.currentLocation.x - this.sprite.width) > backgroundContext.totalWidth ? false : true;
    }

    update(timeDelta, ctx, backgroundContext) {
        super.update(timeDelta, ctx);

        if(this.canMoveRight(backgroundContext)){
            this.currentLocation.x =this.currentLocation.x + (1* this.velocity);
        } else{
            this.currentLocation.x = 0 - this.sprite.width;
        }
        
    }
}