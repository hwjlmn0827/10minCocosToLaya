export default class Monster extends Laya.Sprite{
    /** @prop {name:jumpHeight, tips:"数字类型示例", type:Number, default:0}*/
    public jumpHeight: number = 10;
    /** @prop {name:jumpDuration, tips:"数字类型示例", type:Number, default:0}*/
    public jumpDuration: number = 300;
    /** @prop {name:maxMoveSpeed, tips:"数字类型示例", type:Number, default:0}*/
    public maxMoveSpeed: number = 0;
    /** @prop {name:accel, tips:"数字类型示例", type:Number, default:0}*/
    public accel: number = 0;
    /** @prop {name:player, tips:"主角 ", type:Laya.Sprite}*/
    public player: Laya.Sprite;

    constructor() {
        super();
        console.log('zytest: constructor init2', );
        this.x = 850;
        this.y = 500;
        this.runJumpAction();
        // this.on(Laya.Event.KEY_DOWN, this, this._onKeyDown);
    }

    // onAwake() {
    //     console.log('onAwake', this.y);
    // }

    runJumpAction () {
        // // 跳跃上升
        // var jumpUp = cc.tween().by(this.jumpDuration, {y: this.jumpHeight}, {easing: 'sineOut'});
        // // 下落
        // var jumpDown = cc.tween().by(this.jumpDuration, {y: -this.jumpHeight}, {easing: 'sineIn'});
        // // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
        // var tween = cc.tween().sequence(jumpUp, jumpDown)
        // // 不断重复
        // return cc.tween().repeatForever(tween);

        const timeline = Laya.TimeLine.to(this, { y: this.y - 200 }, this.jumpDuration).to(this, { y: this.y }, this.jumpDuration);
        timeline.play(null, true);
       
    }
    private _onKeyDown(){
        console.log('zytest: onkeydown');
    }

    onKeyDown() {
        console.log('zytest: onkeydown33', );
    }


    // private scaleBig():void
    // {
    //     //变大还原的缓动效果
    //     Laya.Tween.to(this, {scaleX:1,scaleY:1},this.scaleTime);
    // }
    // private scaleSmall():void
    // {
    //     //缩小至0.8的缓动效果
    //     Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
    // }
}