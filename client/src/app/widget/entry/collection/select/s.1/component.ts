import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './component.html'
})
export class SelectS1Component {
  @Input() payload: string[];

  formData = {component: 'SelectS1Component'};

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {

  }

  public removed(value:any):void {

  }

  public typed(value:any):void {

  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  getFormValue() {
    return {data: 'some select data'}
  }
}
