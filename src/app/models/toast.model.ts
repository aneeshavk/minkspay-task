export interface ToastData {
  message: string;
  timeout: number;
}

export interface PromptData {
  heading: string;
  message: string;
  positiveButton: string;
  negativeButton: string;
  positiveAction: () => void;
  negativeAction: () => void;
}
