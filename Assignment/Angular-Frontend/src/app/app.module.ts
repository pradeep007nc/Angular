import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponentComponent } from './components/demo-component/demo-component.component';
import { AppAreaChartComponent } from './components/app-area-chart/app-area-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponentComponent,
    AppAreaChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
