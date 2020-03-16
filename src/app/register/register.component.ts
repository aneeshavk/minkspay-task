import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoaderService } from "../services/loader.service";
import { ToastService } from "../services/toaster.service";
import { LoginData } from "../models/login.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  public regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private users: UserService,
    private loader: LoaderService,
    private toaster: ToastService
  ) {
    this.createRegistrationForm();
  }

  private createRegistrationForm() {
    this.regForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public onSubmit(data: LoginData) {
    this.regForm.markAllAsTouched();

    if (this.regForm.valid) {
      this.loader.show();
      this.users.register(data).subscribe(
        r => {
          if (r && r.token) {
            this.users.setLogin(r);
          } else {
            this.toaster.show("Unable to register, please try again.");
          }

          this.loader.hide();
        },
        (e: HttpErrorResponse) => {
          if (e && e.error && e.error.error) {
            this.toaster.show(e.error.error);
          } else {
            this.toaster.show(
              "An unknown error occurred while registering, please try again."
            );
          }

          this.loader.hide();
        }
      );
    } else {
      this.toaster.show("Please provide an email and password.");
    }
  }
}
