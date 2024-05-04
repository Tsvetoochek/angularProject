import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AuthService } from "./services/auth/auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RestInterceptorsService } from './services/interceptors/rest-interceptors.service';
import { ConfigServiceService } from './services/config/config-service.service';



export function initializeApp(config: ConfigServiceService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigServiceService.config);
  });
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers:  [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: RestInterceptorsService, 
    multi: true
  },
    AuthService,
    ConfigServiceService,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ConfigServiceService],
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
