import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isDrawerOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
