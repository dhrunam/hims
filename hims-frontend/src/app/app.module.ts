import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { tokenInterceptor } from './interceptors/token/token-interceptor.interceptor';
import { ServicesModule } from './services/services.module';
import { UtilitiesModule } from './utilities/utilities.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilitiesModule,
    ServicesModule,
  ],
  providers: [tokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
