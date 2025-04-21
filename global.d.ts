type Messages = typeof import("./messages/fr-CH.json");

declare interface IntlMessages extends Messages {
  default: Messages;
}

interface Grecaptcha {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface Window {
  grecaptcha: Grecaptcha;
}