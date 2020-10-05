export default class ScrollingSprite {
    private image: any;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number;

    constructor(image: any, x: number, y: number, width: number, height: number, speed: number) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    scroll() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = this.width - 1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}