import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// service
import { LaunchService } from 'src/app/services/launch.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        LaunchService
      ]
    }
  }
 }
