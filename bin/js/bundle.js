(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var anim;
        (function (anim) {
            class testEfcUI extends Laya.EffectAnimation {
                constructor() { super(); this.effectData = testEfcUI.uiView; }
            }
            testEfcUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 8, "x": -2, "texture": "icon/11.png" }, "compId": 3 }], "loadList": ["icon/11.png"], "loadList3D": [] };
            anim.testEfcUI = testEfcUI;
            REG("ui.anim.testEfcUI", testEfcUI);
            class tweenEffUI extends Laya.EffectAnimation {
                constructor() { super(); this.effectData = tweenEffUI.uiView; }
            }
            tweenEffUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": -24, "texture": "icon/2.png" }, "compId": 4 }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "y": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "y", "index": 0 }, { "value": 128, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "y", "index": 100 }], "x": [{ "value": -24, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 0 }, { "value": -24, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 1 }, { "value": 221, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 100 }] } }], "name": "ani", "id": 7, "frameRate": 100, "action": 0 }], "loadList": ["icon/2.png"], "loadList3D": [] };
            anim.tweenEffUI = tweenEffUI;
            REG("ui.anim.tweenEffUI", tweenEffUI);
        })(anim = ui.anim || (ui.anim = {}));
    })(ui || (ui = {}));
    (function (ui) {
        class flowUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("flow");
            }
        }
        ui.flowUI = flowUI;
        REG("ui.flowUI", flowUI);
        class gameUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("game");
            }
        }
        ui.gameUI = gameUI;
        REG("ui.gameUI", gameUI);
    })(ui || (ui = {}));
    (function (ui) {
        var scene;
        (function (scene) {
            class fenliUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("scene/fenli");
                }
            }
            scene.fenliUI = fenliUI;
            REG("ui.scene.fenliUI", fenliUI);
            class jiazaiUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("scene/jiazai");
                }
            }
            scene.jiazaiUI = jiazaiUI;
            REG("ui.scene.jiazaiUI", jiazaiUI);
            class neiqianxUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(neiqianxUI.uiView);
                }
            }
            neiqianxUI.uiView = { "type": "Scene", "props": { "width": 1360, "height": 760 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "name": "testS" }, "compId": 3 }, { "type": "Text", "props": { "text": "text", "name": "testT", "runtime": "Laya.Text" }, "compId": 4 }], "loadList": [], "loadList3D": [] };
            scene.neiqianxUI = neiqianxUI;
            REG("ui.scene.neiqianxUI", neiqianxUI);
        })(scene = ui.scene || (ui.scene = {}));
    })(ui || (ui = {}));

    class FlowUI extends ui.flowUI {
        constructor() {
            super();
            console.log('zytest: FlowUI constructor');
            FlowUI.instance = this;
        }
        static getInstance() {
            return FlowUI.instance ? FlowUI.instance : FlowUI.instance = new FlowUI();
        }
        onEnable() {
            Laya.stage.bgColor = '#fdf6e4';
            this.createTween();
            console.log('zytest: console game awake');
            this.textTween.on(Laya.Event.CLICK, this, () => {
                console.log('zytest: event11111');
                this.textTween.visible = false;
                this.removeChild(this.textTween);
            });
        }
        createTween() {
            var w = 800;
            var offsetX = this.textTween.width - w >> 1;
            var demoString = "LayaBox";
            var letterText;
            for (var i = 0, len = demoString.length; i < len; ++i) {
                letterText = this.createLetter(demoString.charAt(i));
                letterText.x = w / len * i + offsetX;
                letterText.y = 100;
                Laya.Tween.to(letterText, { y: 300, update: new Laya.Handler(this, this.updateColor, [letterText]) }, 1000, Laya.Ease.elasticIn, Laya.Handler.create(this, this.changeColor, [letterText]), i * 100);
            }
        }
        updateColor(txt) {
            var c = Math.floor(Math.random() * 3);
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
        changeColor(txt) {
            txt.color = "#ff0000";
        }
        createLetter(char) {
            var letter = new Laya.Text();
            letter.text = char;
            letter.color = "#ffffff";
            letter.font = "Impact";
            letter.fontSize = 180;
            this.textTween.addChild(letter);
            return letter;
        }
    }

    class GameUI extends ui.gameUI {
        constructor() {
            super();
            GameUI.instance = this;
            console.log('zytest: gameUI constructor');
        }
        static getInstance() {
            return GameUI.instance ? GameUI.instance : GameUI.instance = new GameUI();
        }
        onAwake() {
            console.log('zytest: console game awake');
        }
    }

    var Event = Laya.Event;
    class Monster extends Laya.Script {
        constructor() {
            super();
            this.jumpHeight = 150;
            this.jumpDuration = 300;
            this.maxMoveSpeed = 4;
            this.accel = 30;
            this.xSpeed = 0;
            this.accLeft = false;
            this.accRight = false;
        }
        onAwake() {
            this.player = this.owner;
            this.player.x = 850;
            this.player.y = 500;
            this.runJumpAction();
            Laya.stage.on(Event.KEY_DOWN, this, this._onKeyDown);
            Laya.stage.on(Event.KEY_UP, this, this._onKeyUp);
        }
        onEnable() {
        }
        onStart() {
        }
        runJumpAction() {
            this.timeline = Laya.TimeLine.to(this.player, { y: this.player.y - 200 }, this.jumpDuration).to(this.player, { y: this.player.y }, this.jumpDuration);
            this.timeline.play(null, true);
        }
        runJumpAction2() {
        }
        _onKeyDown(e) {
            console.log('zytest: e.keyCode', e.keyCode);
            switch (e.keyCode) {
                case 37:
                    this.accLeft = true;
                    break;
                case 39:
                    this.accRight = true;
                    break;
                case 40:
                    break;
            }
        }
        _onKeyUp(e) {
            switch (e.keyCode) {
                case 37:
                    this.accLeft = false;
                    break;
                case 39:
                    this.accRight = false;
                    break;
                case 40:
                    break;
            }
        }
        onUpdate() {
            console.log('zytest: onUpdate', this.player.x);
            let stageWidth = Laya.stage.width;
            if (this.player.x > stageWidth - 10 && this.player.x < stageWidth + 10 && this.accRight) {
                console.log('zytest: tail');
                this.player.x = Laya.stage.x;
            }
            else if (this.player.x >= 0 && this.player.x < 20 && this.accLeft) {
                console.log('zytest: head');
                this.player.x = stageWidth - this.player.width;
            }
            if (this.accLeft === true) {
                this.xSpeed -= this.accel;
            }
            else if (this.accRight === true) {
                this.xSpeed += this.accel;
            }
            if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
                this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
            }
            this.player.x += this.xSpeed;
        }
        onDisable() {
            Laya.stage.off(Event.KEY_DOWN, this, this._onKeyDown);
            Laya.stage.off(Event.KEY_UP, this, this._onKeyUp);
        }
        stopAllActions() {
            this.timeline.reset();
        }
    }

    class Util {
        constructor() { }
        static getInstance() {
            if (!Util.instance) {
                Util.instance = new Util();
            }
            return Util.instance;
        }
        calcDistance(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        }
    }

    class Star extends Laya.Script {
        constructor() {
            super();
            this.pickRadius = 60;
        }
        onEnable() {
        }
        getPlayerDistance() {
            var dist = Util.getInstance().calcDistance(this.owner, this.game.monster.owner);
            return dist;
        }
        onPicked() {
            console.log('zytest: onPicked');
            this.game.spawnNewStar();
            this.game.gainScore();
            this.owner.destroy();
        }
        onUpdate() {
            if (this.getPlayerDistance() < this.pickRadius) {
                console.log('zytest: 小于');
                this.onPicked();
                return;
            }
        }
        onDisable() {
        }
    }

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.score = 0;
            this.timer = 0;
            this.starDuration = 0;
            this.maxStarDuration = 6000;
            this.minStarDuration = 3000;
            this.groundY = 0;
        }
        onEnable() {
            this.timer = Date.now();
            this.starDuration = 3000;
            this.groundY = this.owner.getChildByName('ground').y;
            this.monster = this.owner.getChildByName('monster').getComponent(Monster);
            this.scoreDisplay = this.owner.getChildByName('score');
            this.spawnNewStar();
        }
        spawnNewStar() {
            console.log('zytest: 111111111');
            console.log('zytest: starPrefab', this.starPrefab);
            let newStar = Laya.Pool.getItemByCreateFun("starPrefab", this.starPrefab.create, this.starPrefab);
            console.log('zytest: newStar', newStar);
            this.owner.addChild(newStar);
            let randomPos = this.getNewStarPosition();
            newStar.pos(randomPos.x, randomPos.y);
            newStar.getComponent(Star).game = this;
            this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
            this.timer = Date.now();
        }
        getNewStarPosition() {
            var randX = Math.random() * Laya.stage.width;
            const jumpHeight = this.monster.jumpHeight;
            var randY = this.groundY - Math.random() * jumpHeight;
            return { x: randX, y: randY };
        }
        gainScore() {
            this.score += 1;
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
        gameOver() {
        }
        saveScore() {
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000;
            xhr.once(Laya.Event.COMPLETE, this, () => {
            });
            xhr.once(Laya.Event.ERROR, this, () => {
            });
            xhr.once(Laya.Event.PROGRESS, this, () => {
            });
            xhr.send("res/data.data", "", "get", "text");
            console.log("aaaa");
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/FlowUI.ts", FlowUI);
            reg("script/GameUI.ts", GameUI);
            reg("script/Monster.ts", Monster);
            reg("script/GameControl.ts", GameControl);
            reg("script/Star.ts", Star);
        }
    }
    GameConfig.width = 1360;
    GameConfig.height = 760;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "game.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
            console.log('zytest: 1111');
        }
    }
    new Main();

}());
