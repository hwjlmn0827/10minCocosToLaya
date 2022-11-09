import Event = Laya.Event;

/* Jump Height: 150
Jump Duration: 0.3
Max Move Speed: 400
Accel: 1000 */

export default class Monster extends Laya.Script{
    /** @prop {name:jumpHeight, tips:"数字类型示例", type:Number}*/
    public jumpHeight: number = 150;
    /** @prop {name:jumpDuration, tips:"数字类型示例", type:Number}*/
    public jumpDuration: number = 300;
    /** @prop {name:maxMoveSpeed, tips:"数字类型示例", type:Number}*/
    public maxMoveSpeed: number = 4;
    /** @prop {name:accel, tips:"数字类型示例", type:Number}*/
    public accel: number = 30;
    /** @prop {name:xSpeed, tips:"主角当前水平方向速度", type:Number}*/
    public xSpeed: number = 0;

    // /** @prop {name:accLeft, tips:"左加速", type:boolean}*/
    private accLeft: boolean = false;
    // /** @prop {name:accRight, tips:"右加速", type:boolean}*/
    private accRight: boolean = false;

    /** @prop {name:player, tips:"主角 ", type:Laya.Sprite}*/
    public player: Laya.Sprite;

    constructor() {
        super();
    }

    onAwake() {
        this.player = this.owner as Laya.Sprite;
        this.player.x = 850;
        this.player.y = 500;
        // this.accLeft = false;
        // this.accRight = false;
        this.runJumpAction();
        // 按键监听 stage
        Laya.stage.on(Event.KEY_DOWN, this, this._onKeyDown);
        Laya.stage.on(Event.KEY_UP, this, this._onKeyUp);
    }
    onEnable() {
    }
    onStart() {
        // console.log('onstart', this.y);
    }

    runJumpAction () {
        const timeline = Laya.TimeLine.to(this.player, { y: this.player.y - 200 }, this.jumpDuration).to(this.player, { y: this.player.y }, this.jumpDuration);
        timeline.play(null, true);
    }

    private _onKeyDown(e: Event): void{
        switch(e.keyCode) {
            case 37:
                this.accLeft = true;
                console.log('zytest: this.accLeft', this);
                break;
            case 39:
                this.accRight = true;
                break;
        }
    }

    private _onKeyUp(e: Event): void{
        switch(e.keyCode) {
            case 37:
                this.accLeft = false;
                console.log('zytest: this.accLeft', this);
                break;
            case 39:
                this.accRight = false;
                break;
        }
    }

    // cocos: update 会在场景加载后每帧调用一次，我们一般把需要经常计算或及时更新的逻辑内容放在 update 中。在我们的游戏里，根据键盘输入获得加速度方向后，就需要每帧在 update 中计算主角的速度和位置。
    onUpdate() {
        // console.log('zytest: onUpdate', this.accLeft);
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft === true) {
            console.log('successin', );
            this.xSpeed -= this.accel;
        }
        if (this.accRight === true) {
            console.log('successin2', );
            console.log('zytest: right', );
            this.xSpeed += this.accel;
        }

        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.player.x += this.xSpeed;
    }

    onDisable(): void {
        //盒子被移除时，回收盒子到对象池，方便下次复用，减少对象创建开销。
        // Laya.Pool.recover("dropBox", this);
        Laya.stage.off(Event.KEY_DOWN, this, this._onKeyDown);
        Laya.stage.off(Event.KEY_UP, this, this._onKeyUp);
    }

}