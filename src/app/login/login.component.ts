import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginData } from "../models/login.model";
import { UserService } from "../services/user.service";
import { LoaderService } from "../services/loader.service";
import { ToastService } from "../services/toaster.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private users: UserService,
    private loader: LoaderService,
    private toaster: ToastService
  ) {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public onSubmit(data: LoginData) {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loader.show();
      this.users.login(data).subscribe(
        r => {
          if (r && r.token) {
            this.users.setLogin(r);
          } else {
            this.toaster.show("Unable to login, please try again.");
          }

          this.loader.hide();
        },
        (e: HttpErrorResponse) => {
          if (e && e.error && e.error.error) {
            this.toaster.show(e.error.error);
          } else {
            this.toaster.show(
              "An unknown error occurred while loggin in, please try again."
            );
          }

          this.loader.hide();
        }
      );
    } else {
      this.toaster.show("Please provide your email and password.");
    }
  }
}
