type Messages = typeof import("./messages/fr-CH.json");

declare interface IntlMessages extends Messages {
  default: Messages;
}
