import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ModalModule} from "./components/modal/modal.module";
import {BrowserModule} from "@angular/platform-browser";
import {HeaderModule} from "./components/header/header.module";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ParamInterceptor} from "./interceptor/param-interceptor.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const routes: Routes = [
  {
    path: "", loadChildren: () => import('./components/user-table/user-table.module').then(m => m.UserTableModule)

  },
  {
    path: "aboutUs", loadChildren: () => import('./components/about-us/about-us.module').then(m => m.AboutUsModule)
  },

  {
    path: `user/:${Number}`, loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },

  {
    path: "", redirectTo: "", pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule,
    HeaderModule,
    RouterModule.forRoot(routes),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }
  ],

  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
