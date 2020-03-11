import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'table-tb-2',
  templateUrl: './component.html'
})
export class TableTb2Component implements OnInit {
  @Input() dataHead;
  @Input() component;
  @Input() payload;
           dataClone;
           /*
           * [{..}, {f_25_t_1: '', f_25_t_2: '', f_25_t_3: '', f_25_t_4: ''}, {..}]
           * */
           dataTemplate;
  @Output() emitterData:EventEmitter<any> = new EventEmitter();
  @Output() emitterInstance:EventEmitter<any> = new EventEmitter();
  @Output() emitterAction:EventEmitter<any> = new EventEmitter();

  count = 1;
  objectKeys = Object.keys;

  ngOnInit() {
    if(!this.payload) {
      this.payload = JSON.parse('{}');
    } else {
      this.payload = JSON.parse(this.payload);
    }

    this.dataClone = this.payload;
    this.dataTemplate = Object.values(this.dataClone);
  }

  removeTd(id) {
    delete this.dataClone[id];
    this.dataTemplate = Object.values(this.dataClone);

    this.emitterAction.emit({
      action: 'removeEntryComponentInstance',
      formControlName: this.component.parameters.formControlName,
      payload: {
        id: id,
      }
    });
  }

  removeTdAll() {
    this.emitterAction.emit({
      action: 'removeAllEntryComponentInstance',
      formControlName: this.component.parameters.formControlName,
      payload: this.dataTemplate
    });

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

    this.emitterAction.emit({
      action: 'addEntryComponentInstance',
      formControlName: this.component.parameters.formControlName,
      payload: {
        id: idMaxNext,
      }
    });
  }

  rollbackData() {

  }

  setDataFromEntryComponent(res) {
    this.emitterData.emit(res);
  }

  getInstanceEntryComponent(instance) {
    this.emitterInstance.emit(instance);
  }

  actionController(res) {
    switch (res.action) {
      case 'removeTd': {
        this.removeTd(res.id);
      }
    }
  }
}
