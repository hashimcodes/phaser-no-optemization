import phaser from "../lib/phaser.js";

export default class NumberBox extends phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, number, velocityY, collisionCol, overlapCol) {
        super(scene, x, y, texture)
        this.alpha = 0.01;
        this.value = number;
        this.scene = scene;
        this.array = overlapCol;
        this.bounds = collisionCol;
        this.canMerge = false;
        this.VelocityYValue = velocityY;
        this.timeToBloom = 0;
        this.hintTimer = 0;
        this.canShowHint = false;
        this.canBloom = false;
        this.isFruit = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.rightCol = scene.physics.add.image(this.x + this.width, this.y);
        this.UpperCol = scene.physics.add.image(this.x, this.y - this.height);
        scene.physics.add.overlap(this.rightCol, overlapCol, this.MergeFunction, null, this);
        scene.physics.add.overlap(this.UpperCol, overlapCol, this.MergeFunction, null, this);
        scene.physics.add.collider(this, collisionCol, this.collisionCallback, null, this);
        scene.physics.add.collider(this, overlapCol, this.collisionCallback, null, this);
        this.body.setVelocity(0, velocityY);
        this.mainImage = scene.add.image(0, 0, 'seeds');
        //this.mainImage.displayWidth=100
        //this.mainImage.displayHeight=100
        //.setScale(0.55)
       // this.hintImage = scene.add.image(0, 0, 'shovel').setScale(0.5).setVisible(false);
        //this.valueText.setDepth(10)
        this.body.setMass(10000);
    }

    collisionCallback() {

    }



    MergeFunction(detector, otherObject) {
        if (otherObject.value == (this.value - 0.5) && otherObject.body.immovable && this.body.immovable && !this.canMerge && this.value < 3.5) {
          
            otherObject.value++;
           // otherObject.hintImage.setVisible(false)
            otherObject.hintTimer = 0
            this.scene.sound.play("Merge")
            this.DestroySelf()
        }
        else if (otherObject.value == (this.value + 0.5) && otherObject.body.immovable && this.body.immovable && this.canMerge && this.value < 3.5) {
          
            this.value++;
           // this.hintImage.setVisible(false)
            this.hintTimer = 0
            this.scene.sound.play("Merge")
            otherObject.DestroySelf()
        }
    }


    DestroySelf() {
      
        this.rightCol.destroy()
        this.UpperCol.destroy();
       // this.hintImage.destroy()
        this.mainImage.destroy();
        var index = this.array.indexOf(this);
        this.array.splice(index, 1)
        super.destroy()

    }

    HideSelf() {
        super.setVisible(false)
       // this.hintImage.setVisible(false)
        this.mainImage.setVisible(false)
    }

    UpdateFunc() {
        this.AdjustMainImage()
        this.TurnGrassIntoFruit()
       
        if (!this.scene.physics.world.overlap(this.UpperCol, this.array) && !this.scene.physics.world.overlap(this.UpperCol, this.bounds) && this.body.immovable) {
         
            this.setImmovable(false)
            this.body.setVelocity(0, this.VelocityYValue)
        }
        if (this.body.velocity.y === 0) {
           
            this.setImmovable(true);
        }
        this.rightCol.setPosition(this.x + this.width, this.y)
        this.UpperCol.setPosition(this.x, this.y - this.height)

        this.mainImage.setPosition(this.x, this.y)
        //this.hintImage.setPosition(this.x - 25, this.y - 25)


       
        this.BecomeFruit()

    }
    



    AdjustMainImage() {
        switch (this.value) {
            case 0.5:
                this.mainImage.setTexture('seeds')
               // this.hintImage.setTexture('shovelHint')
                this.canShowHint = true
                this.canMerge = true
                break;
            case 1:
                this.mainImage.setTexture('shovel')
                this.canShowHint = false
                break;
            case 1.5:
                this.mainImage.setTexture('treeWithShovel')
               // this.hintImage.setTexture('waterHint')
                this.canShowHint = true
                this.canMerge = true
                break;
            case 2:
                this.mainImage.setTexture('water')
                this.canShowHint = false
                break;
            case 2.5:
                this.mainImage.setTexture('treeWithWater')
               // this.hintImage.setTexture('sunHint')
                this.canShowHint = true
                this.canMerge = true
                break;

            case 3:
                this.mainImage.setTexture('sun')
                this.canShowHint = false
                break;
            case 3.5:
                if (this.canBloom) return;
                this.mainImage.setTexture('treeWithSun')
                this.canShowHint = false

                break;
            case 4:
                this.mainImage.setTexture('fruit')
                this.canShowHint = false
                break;


            default:
                break;
        }
    }

    TurnGrassIntoFruit() {
        if (this.isFruit) return
        if (this.canBloom) {
            this.timeToBloom++;
            this.mainImage.setTexture('blooming')
            if (this.timeToBloom > 100) {
                this.timeToBloom = 0
                this.isFruit = true
            }
        }
        else {
            if (this.value == 3.5) {
                this.canBloom = true
            }
        }
    }

    BecomeFruit() {
        if (!this.isFruit) return

        this.value = 4
        if (this.timeToBloom < 100) {
            this.timeToBloom++;
        }
        else {
            this.scene.AddScore();
            this.DestroySelf();
        }
    }






}