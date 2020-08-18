import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        const url = event.url;

        if (url === '/login' || url === '/') {
          return;
        }

        const state = JSON.parse(window.localStorage.state);
              state.url.lastVisited = url;

        window.localStorage.state = JSON.stringify(state);
      }
    });
  }

  ngOnInit() {
    const state = {
      url: {
        lastVisited: ''
      }
    };
    window.localStorage.state = JSON.stringify(state);
  }
}
