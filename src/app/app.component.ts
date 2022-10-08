import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService) {
    let languge: string = navigator.language;
    if (languge) {
      translate.use(languge.slice(0, 2));
    }
  }

  async ngOnInit() {}
}
