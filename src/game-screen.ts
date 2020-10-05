import { IMenuButton, IPosition, ISize } from "./interfaces";

export default class GameScreen {
  private size: ISize;
  private content: string = '';
  private buttonElements: Array<any> = [];
  private imageElements: Array<any> = [];

  constructor(size: ISize) {
    this.size = size;
  }

  setContent(content: string, position?: IPosition) {
    this.content = content;
  }

  addMenuButton(menuButton: IMenuButton) {
    this.buttonElements.push(menuButton);
  }

  addImages(image: any) {
    this.imageElements.push(image);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.rect(0, 0, this.size.width, this.size.height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    if (this.content){
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(this.content, this.size.width / 2, this.size.height / 2);
    }

    if (this.buttonElements.length > 0) {
      this.buttonElements.forEach(element => {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.beginPath();
        ctx.rect(element.x, element.y, element.width, element.height); 
        ctx.fillStyle = element.fillStyle;
        ctx.lineWidth = element.lineWidth;
        ctx.strokeStyle = element.strokeStyle; 
        ctx.stroke();
        ctx.closePath();
        ctx.font = element.font;
        ctx.fillStyle = element.fillStyle;
        ctx.fillText(element.content, element.x + element.width / 2 , element.y + element.height / 2 + 10);
      });
    }

    if (this.imageElements.length > 0) {
      this.imageElements.forEach(image => {
        ctx.drawImage(image.image, this.size.width / 2 - image.size.width / 2, 80, image.size.width, image.size.height);
      });
    }
  }
}