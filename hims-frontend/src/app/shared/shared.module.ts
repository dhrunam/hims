import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PromptComponent } from './components/prompt/prompt.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PromptComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ HeaderComponent, CommonModule, PromptComponent],
})
export class SharedModule { }
