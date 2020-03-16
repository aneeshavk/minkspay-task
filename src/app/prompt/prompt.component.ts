import { Component, OnDestroy } from "@angular/core";
import { PromptData } from "../models/toast.model";
import { PromptService } from "../services/prompt.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-prompt",
  templateUrl: "./prompt.component.html",
  styleUrls: ["./prompt.component.scss"]
})
export class PromptComponent implements OnDestroy {
  /**
   * prompt subscription
   */
  private promptSub: Subscription;

  /**
   * prompts that are currently active in the system
   */
  private activePrompts: PromptData[] = [];

  /**
   * active prompts getter for template
   */
  public get activePrompts$(): PromptData[] {
    return this.activePrompts;
  }

  /**
   * construct the component
   * @param prompts prompts service
   */
  constructor(private prompts: PromptService) {
    this.prompts.prompts$.subscribe(this._addPrompt.bind(this));
  }

  /**
   * add a new prompt
   * @param prompt prompt data for the new prompt
   */
  private _addPrompt(prompt: PromptData) {
    this.activePrompts.push(prompt);
  }

  /**
   * handle the negative action
   * @param prompt prompt for which action is performed
   * @param index prompt's index in the array
   */
  public negativeAction(prompt: PromptData, index: number) {
    if (prompt.negativeAction) {
      prompt.negativeAction();
    }

    this._removePrompt(index);
  }

  /**
   * handle the positive action
   * @param prompt prompt for which action is performed
   * @param index prompt's index in the array
   */
  public positiveAction(prompt: PromptData, index: number) {
    if (prompt.positiveAction) {
      prompt.positiveAction();
    }

    this._removePrompt(index);
  }

  /**
   * remove a prompt from active list
   * @param index index of the prompt
   */
  private _removePrompt(index: number) {
    this.activePrompts.splice(index, 1);
  }

  /**
   * destroy the prompt
   */
  public ngOnDestroy() {
    this.promptSub.unsubscribe();
  }
}
