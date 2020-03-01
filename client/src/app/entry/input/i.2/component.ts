import { Component, Input } from '@angular/core';


@Component({
  template: `
            <div class="row">
              <div class="col-{{parameters.col}}">
                <input type="text"
                       [className]="parameters.className"
                       [id]="parameters.id"
                >
              </div>
            </div>
            `
})
export class InputI2Component {
  @Input() parameters;
}
