import {AfterViewInit, Directive, Input, OnChanges, OnInit, Output, ElementRef, EventEmitter, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBlockStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlockStyleDirective implements OnInit, AfterViewInit, OnChanges{
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();
  private items: HTMLElement[];
  private index: number = 0;
  constructor(private el: ElementRef) {

  }
  ngOnInit():void {
  }

  ngAfterViewInit() {
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid blue');
        }
      }
    } else {
      console.log("Не передан селектор");
    }
    setTimeout(() => {
      this.renderComplete.emit(true);
    })

  }

  ngOnChanges(data: SimpleChanges) {
  }

  initKeyUp(ev: KeyboardEvent): void {

    if (!['ArrowRight', 'ArrowLeft'].includes(ev.key)) {
      return;
    }

    if ((ev.key === 'ArrowRight' && (this.items.length - 1) === this.index) || (ev.key === 'ArrowLeft' && this.index === 0)) {
      return;
    }

    (this.items[this.index] as HTMLElement).removeAttribute('style');

    if (ev.key === 'ArrowRight') {
      this.index++;
    } else if (ev.key === 'ArrowLeft') {
      this.index--;
    }

    if (this.items[this.index]) {
      (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid blue');
    }

  }

  getActiveElement(): number {
    return this.index + 1;
  }

  initStyle(index: number) {
    this.items.forEach((item) => item.removeAttribute('style'));
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid blue');
      this.index = index;
    }
  }

}
