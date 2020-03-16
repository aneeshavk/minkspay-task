import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoaderService } from "src/app/services/loader.service";
import { ToastService } from "src/app/services/toaster.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class UserEditComponent {
  private userData: User;

  @Input()
  get user(): User {
    return this.userData;
  }
  set user(v: User) {
    this.userData = v;
    this.initForm(this.user);
  }

  @Output()
  public closed = new EventEmitter<User>();

  public userForm: FormGroup;

  constructor(
    private users: UserService,
    private fb: FormBuilder,
    private loader: LoaderService,
    private toaster: ToastService
  ) {}

  private initForm(user: User) {
    this.userForm = this.fb.group({
      name: [user.first_name + " " + user.last_name, Validators.required],
      job: [user.job, Validators.required]
    });
  }

  saveUser(data: User) {
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      this.loader.show();
      this.users.save(this.user.id, data).subscribe(
        r => {
          this.loader.hide();

          if (r) {
            r.id = this.userData.id;
            this.closed.emit(r);
          }
        },
        e => {
          this.loader.hide();

          if (e && e.error && e.error.error) {
            this.toaster.show(e.error.error);
          }
        }
      );
    } else {
      this.toaster.show("Please fill in all the details and try again.");
    }
  }

  public closeAction() {
    this.closed.emit(null);
  }
}
