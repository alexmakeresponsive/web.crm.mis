import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  templateUrl: './component.html'
})
export class TableTb1Component implements OnInit, OnChanges {
  @Input() parameters;
  @Input() data;
           dataClone;
           dataTemplate;

  ngOnInit() {
    this.dataClone = this.data;
    this.dataTemplate = Object.values(this.dataClone);
  }

  removeTd(id) {
    delete this.dataClone[id];
    this.dataTemplate = Object.values(this.dataClone);
  }

  removeTdAll() {
    this.dataClone    = {};
    this.dataTemplate = Object.values(this.dataClone);
  }

  addTd() {
    let idMax;
    let idMaxNext;

    if(this.dataTemplate.length === 0) {
      idMaxNext = 1;
    } else {
      idMax = Math.max.apply(null, Object.keys(this.dataClone));
      idMaxNext = +idMax + 1;
    }

    this.dataClone[idMaxNext] = {id: idMaxNext};
    this.dataTemplate         = Object.values(this.dataClone);
  }
}
