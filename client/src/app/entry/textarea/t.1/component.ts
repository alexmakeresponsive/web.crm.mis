import { Component, Input } from '@angular/core';


@Component({
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
