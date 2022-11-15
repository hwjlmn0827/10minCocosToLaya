export default class Util {
    static instance: Util;

    constructor() {}

    static getInstance() {
        if (!Util.instance) {
            Util.instance = new Util();
        }
        return Util.instance;
    }

    /**
     * calcDistance between sprites
     */
    public calcDistance(a: Laya.Sprite, b: Laya.Sprite) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
}