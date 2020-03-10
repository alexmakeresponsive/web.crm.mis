import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'part-nav-msa',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class PartNavMsaComponent {
  constructor(private location: Location) { }

  getPath():string {
    const p:string = this.location.path();

    return p;
  }

  path: string = this.getPath();

  data: object[] = [
    {
      title: 'Направление на МСЭ',
      href: '/service/msa/ticket',
    },
    {
      title: 'Сведения о результатах проведённой МСЭ',
      href: '/service/msa/result'
    },
    {
      title: 'Журнал обмена с РЭМД',
      href: '/service/msa/remd'
    },
    {
      title: 'Журнал направлений на МСЭ',
      href: '/service/msa/journal'
    },
  ];

  list:any = this.data.map((item:any) => {
        item.isActive = false;

    if (item.href === this.path) {
        item.isActive = true;
    }
    return item;
  });

}
