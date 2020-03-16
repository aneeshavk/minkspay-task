import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from "./loader/loader.component";
import { HttpClientModule } from "@angular/common/http";
import { ToastComponent } from "./toaster/toaster.component";
import { RegisterComponent } from "./register/register.component";
import { LayoutComponent } from "./layout/layout.component";
import { UserListerComponent } from "./users/lister/lister.component";
import { CommonModule } from "@angular/common";
import { UserEditComponent } from "./users/edit/edit.component";
import { PromptComponent } from "./prompt/prompt.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    ToastComponent,
    RegisterComponent,
    LayoutComponent,
    UserListerComponent,
    UserEditComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
