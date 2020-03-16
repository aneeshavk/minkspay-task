import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PromptData } from "../models/toast.model";

@Injectable({
  providedIn: "root"
})
export class PromptService {
  /**
   * defaults for various texts
   */
  private defaults = {
    positiveButton: "Continue",
    negativeButton: "Cancel",
    heading: "Confirm"
  };

  /**
   * subject for providing prompts
   */
  private promptSub = new Subject<PromptData>();

  /**
   * observable for listening in on new prompts
   */
  private prompt$ = this.promptSub.asObservable();

  /**
   * public accessor for prompt observable
   */
  public get prompts$() {
    return this.prompt$;
  }

  /**
   * construct the service
   */
  constructor() {}

  /**
   * show a prompt with only the base data
   * @param heading heading to be shown on the prompt
   * @param message message to be shown on the prompt
   * @param positiveAction action to be performed when positive button is clicked
   * @param negativeAction action to be performed when negative button is clicked (optional)
   */
  public showSimple(
    heading: string,
    message: string,
    positiveAction: () => void,
    negativeAction: () => void = () => {}
  ) {
    this.promptSub.next({
      heading: heading || this.defaults.heading,
      message,
      negativeAction,
      negativeButton: this.defaults.negativeButton,
      positiveButton: this.defaults.positiveButton,
      positiveAction
    });
  }

  /**
   * show a fully customisible prompt
   * @param heading heading to be shown on the prompt
   * @param message message to be shown on prompt
   * @param positiveButton positive button text
   * @param negativeButton negative button text
   * @param positiveAction action to be performed when positive button is clicked
   * @param negativeAction action to be performed when negative button is clicked (optional)
   */
  public showWithButton(
    heading: string,
    message: string,
    positiveButton: string,
    negativeButton: string,
    positiveAction: () => void,
    negativeAction: () => void = () => {}
  ) {
    this.promptSub.next({
      heading: heading || this.defaults.heading,
      message,
      negativeAction,
      negativeButton: negativeButton || this.defaults.negativeButton,
      positiveButton: positiveButton || this.defaults.positiveButton,
      positiveAction
    });
  }
}
