import { Component, Input } from '@angular/core';


@Component({
  selector: 'input-i1',
  template: `
              <textarea [id]="parameters.id"
                        [rows]="parameters.rows"
                        [className]="parameters.className"
              >
              </textarea>
            `
})
export class TextareaT1Component {
  @Input() parameters;
}
