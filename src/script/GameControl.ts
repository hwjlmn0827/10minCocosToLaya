import Monster from "./Monster";
import Star from "./Star";

export default class GameControl extends Laya.Script {
    /** @prop {name:starPrefab, tips:"星星预制体对象", type:Prefab}*/
    starPrefab: Laya.Prefab;
    /** @prop {name:Monster, tips:"Monster", type:Laya.Sprite}*/
    public monster: Monster;
    /** @prop {name:ground, tips:"ground"}*/
    ground: Laya.Sprite;

    maxStarDuration: number = 0;
    minStarDuration: number = 0;
    groundY: number = 0;

    constructor() { super(); }

    onEnable(): void {
        // 获取地平面的 y 轴坐标
        this.groundY = (this.owner.getChildByName('ground') as Laya.Sprite).y;
        this.monster = this.owner.getChildByName('monster').getComponent(Monster);
        console.log('zytest: this.monster', this.monster);
        // 生成一个新的星星
        this.spawnNewStar();
    }

    spawnNewStar() {
        console.log('zytest: 111111111', );

        console.log('zytest: starPrefab', this.starPrefab);
        let newStar: Laya.Sprite = Laya.Pool.getItemByCreateFun("starPrefab", this.starPrefab.create, this.starPrefab);
        console.log('zytest: newStar', newStar);

        // 将新增的节点添加到 Canvas 节点下面
        this.owner.addChild(newStar);

        // 为星星设置一个随机位置
        let randomPos = this.getNewStarPosition()
        newStar.pos(randomPos.x, randomPos.y);
        newStar.getComponent(Star).game = this;
    }

    getNewStarPosition() {
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var randX = Math.random() * Laya.stage.width;

        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        const groundY = (this.owner.getChildByName('ground') as Laya.Sprite).y;
        const jumpHeight = this.monster.jumpHeight;
        var randY = groundY - Math.random() * jumpHeight;

        // 返回星星坐标
        return {x: randX, y:randY};
    }
    gainScore() {

    }

    onDisable(): void {
    }

}