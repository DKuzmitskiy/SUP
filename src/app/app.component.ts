import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var jsPlumb: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'SUP';
  @ViewChild('container') container;
  @ViewChild('el_1') el_1;
  @ViewChild('el_2') el_2;
  @ViewChild('el_3') el_3;
  @ViewChild('el_4') el_4;
  @ViewChild('rubberband') rubberband;

  startPoint = {x: 0, y: 0};
  common2 = {
    isSource: true,
    isTarget: true
    // connector: ['Straight']
  };

  constructor(private elRef: ElementRef) {

  }

  ngOnInit() {
  }

  addElement() {
    const me = this;
    me.el_4.nativeElement.style.display = 'block';
    jsPlumb.ready(() => {
      jsPlumb.draggable(me.el_4.nativeElement);
      jsPlumb.addEndpoint(me.el_4.nativeElement, {
        anchors: ['Top']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_4.nativeElement, {
        anchors: ['Right']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_4.nativeElement, {
        anchors: ['Left']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_4.nativeElement, {
        anchors: ['Bottom']
      }, this.common2);
    });
  }

  ngAfterViewInit() {
console.log(this.elRef);
    const me = this;
    const common = {
      connector: ['Straight'],
      anchor: ['Left', 'Right'],
      endpoint: 'Rectangle'
    };

    console.log(me.container);


    jsPlumb.ready(() => {
      jsPlumb.setContainer(me.container.nativeElement);
      jsPlumb.draggable(me.el_1.nativeElement);
      jsPlumb.draggable(me.el_2.nativeElement);
      jsPlumb.draggable(me.el_3.nativeElement);

      // me.container.nativeElement.mouseDown = this.container_MouseDown;
      // me.container.nativeElement.onmousemove = this.container_MouseMove;
      // me.container.nativeElement.mouseup = this.container_MouseUp;

      jsPlumb.addEndpoint(me.el_1.nativeElement, {
        anchor: 'Right'
        // endpoint: 'Rectangle'
      }, this.common2);
      jsPlumb.addEndpoint(me.el_2.nativeElement, {
        anchors: ['Top']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_2.nativeElement, {
        anchors: ['Right']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_2.nativeElement, {
        anchors: ['Left']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_2.nativeElement, {
        anchors: ['Bottom']
      }, this.common2);
      jsPlumb.addEndpoint(me.el_3.nativeElement, {
        anchors: ['Left']
      }, this.common2);

      // jsPlumb.connect({
      //   source: me.el_1.nativeElement,
      //   target: me.el_3.nativeElement,
      //   overlays: [ ['Arrow' , { width: 12, length: 12, location: 0.67 }] ]
      //    }, common );
    });

  }

  container_MouseDown(event) {
    this.startPoint.x = event.pageX;
    this.startPoint.y = event.pageY;
    const css = 'display: block;' +
     'height: 1px; width: 1px; top: ' + this.startPoint.y + 'px; left: ' + this.startPoint.x + 'px; position: absolute;';
    this.rubberband.nativeElement.style.cssText += css;
  }

   container_MouseMove(event) {

    //  console.log(this.rubberband.nativeElement.style);
    console.log(this.rubberband.nativeElement.style.display !== 'block');
    if (this.rubberband.nativeElement.style.display !== 'block') { return; }

    // Get the top- and left values
    const t = (event.pageY > this.startPoint.y) ? this.startPoint.y : event.pageY;
    const l = (event.pageX >= this.startPoint.x) ? this.startPoint.x : event.pageX;

    // Get the width of the rubberband
    const wcalc = event.pageX - this.startPoint.x;
    const w = (event.pageX > this.startPoint.x) ? wcalc : (wcalc * -1);

    // Get the height of the rubberband
    const hcalc = event.pageY - this.startPoint.y;
    const h = (event.pageY > this.startPoint.y) ? hcalc : (hcalc * -1);

    // Update the rubberband with the new values
     const css = 'height: ' + h + 'px; width: ' + w + 'px; top: ' + t + 'px; left: ' + l + 'px; position: absolute;';
     this.rubberband.nativeElement.style.cssText += css;
  }

  container_MouseUp(event) {
    this.rubberband.nativeElement.style.display = 'none';
  }


}
