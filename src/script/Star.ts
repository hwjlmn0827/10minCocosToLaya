import GameControl from "./GameControl";
import Util from "./Util";


export default class Star extends Laya.Script {
    /** @prop {name:pickRadius, tips:"星星和主角之间的距离小于这个数值时，就会完成收集", type:Int, default:60}*/
    public pickRadius: number = 60;

    /** @prop {name:game, tips:"GameControl", type:GameControl}*/
    public game: GameControl;
    
    
    constructor() { super(); }
    
    onEnable(): void {
    }

    // 星星被收集时
    getPlayerDistance() {
        // 根据两点位置计算两点之间距离
        var dist = Util.getInstance().calcDistance(this.owner as Laya.Sprite, this.game.monster.owner as Laya.Sprite)
        return dist;
    }

    // 星星被收集时
    onPicked() {
        console.log('zytest: onPicked', );
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();

        // 调用 Game 脚本的得分方法
        this.game.gainScore();

        // 然后销毁当前星星节点 TODO:Pool?
        this.owner.destroy();
    }

    onUpdate() {
        // console.log('zytest: 11', );
        // 每帧判断星星和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            console.log('zytest: 小于', );
            // 调用收集行为
            this.onPicked();
            return;
        }
    }

    onDisable(): void {
    }
}