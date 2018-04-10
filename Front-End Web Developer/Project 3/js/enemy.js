class Enemy extends Entity {
    constructor(sprite, x, y, velocity) {
     super(sprite, x, y);
     this.velocity = velocity;
    }

    canMoveRight(backgroundContext){
        return (this.currentLocation.x - this.sprite.width) > backgroundContext.totalWidth ? false : true;
    }

    getDrawnArea(){
        var resource = Resources.get(this.sprite.path);
        return {
            x:this.currentLocation.x,
            y:this.currentLocation.y + this.sprite.heightPadding,
            width: resource.width,
            height: resource.height - this.sprite.heightPadding - 20
        }
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