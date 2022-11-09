(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
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
            const timeline = Laya.TimeLine.to(this.player, { y: this.player.y - 200 }, this.jumpDuration).to(this.player, { y: this.player.y }, this.jumpDuration);
            timeline.play(null, true);
        }
        _onKeyDown(e) {
            switch (e.keyCode) {
                case 37:
                    this.accLeft = true;
                    console.log('zytest: this.accLeft', this);
                    break;
                case 39:
                    this.accRight = true;
                    break;
            }
        }
        _onKeyUp(e) {
            switch (e.keyCode) {
                case 37:
                    this.accLeft = false;
                    console.log('zytest: this.accLeft', this);
                    break;
                case 39:
                    this.accRight = false;
                    break;
            }
        }
        onUpdate() {
            if (this.accLeft === true) {
                console.log('successin');
                this.xSpeed -= this.accel;
            }
            if (this.accRight === true) {
                console.log('successin2');
                console.log('zytest: right');
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
    }

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.maxStarDuration = 0;
            this.minStarDuration = 0;
            this.groundY = 0;
        }
        onEnable() {
            this.groundY = this.owner.getChildByName('ground').y;
            this.spawnNewStar();
        }
        onDisable() {
        }
        spawnNewStar() {
            console.log('zytest: 111111111');
            console.log('zytest: starPrefab', this.starPrefab);
        }
        getNewStarPosition() {
        }
    }

    class Star extends Laya.Script {
        constructor() {
            super();
            this.pickRadius = 0;
        }
        onEnable() {
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
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
        }
    }
    new Main();

}());
