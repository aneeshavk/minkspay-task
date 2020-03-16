import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { ToastData } from "../models/toast.model";

/**
 * usual toast durations
 */
export const DURATIONS = {
  QUICK: 2000,
  MEDIUM: 4000,
  LONG: 10000
};

@Injectable({
  providedIn: "root"
})
export class ToastService {
  /**
   * subject for monitoring toast data
   */
  private toastSubject = new Subject<ToastData>();

  /**
   * observable for listening on toast data changes
   */
  private toastObservable = this.toastSubject.asObservable();

  /**
   * getter for observers to access _toastObservable
   */
  public get toastEntries(): Observable<ToastData> {
    return this.toastObservable;
  }

  /**
   * show a message in toaster
   * @param message message to be shown in toaster
   * @param timeout timout for the toaster to exit
   */
  public show(message: string, timeout: number = DURATIONS.MEDIUM) {
    const data: ToastData = {
      message,
      timeout
    };

    this.toastSubject.next(data);
  }
}
