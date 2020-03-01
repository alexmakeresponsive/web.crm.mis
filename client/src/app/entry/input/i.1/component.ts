import { Component, Input } from '@angular/core';


@Component({
  template: `
              <input type="text"
                     [className]="parameters.className"
                     [id]="parameters.id"
              >
            `
})
export class InputI1Component {
  @Input() parameters;
}
