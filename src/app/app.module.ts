import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';

// Fake Server
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

// Material Module
import { MaterialModule } from './shared/material.module';
import { LoadingInterceptor } from './services/interceptor/loading-interceptor';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
        MaterialModule,
        HeroListComponent
    ],
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    bootstrap: [AppComponent],
    providers:[ { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }]
})
export class AppModule { }