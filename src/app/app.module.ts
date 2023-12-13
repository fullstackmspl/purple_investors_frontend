import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { DragulaService } from "ng2-dragula";
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard, LoginGuard } from "./shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { MarkdownModule } from "ngx-markdown";
import { ErrorInterceptor } from "./shared/interceptor/error";
import { HeaderInterceptor } from "./shared/interceptor/header";
import { LocalStorageService } from "./shared/services/local-storage.service";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

var firebaseConfig = {
  apiKey: "AIzaSyC9XfnIpwNoSv7cyAsoccFQ5EYPd7lZXrk", //YOUR_API_KEY
  authDomain: "apex-angular.firebaseapp.com", //YOUR_AUTH_DOMAIN
  databaseURL: "https://apex-angular.firebaseio.com", //YOUR_DATABASE_URL
  projectId: "apex-angular", //YOUR_PROJECT_ID
  storageBucket: "apex-angular.appspot.com", //YOUR_STORAGE_BUCKET
  messagingSenderId: "447277845463", //YOUR_MESSAGING_SENDER_ID
  appId: "1:447277845463:web:9a7db7aaeaf3a7217a9992", //YOUR_APP_ID
  measurementId: "G-ZVSYZRJ211" //YOUR_MEASUREMENT_ID
};


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBhVQKXquGT9zTznHXq1A6YJCcrrC5HWv8",
      libraries: ['places']
    }),
    PerfectScrollbarModule,
    MarkdownModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
