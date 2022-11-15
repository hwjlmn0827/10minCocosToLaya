// 控制游戏逻辑
import Monster from "./Monster";
import Star from "./Star";
export default class GameControl extends Laya.Script {
    /** @prop {name:starPrefab, tips:"星星预制体对象", type:Prefab}*/
    starPrefab: Laya.Prefab;
    /** @prop {name:Monster, tips:"Monster", type:Laya.Sprite}*/
    public monster: Monster;
    /** @prop {name:ground, tips:"ground"}*/
    ground: Laya.Sprite;
    /** @prop {name:score, tips:"游戏得分", type:number}*/
    score: number = 0;
    /** @prop {name:scoreDisplay, tips:"scoreDisplay得分", type:Laya.Text}*/
    scoreDisplay: Laya.Text;

    /** @prop {name:timer, tips:"timer", type:number}*/
    timer: number = 0;
    /** @prop {name:starDuration, tips:"starDuration", type:number}*/
    starDuration: number = 0;

    maxStarDuration: number = 6000;
    minStarDuration: number = 3000;
    groundY: number = 0;

    constructor() { super(); }

    onEnable(): void {
         // 初始化计时器
         this.timer = Date.now();
         this.starDuration = 3000;

        // 获取地平面的 y 轴坐标
        this.groundY = (this.owner.getChildByName('ground') as Laya.Sprite).y;
        this.monster = this.owner.getChildByName('monster').getComponent(Monster);
        this.scoreDisplay = this.owner.getChildByName('score') as Laya.Text;
        // this.scoreDisplay.on(Event., this, this._onKeyDown);
        // 生成一个新的星星
        this.spawnNewStar();
    }

    spawnNewStar() {
        console.log('zytest: starPrefab', this.starPrefab);
        // 根据标志创建，如果不存在就用后面的参数创建
        let newStar: Laya.Sprite = Laya.Pool.getItemByCreateFun("starPrefab", this.starPrefab.create, this.starPrefab);
        // 下面的方法为啥不行呢？用在什么地方？用于创建该类型对象的类。
        // var img: Laya.Image = Laya.Pool.getItemByClass("img", Laya.Image);

        console.log('zytest: newStar', newStar);

        // 将新增的节点添加到 Canvas 节点下面
        this.owner.addChild(newStar);

        // 为星星设置一个随机位置
        let randomPos = this.getNewStarPosition()
        newStar.pos(randomPos.x, randomPos.y);
        newStar.getComponent(Star).game = this;

        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = Date.now();
    }

    getNewStarPosition() {
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var randX = Math.random() * Laya.stage.width;

        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        const jumpHeight = this.monster.jumpHeight;
        var randY = this.groundY - Math.random() * jumpHeight;

        // 返回星星坐标
        return {x: randX, y:randY};
    }
    
    gainScore() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.text = 'Score: ' + this.score;
    }

    onUpdate() {
        let now = Date.now();

        console.log('zytest: timer', now - this.timer);
        if (now - this.timer > this.starDuration) {
            this.gameOver();
            console.log('zytest: gameoer', this.starDuration);
            this.timer = now;
            return;
        }
    }

    // TODO:
    gameOver() {
        // this.monster.stopAllActions(); 
        // 重新加载场景 game todo
    }

    saveScore() {
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, () => {

        });
        xhr.once(Laya.Event.ERROR, this,  () => {

        });
        xhr.once(Laya.Event.PROGRESS, this,  () => {

        });
        xhr.send("res/data.data", "", "get", "text");
        console.log("aaaa");
    }

    onDisable(): void {
    }

}