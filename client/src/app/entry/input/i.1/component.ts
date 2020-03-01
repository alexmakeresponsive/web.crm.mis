import { Component, Input } from '@angular/core';


@Component({
  selector: 'input-i1',
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
