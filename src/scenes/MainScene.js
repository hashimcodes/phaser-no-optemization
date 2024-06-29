import phaser from "../lib/phaser.js";
import NumberBox from "./NumberBox.js";

let SquaresArray
let bounds
export default class MainScene extends phaser.Scene {

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image("Box", "assets/Icon_01.png");

        this.load.image("minigameBackground", "assets/BG_board.png");
        this.load.image("gameBg", "assets/BG_static.png");
        this.load.image("gameBgWithFruits", "assets/BG_outro.png");

        this.load.image("startGameMenu", "assets/UI_start-menu.png");
        this.load.image("loseGameMenu", "assets/UI_lose-menu.png");
        this.load.image("winGameMenu", "assets/UI_win-screen.png");
        this.load.image("startButton", "assets/UI_start-button.png");
        this.load.image("retryButton", "assets/UI_retry-button.png");
        this.load.image("homeButton", "assets/UI_home-button.png");
        this.load.image("miniGameHintMenu", "assets/UI_tutorial.png");
        this.load.image("scoreBG", "assets/UI_v1_goal.png");
        this.load.image("hint", "assets/UI_hint.png");
        this.load.image("hintHand", "assets/HintHand.png");

        this.load.image("delivery", "assets/Chara_delivery.png");
        this.load.image("farmer", "assets/Chara_farmer.png");
        this.load.image("car", "assets/Prop_truck.png");

        this.load.image("speechBubble", "assets/UI_emote01.png");
        this.load.image("happy", "assets/UI_emote04.png");
        this.load.image("thumbsUp", "assets/UI_emote06.png");
        this.load.image("surprised", "assets/UI_emote01.png");
        this.load.image("thinking", "assets/UI_emote03.png");
        this.load.image("money", "assets/UI_emote05.png");
        this.load.image("fruitBasket", "assets/UI_emote02.png");

        this.load.image('horizontalBoundary', 'assets/Boundary.png')
        this.load.image('verticalBoundary', 'assets/VerticalBoundary.png')

        this.load.image("seeds", "assets/Icon_01.png");
        this.load.image("shovel", "assets/Icon_02.png");
        this.load.image("treeWithShovel", "assets/Icon_stage01.png");
        this.load.image("water", "assets/Icon_03.png");
        this.load.image("treeWithWater", "assets/Icon_stage02.png");
        this.load.image("sun", "assets/Icon_04.png");
        this.load.image("treeWithSun", "assets/Icon_stage03.png");
        this.load.image("blooming", "assets/Icon_stage03.png");
        this.load.image("fruit", "assets/Icon_05.png");

        this.load.audio("Click", "assets/sfx/Click.wav");
        this.load.audio("Lose", "assets/sfx/Lose.mp3");
        this.load.audio("Win", "assets/sfx/Win.mp3");
        this.load.audio("CarStart", "assets/sfx/Car Starts.wav");
        this.load.audio("CarStop", "assets/sfx/Car stops.wav");
        this.load.audio("Char1", "assets/sfx/character 1.mp3");
        this.load.audio("Char2", "assets/sfx/character 2.mp3");
        this.load.audio("Merge", "assets/sfx/merge.mp3");
        this.load.audio("PopUp", "assets/sfx/popup.mp3");
        this.load.audio("SlideBlock", "assets/sfx/slide block.mp3");

