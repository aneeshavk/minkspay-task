import { Component } from "@angular/core";
import { LoaderService } from "../services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent {
  /**
   * determines whether the system is loading or not
   */
  private loadingSignal = false;

  /**
   * UI binding for loading - to show loader
   */
  public get loading(): boolean {
    return this.loadingSignal;
  }

  /**
   * construct the loader component
   * @param loader loader serviceq
   */
  constructor(loader: LoaderService) {
    loader.loading.subscribe(val => {
      this.loadingSignal = val;
    });
  }
}
