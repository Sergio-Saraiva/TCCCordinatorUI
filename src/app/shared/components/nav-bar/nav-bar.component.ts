import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() isDrawerOpen: boolean = false;
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}
