
var config = {
    type: Phaser.AUTO,
    
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:300},
            debug: false
        }

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var walls;
var noob;
var button;
var stars;
var score =0;
var scoretxt;

function preload(){
    this.load.image('sky','/assets/images/sky.png');
    this.load.image('ground','/assets/images/platform.png');
    this.load.image('star', '/assets/images/star.png');
    this.load.image('bomb', '/assets/images/bomb.png');
    this.load.spritesheet('dude', 
        '/assets/images/dude.png',
        { frameWidth: 32 , frameHeight: 48 }
    );
}

function create(){

    this.add.image(400,300,'sky');
    // this.add.image(400,300,'star');
    walls = this.physics.add.staticGroup();
    walls.create(400,568,'ground').setScale(2).refreshBody();
    walls.create(600,400,'ground');
    walls.create(50,250,'ground');
    walls.create(600,120,'ground');

    //Creating player script

    noob = this.physics.add.sprite(100,450,'dude');
    noob.setBounce(0.2);
    noob.setCollideWorldBounds(true);

    
    //this is for palyer to come fast the more value more fast it will come
    noob.body.setGravityY(-150);

   
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate: 10,
        repeat: -1

    });

    this.anims.create({
        key:'turn',
        frames:[{key:'dude',frame:4}],
        frameRate: 20
    });

    this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(noob,walls);

    //Star dropping script
    stars = this.physics.add.group({
        key:'star',
        repeat:11,
        setXY: {x: 12, y:0 , stepX: 70}
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));    
    });

    this.physics.add.collider(stars,walls);
    this.physics.add.overlap(noob,stars,collectStar,null,this);

    
    button = this.input.keyboard.createCursorKeys();
    //this will collide player with ground and stop
    
    //Displaying score:
    scoretxt = this.add.text(16,16,'score: 0',{fontsize: '33px',fill: '#000'});
 
}

function collectStar(noob,star){
    star.disableBody(true,true);
    score+=10;
    scoretxt.setText('SCORE : '+score);
}
   


function update(){

    if (button.left.isDown){
        noob.setVelocityX(-360);
        noob.anims.play('left',true);
    }
    else if (button.right.isDown){
        noob.setVelocityX(160);
        noob.anims.play('right',true);
    }
    else{
        noob.setVelocityX(0);
        noob.anims.play('turn');
    }
    if (button.up.isDown && noob.body.touching.down){
        noob.setVelocityY(-405);
        // noob.setVelocityX(200);
    }

}

