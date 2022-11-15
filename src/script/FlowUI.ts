import { ui } from "../ui/layaMaxUI";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */

export default class FlowUI extends ui.flowUI {


    /**设置单例的引用方式，方便其他类引用 */
    static instance: FlowUI;
    
   
    static getInstance() {
        return FlowUI.instance ? FlowUI.instance : FlowUI.instance = new FlowUI();
    }

    constructor() {
        super();
        console.log('zytest: FlowUI constructor');
        FlowUI.instance = this;
    }
    onEnable() {
        Laya.stage.bgColor='#fdf6e4';
        this.createTween();
        console.log('zytest: console game awake');
        this.textTween.on(Laya.Event.CLICK, this, ()=> {
            console.log('zytest: event11111', );
            this.textTween.visible = false;
            this.removeChild(this.textTween);
        })
    }

    private createTween():void{
        //"LayaBox字符串总宽度"
        var w:number = 800;
        //文本创建的起始位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
        var offsetX:number = this.textTween.width - w >> 1;
        //显示的字符串
        var demoString:string = "LayaBox";
        var letterText:Laya.Text;
        //根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
        for(var i:number = 0,len:number = demoString.length;i<len;++i){
            //从"LayaBox"字符串中逐个提出单个字符创建文本
            letterText = this.createLetter(demoString.charAt(i));
            letterText.x = w/len*i+offsetX;
            //文本的初始y属性
            letterText.y = 100;
            /**
            * 对象letterText属性y从100缓动到300的位置
            * 用1000毫秒完成缓动效果
            * 缓动类型采用bounceIn
            * 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
            * 延迟间隔i*100毫秒执行
            */
           Laya.Tween.to(letterText, { y : 300, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.elasticIn, Laya.Handler.create(this,this.changeColor,[letterText]), i * 100);
        }
    }
    /**
     * 缓动进行时的回调更新方法
     * txt  缓动对象
     */
     private updateColor(txt:Laya.Text):void{
        var c:number = Math.floor(Math.random()*3);
        switch (c) {
            case 0:
                txt.color = "#eee000";
                break;
            case 1:
                txt.color = "#ffffff";
                break;
            case 2:
                txt.color = "#ff0000";
                break;
            default:
                txt.color = "#eee000";
                break;
        }
    }
    /**
     * 缓动完成后的回调方法
     * txt  缓动对象
     */    
    private changeColor(txt:Laya.Text):void{
        //将文本字体改变成红色
        txt.color = "#ff0000";
    }
    //创建单个字符文本，并加载到舞台
    private createLetter(char:string):Laya.Text{
        var letter:Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 180;
        this.textTween.addChild(letter);
        return letter;
    }
}