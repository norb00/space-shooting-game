import { IPosition } from './interfaces';

export default class MouseInputHandler {
  private canvas: HTMLCanvasElement;
  constructor(elements: Array<any>) {
    this.canvas = document.querySelector('#game-canvas');
    if (!this.canvas) return;
 
    this.canvas.addEventListener('click', (event: MouseEvent) => {
      const mousePos = this.getMousePos(this.canvas, event);
      elements.forEach(element => {
        if (this.isInside(mousePos, element)) {
          if (element.action) element.action();
          return;
        }
      });
    }, false);
  }

  getMousePos(canvas: HTMLCanvasElement, event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
  isInside(pos: IPosition, rect: any) {
    return (
      pos.x >= rect.x && 
      pos.x <= (rect.x + rect.width) && 
      pos.y <= (rect.y + rect.height) && 
      pos.y >= rect.y);
  }
}
