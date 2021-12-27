import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-social-link-list',
  templateUrl: './social-link-list.component.html',
  styleUrls: ['./social-link-list.component.scss']
})
export class SocialLinkListComponent implements OnInit {

  // See this post: https://stackoverflow.com/q/163628
  address = 'legacyazd@gmail.com';

  constructor() {}

  ngOnInit(): void {}

}
