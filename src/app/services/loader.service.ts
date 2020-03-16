import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  /**
   * loader subject
   */
  private loaderSubject = new Subject<boolean>();

  /**
   * loader observable for listeners
   */
  private loaderObservable = this.loaderSubject.asObservable();

  /**
   * getter for listeners to get the loader observable
   */
  public get loading(): Observable<boolean> {
    return this.loaderObservable;
  }

  /**
   * construct the loader service
   */
  constructor() {}

  /**
   * show the loader
   */
  public show() {
    this.loaderSubject.next(true);
  }

  /**
   * hide the loader
   */
  hide() {
    this.loaderSubject.next(false);
  }
}
