import { Component } from "@angular/core";
import { ToastService } from "../services/toaster.service";
import { ToastData } from "../models/toast.model";

interface ToastInstance {
  data: ToastData;
  timer?: any;
  id?: string;
  removing: boolean;
}

@Component({
  selector: "app-toast",
  templateUrl: "./toaster.component.html",
  styleUrls: ["./toaster.component.scss"]
})
export class ToastComponent {
  /**
   * list of the toast instances
   */
  private toastList: ToastInstance[] = [];

  /**
   * ui getter for the toastInstances
   */
  public get toastInstances(): ToastInstance[] {
    return this.toastList;
  }

  /**
   * construct the hawk toast component
   */
  constructor(private toaster: ToastService) {
    this.toaster.toastEntries.subscribe(t => {
      const thisSelf = this;
      const toast: ToastInstance = {
        data: t,
        id: this.generateId(),
        removing: false
      };

      this.toastList.push(toast);

      toast.timer = setTimeout(() => {
        thisSelf.removeToast(toast);
      }, t.timeout);
    });
  }

  /**
   * generate random ids for the toasts
   */
  public generateId(): string {
    return Math.floor(Math.random() * 1e6).toString();
  }

  /**
   * remove a toast from the list by the instance
   * @param toast toast instance to be removed
   */
  public removeToast(toast: ToastInstance) {
    const i = this.toastInstances.findIndex(x => x.id === toast.id);
    if (i >= 0) {
      this.removeToastByIndex(i);
    }
  }

  /**
   * remove a toast instance from the system based on the instance
   * @param i index of the toast to be removed
   */
  public removeToastByIndex(i: number) {
    const thisSelf = this;
    if (this.toastList[i]) {
      const toast = this.toastList[i];
      toast.removing = true;
      clearInterval(toast.timer);

      // animation time-out
      setTimeout(() => {
        const cIndex = thisSelf.toastInstances.findIndex(
          x => x.id === toast.id
        );
        thisSelf.toastList.splice(cIndex, 1);
      }, 500);
    }
  }
}