        this.loadFont("CustomFont", "assets/GE_SS_TV_Bold.otf");
    }

    create() 
    {
        SquaresArray = [];
        this.possibleNumbers = [0.5, 1, 2, 3];
        this.nextnumberToSpawn = 0.5;
        this.previousNumberSpawned = 0.5;
        this.score = 0;
        this.canWin = true;
        this.canLose = true;
        this.IsMinigameOn = false;
        this.loseTimeCounter = 0;
        this.highestCurrentvalue = 0.5;
        this.isHintOn = true;
        this.isWon = false;
        
        this.backGround = this.add.image(960, 540, 'gameBg')
            .setOrigin(0.5, 0.5);

        this.minigameBackground=this.add.image(960, 540,'minigameBackground')
            .setOrigin(0.5, 0.5)
            .setVisible(true);
        
        this.deliverySpeechBubble = this.add.image(570, 410, 'surprised')
            .setVisible(false)
            .setScale(0.1, 0.1);

        this.farmerSpeechBubble = this.add.image(780, 430, 'thinking')
            .setVisible(false)
            .setScale(0.1, 0.1);

        this.delivery = this.add.image(1300, 700, 'delivery')
            .setVisible(false);

        this.farmer = this.add.image(600, 860, 'farmer')
            .setVisible(true)
            .setFlipX(true);

        this.car = this.add.image(2500, 150, 'car')
            .setVisible(true)

        //showing the next box that will spawn
        this.nextNumberBoxImage = this.add.image(1465, 965, 'seeds')

        //checks the spawn areas and if it is full or not
        this.verticalRectCheck1 = this.physics.add.image(1120, 800)
        this.verticalRect1 = this.add.image(1127, 885, "Box").setScale(1, 5).setOrigin(0.5, 1)
            .setInteractive()
            .on('pointerdown', () => this.SpawnNewNumberBox(this.verticalRect1.x, this.verticalRect1.y, this.verticalRectCheck1))
            .setVisible(false)
        this.verticalRect1.alpha = 0.001;

        this.verticalRectCheck2 = this.physics.add.image(1290, 800)
        this.verticalRect2 = this.add.image(1296, 885, "Box").setScale(1, 5).setOrigin(0.5, 1)
            .setInteractive()
            .on('pointerdown', () => this.SpawnNewNumberBox(this.verticalRect2.x, this.verticalRect2.y, this.verticalRectCheck2))
            .setVisible(false)
        this.verticalRect2.alpha = 0.001;

        this.verticalRectCheck3 = this.physics.add.image(1460, 800)
        this.verticalRect3 = this.add.image(1465, 885, "Box").setScale(1, 5).setOrigin(0.5, 1)
            .setInteractive()
            .on('pointerdown', () => this.SpawnNewNumberBox(this.verticalRect3.x, this.verticalRect3.y, this.verticalRectCheck3))
            .setVisible(false)
        this.verticalRect3.alpha = 0.001;

        this.verticalRectCheck4 = this.physics.add.image(1630, 800)
        this.verticalRect4 = this.add.image(1634, 885, "Box").setScale(1, 5).setOrigin(0.5, 1)
            .setInteractive()
            .on('pointerdown', () => this.SpawnNewNumberBox(this.verticalRect4.x, this.verticalRect4.y, this.verticalRectCheck4))
            .setVisible(false)
        this.verticalRect4.alpha = 0.001;

        this.verticalRectCheck5 = this.physics.add.image(1800, 800)
        this.verticalRect5 = this.add.image(1803, 885, "Box").setScale(1, 5).setOrigin(0.5, 1)
            .setInteractive()
            .on('pointerdown', () => this.SpawnNewNumberBox(this.verticalRect5.x, this.verticalRect5.y, this.verticalRectCheck5))
            .setVisible(false)
        this.verticalRect5.alpha = 0.001;

        //bounding area
        bounds = this.physics.add.staticGroup();
        this.upperBounds = bounds.create(1470, -10, 'horizontalBoundary').setScale(2.2, 2).body.updateFromGameObject()
        this.rightBounds = bounds.create(1915, 460, 'verticalBoundary').setScale(1, 2.2).body.updateFromGameObject()
        this.leftBounds = bounds.create(1018, 460, 'verticalBoundary').setScale(1, 2.2).body.updateFromGameObject()
        bounds.setVisible(false)
        

        this.loseMenu = this.add.image(960, 540, 'loseGameMenu')
            .setVisible(false);
        
        this.startGameMenu = this.add.image(960, 540, 'startGameMenu')
            .setVisible(false);

        this.winMenu = this.add.image(960, 540, 'winGameMenu')
            .setVisible(false);

        this.retryButton = this.add.image(800, 700, 'retryButton')
            .setVisible(false)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.stopAll();
                this.sound.play("Click");
                this.winning = true
                this.scene.start("LoadingScene")
            }, this);

        this.homeButton = this.add.image(1120, 700, 'homeButton')
            .setVisible(false)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.stopAll();
                this.sound.play("Click");
                this.winning = true
                this.scene.start("LoadingScene")
            }, this);

        this.startButton = this.add.image(1150, 585, 'startButton')
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => {
                this.sound.play("Click");
                this.ShowMiniGame();
                this.SetMiniGameStage();
            }, this);
            
        this.miniGameHintMenu = this.add.image(480, 400, 'miniGameHintMenu')
            .setOrigin(0.5, 0.5)
            .setVisible(false);

        this.scoreBG = this.add.image(250, 890, 'scoreBG')
            .setOrigin(0.5, 0.5)
            .setVisible(false);
            
        this.scoreText = this.add.text(325, 830, '0', { fontFamily: 'CustomFont' , fontSize: '70px'})
            .setOrigin(0.5, 0.5)
            .setTint(0xeaff00)
            .setVisible(false);

        this.hint = this.add.image(1466.5, 464, 'hint')
            .setOrigin(0.5, 0.5)
            .setVisible(false);
            
        this.hintHand = this.add.image(1560, 530, 'hintHand')
            .setOrigin(0.5, 0.5)
            .setVisible(false);

        this.HideMiniGame();
        this.time.delayedCall(1000, this.StartCarMovement, [], this);
    }

    update() 
    {
        if (!this.IsMinigameOn || !this.canLose) return;

        //plays the update function for each of the number boxes
        SquaresArray.forEach(function (item) {
            item.UpdateFunc();
        });

        this.CheckForLoss();
        this.AdjustNextBoxImage();
        if (!this.isWon) this.CheckForWin();
    }

    DecideSpawnedNumberBoxValue() 
    {
        for (let index = 0; index < SquaresArray.length; index++) {
            if (SquaresArray[index].value > this.highestCurrentvalue && SquaresArray[index].value < 3.5 && SquaresArray[index].canMerge) {

                this.highestCurrentvalue = SquaresArray[index].value
            }
        }
        this.RollNextNumberToSpawn();
    }

    RollNextNumberToSpawn() 
    {
        this.nextnumberToSpawn = this.possibleNumbers[Math.floor(Math.random() * this.possibleNumbers.length)]
        if (this.nextnumberToSpawn > this.highestCurrentvalue + 0.5 || this.nextnumberToSpawn == this.latestSpawnedNumberBox) {

            this.RollNextNumberToSpawn()
        }
    }

    SpawnNewNumberBox(posX, posY, checkerRect) 
    {
        if (this.isHintOn)
        {
            this.isHintOn = false;
            this.hint.setVisible(false);
            this.hintHand.setVisible(false);
        }
        this.sound.play("Click");
        this.sound.play("SlideBlock");
        if (!this.canWin) return;
        //summon new box
        if (this.physics.world.overlap(checkerRect, SquaresArray) || !this.canWin || !this.canLose) return;
        this.latestSpawnedNumberBox = new NumberBox(this, posX, posY, 'Box', this.nextnumberToSpawn, -600, bounds, SquaresArray);
        this.latestSpawnedNumberBox.body.setVelocity(0, -600)
        SquaresArray.push(this.latestSpawnedNumberBox)
        this.latestSpawnedNumberBox = this.nextnumberToSpawn
        this.DecideSpawnedNumberBoxValue()
    }

    AdjustnumberBoxPosition(posX, PosY) 
    {
        if (!this.canLose) return;
        this.nextNumberBoxImage.setPosition(posX, PosY)
    }

    CheckForLoss() 
    {
        if (this.physics.world.overlap(this.verticalRectCheck1, SquaresArray) &&
            this.physics.world.overlap(this.verticalRectCheck2, SquaresArray) &&
            this.physics.world.overlap(this.verticalRectCheck3, SquaresArray) &&
            this.physics.world.overlap(this.verticalRectCheck4, SquaresArray) &&
            this.physics.world.overlap(this.verticalRectCheck5, SquaresArray)
        ) {
            this.loseTimeCounter += 1;
            if (this.canLose && this.loseTimeCounter > 50) 
            {
                this.sound.play("PopUp");
                this.sound.play("Lose");
                this.canLose = false;
                this.PopInEffect(this.loseMenu);
                this.loseMenu.setDepth(5)
                this.PopInEffect(this.retryButton);
                this.retryButton.setDepth(5)
                this.PopInEffect(this.homeButton);
                this.homeButton.setDepth(5)
            }
        }
        else 
        {
            this.loseTimeCounter = 0;
        }
    }

    CheckForWin() 
    {
        if (this.score > 9) 
        {
            this.isWon = true;
            this.time.delayedCall(1500, () => this.StartEndGameConversation(), [], this);
        }
    }

    ShowWinMenu() 
    {
        this.sound.play("PopUp");
        this.sound.play("Win");
        this.canWin = false;
        this.PopInEffect(this.winMenu);
        this.PopInEffect(this.retryButton);
        this.PopInEffect(this.homeButton);
    }

    AdjustNextBoxImage() 
    {
        switch (this.nextnumberToSpawn) 
        {
            case 0.5:
                this.nextNumberBoxImage.setTexture('seeds');
                break;
            case 1:
                this.nextNumberBoxImage.setTexture('shovel');
                break;
            case 1.5:
                this.nextNumberBoxImage.setTexture('treeWithShovel');
                break;
            case 2:
                this.nextNumberBoxImage.setTexture('water');
                break;
            case 2.5:
                this.nextNumberBoxImage.setTexture('treeWithWater');
                break;
            case 3:
                this.nextNumberBoxImage.setTexture('sun');
                break;
            case 3.5:
                this.nextNumberBoxImage.setTexture('treeWithSun');
                break;
            case 4:
                this.nextNumberBoxImage.setTexture('fruit');
                break;
            default:
                break;
        }
    }

    AddScore() 
    {
        this.score++;
        this.scoreText.text = this.score;
    }

    HideMiniGame() 
    {
        this.IsMinigameOn = false;
        this.minigameBackground.setVisible(false);
        this.scoreBG.setVisible(false);
        this.scoreText.setVisible(false);
        this.verticalRect1.setVisible(false);
        this.verticalRect2.setVisible(false);
        this.verticalRect3.setVisible(false);
        this.verticalRect4.setVisible(false);
        this.verticalRect5.setVisible(false);
        this.nextNumberBoxImage.setVisible(false);
        bounds.setVisible(false);
    }

    ShowMiniGame() 
    {
        this.IsMinigameOn = true;
        this.minigameBackground.setVisible(true);
        this.scoreBG.setVisible(true);
        this.scoreText.setVisible(true);
        this.hint.setVisible(true);
        this.hintHand.setVisible(true);
        this.verticalRect1.setVisible(true);
        this.verticalRect2.setVisible(true);
        this.verticalRect3.setVisible(true);
        this.verticalRect4.setVisible(true);
        this.verticalRect5.setVisible(true);
        this.nextNumberBoxImage.setVisible(true);
        bounds.setVisible(true);
    }

    SetMiniGameStage() 
    {
        this.car.setVisible(false);
        this.delivery.setVisible(false);
        this.startGameMenu.setVisible(false);
        this.startButton.setVisible(false);
        this.farmer.setFlipX(false);
        this.miniGameHintMenu.setVisible(true);
    }

    StartCarMovement()
    {
        this.time.delayedCall(1000, () => this.sound.play("CarStop"), [], this);
        this.tweens.add({
            targets: this.car,
            x: 1500,
            y: 700,
            duration: 2000,
            ease: 'Linear'
        });

        this.time.delayedCall(3500, () => {
            this.tweens.add({
                targets: this.delivery,
                x: 990,
                y: 830,
                duration: 1500,
                ease: 'Linear',
                onStart: () => {
                    this.delivery.setVisible(true);
                },
                onComplete: () => {
                    this.StartConversation();
                } 
            });
        }, [], this);
    }

    StartConversation() 
    {
        this.deliverySpeechBubble.setTexture("surprised");
        this.ShowHideEmoji("delivery", true);

        this.time.delayedCall(2000, () => {
            this.farmerSpeechBubble.setTexture("thinking");
            this.ShowHideEmoji("farmer", true);
            this.ShowHideEmoji("delivery", false);
        }, [], this);

        this.time.delayedCall(4000, () => {
            this.ShowHideEmoji("farmer", false);
            this.deliverySpeechBubble.setTexture("fruitBasket");
            this.ShowHideEmoji("delivery", true);
        }, [], this);

        this.time.delayedCall(5500, () => {
            this.farmerSpeechBubble.setTexture("happy");
            this.ShowHideEmoji("farmer", true);
        }, [], this);

        this.time.delayedCall(7500, () => {
            this.ShowHideEmoji("farmer", false);
            this.ShowHideEmoji("delivery", false);
        }, [], this);

        this.time.delayedCall(8200, () => {
            this.LeaveConversation();
        }, [], this);
    }

    LeaveConversation() {
        this.time.delayedCall(1500, () => {
            this.sound.play("PopUp");
            this.PopInEffect(this.startGameMenu);
            this.PopInEffect(this.startButton);
        }, [], this);
    }

    StartEndGameConversation() 
    {
        for (let index = 0; index < SquaresArray.length; index++) 
        {
            SquaresArray[index].HideSelf();
        }

        this.HideMiniGame();
        this.miniGameHintMenu.setVisible(false);
        this.backGround.setTexture("gameBgWithFruits");
        this.delivery.setVisible(true);
        this.car.setVisible(true);
        this.farmer.setFlipX(true);

        this.time.delayedCall(1000, () => {
            this.farmerSpeechBubble.setTexture("thumbsUp");
            this.ShowHideEmoji("farmer", true);
        }, [], this);

        this.time.delayedCall(3000, () => {
            this.deliverySpeechBubble.setTexture("money");
            this.ShowHideEmoji("farmer", false);
            this.ShowHideEmoji("delivery", true);
        }, [], this);

        this.time.delayedCall(4000, () => {
            this.ShowHideEmoji("delivery", false);
        }, [], this);

        this.time.delayedCall(5000, () => {
            this.farmerSpeechBubble.setTexture("happy");
            this.deliverySpeechBubble.setTexture("happy");
            this.ShowHideEmoji("delivery", true);
            this.ShowHideEmoji("farmer", true);
        }, [], this);

        this.time.delayedCall(7000, () => {
            this.ShowHideEmoji("delivery", false);
        }, [], this);

        this.time.delayedCall(9000, () => {
            this.tweens.add({
                targets: this.delivery,
                x: 1300,
                y: 700,
                duration: 1500,
                ease: 'Linear',
                onStart: () => {
                    this.delivery.setFlipX(true);
                },
                onComplete: () => {
                    this.delivery.setVisible(false);
                    this.sound.play("CarStart");
                } 
            });
        }, [], this);

        this.time.delayedCall(11500, () => {
            this.tweens.add({
                targets: this.car,
                x: 400,
                y: 1500,
                duration: 2000,
                ease: 'Linear',
                onComplete: () => {
                    this.time.delayedCall(2000, () => {
                        this.sound.stopAll();
                        this.ShowWinMenu();
                    }, [], this);
                } 
            });
        }, [], this);
    }

    PopInEffect(objectToPopIn) 
    {
        objectToPopIn.setVisible(true);
        objectToPopIn.displayWidth /= 2;
        objectToPopIn.displayHeight /= 2;
        this.tweens.add({
            targets: objectToPopIn,
            displayWidth: objectToPopIn.displayWidth * 2,
            displayHeight: objectToPopIn.displayHeight * 2,
            duration: 100,
            ease: 'Linear',
        });
    }

    AddTweenFunction(objectToTween, xPos, yPos, time) 
    {
        this.tweens.add({
            targets: objectToTween,
            x: xPos,
            y: yPos,
            duration: time,
            ease: 'Linear',
        });
    }

    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then((loaded) => {
            document.fonts.add(loaded);
        }).catch((error) => {
            return error;
        });
    }

    ShowHideEmoji(character, showHide)
	{
		switch (character) 
		{
			case "delivery":
				if (showHide)
				{
					this.deliverySpeechBubble.x = this.delivery.x;
					this.deliverySpeechBubble.y = this.delivery.y - 230;
					this.tweens.add({
						targets: this.deliverySpeechBubble,
						scaleX: 1,
						scaleY: 1,
						duration: 150,
						ease: "Linear",
						onStart: () => {
							this.deliverySpeechBubble.setVisible(true);
                            this.sound.play("PopUp");
                            this.time.delayedCall(500, () => this.sound.play("Char1"), [], this);
						},
					});
				}
				else
				{
					this.tweens.add({
						targets: this.deliverySpeechBubble,
						scaleX: 0.1,
						scaleY: 0.1,
						duration: 150,
						ease: "Linear",
						onComplete: () => {
							this.deliverySpeechBubble.setVisible(false);
						},
					});
				}
				break;
			case "farmer":
				if (showHide)
				{
					this.farmerSpeechBubble.x = this.farmer.x;
					this.farmerSpeechBubble.y = this.farmer.y - 230;
					this.tweens.add({
						targets: this.farmerSpeechBubble,
						scaleX: 1,
						scaleY: 1,
						duration: 150,
						ease: "Linear",
						onStart: () => {
							this.farmerSpeechBubble.setVisible(true);
                            this.sound.play("PopUp");
                            this.time.delayedCall(500, () => this.sound.play("Char2"), [], this);
						},
					});
				}
				else
				{
					this.tweens.add({
						targets: this.farmerSpeechBubble,
						scaleX: 0.1,
						scaleY: 0.1,
						duration: 150,
						ease: "Linear",
						onComplete: () => {
							this.farmerSpeechBubble.setVisible(false);
						},
					});
				}
				break;
			default:
				break;
		}
	}
}
