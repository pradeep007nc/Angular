import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponentComponent } from './components/demo-component/demo-component.component';
import { ChartAreaComponent } from './components/chart-area/chart-area.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponentComponent,
    ChartAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
