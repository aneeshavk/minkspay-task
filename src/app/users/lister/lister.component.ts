import { Component, ChangeDetectorRef } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user.model";
import { LoaderService } from "src/app/services/loader.service";
import { ToastService } from "src/app/services/toaster.service";
import { PromptService } from "src/app/services/prompt.service";

@Component({
  selector: "app-user-lister",
  templateUrl: "./lister.component.html",
  styleUrls: ["./lister.component.scss"]
})
export class UserListerComponent {
  public userList: User[] = [];

  public searchResults: User[] = [];

  private page = 1;

  private loadingDone = false;

  public editUser: User;

  public search = "";

  public get searchedList() {
    if (this.search && this.search.trim().length > 0) {
      return this.searchResults;
    } else {
      return this.userList;
    }
  }

  constructor(
    private users: UserService,
    private loader: LoaderService,
    private toaster: ToastService,
    private prompt: PromptService
  ) {
    this.loadUsers();
  }

  private loadUsers() {
    if (this.loadingDone) {
      return;
    }

    this.loader.show();
    this.users.list(this.page).subscribe(
      r => {
        this.loader.hide();
        if (r.data.length === 0) {
          this.loadingDone = true;
        }
        this.userList = this.userList.concat(r.data);
      },
      e => {
        this.loader.hide();
        if (e && e.error && e.error.error) {
          this.toaster.show(e.error.error);
        } else {
          this.toaster.show(
            "An unknown error occurred while trying to load users please try again."
          );
        }
      }
    );
  }

  public onEdit(user: User) {
    this.editUser = user;
  }

  public onUpdateComplete(user: User) {
    if (user) {
      const foundUser = this.userList.find(x => x.id === user.id);
      const splitName = user.name.split(" ");

      foundUser.first_name = splitName[0];
      foundUser.last_name = splitName[1] ? splitName[1] : "";
    }

    this.editUser = null;
  }

  public deleteAction(user: User) {
    this.prompt.showWithButton(
      "Are you sure you want to delete?",
      "Deleting will permanantly remove the user from the system, continue with caution.",
      "Delete",
      "Cancel",
      this.onDelete.bind(this, user)
    );
  }

  private onDelete(user: User) {
    this.loader.show();
    this.users.delete(user).subscribe(
      r => {
        this.userList = this.userList.filter(x => x.id !== user.id);
        this.loader.hide();
      },
      e => {
        this.loader.hide();
        if (e && e.error && e.error.error) {
          this.toaster.show(e);
        } else {
          this.toaster.show(
            "Some unknown error occurred while trying to delete the user."
          );
        }
      }
    );
  }

  onSearchChange(s) {
    if (s) {
      const rgx = new RegExp("^" + s, "i");
      this.searchResults = this.userList.filter(
        x => x.first_name.match(rgx) || x.last_name.match(rgx)
      );
      this.search = s;
    } else {
      this.search = null;
      this.searchResults = [];
    }
  }
}
