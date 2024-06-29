import Phaser from '../lib/phaser.js'

export default class LoadingScene extends Phaser.Scene
{
	constructor()
	{
		super('LoadingScene');
	}

	preload()
	{
		this.load.image("BackGround", "assets/Loading-Screen.png");
		this.load.image("Landing", "assets/Landing-Screen.png");
	}

	create ()
	{
		this.backGround = this.add.image(960, 540, "BackGround")
			.setOrigin(0.5, 0.5);

		this.landing = this.add.image(960, 540, "Landing")
			.setOrigin(0.5, 0.5);

		this.time.delayedCall(2000, () => this.landing.setVisible(false), [], this);

		this.time.delayedCall(5000, () => this.scene.start('MainScene'), [], this);

	}
}
