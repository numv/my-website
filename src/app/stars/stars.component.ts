import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class StarsComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.content = this.sanitizer.bypassSecurityTrustHtml(this.createStars());
  }

  content : SafeHtml | null = null;

  createStars() : string
  {
    var stars = '';
    for (var i = 0; i < 100; i++) {
      var star =
        '<div class="star" style="animation: twinkle ' +
        (Math.random() * 5 + 5) +
        "s linear " +
        -(Math.random() * 5 + 5) +
        "s infinite; top: " +
        Math.random() * window.screen.height +
        "px; left: " +
        Math.random() * window.screen.width +
        'px;"></div>';

        stars += star;
    }
    return stars;

  }


}
