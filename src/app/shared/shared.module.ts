import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavBarComponent, HeaderComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule, HttpClientModule],
  exports: [CustomMaterialModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
