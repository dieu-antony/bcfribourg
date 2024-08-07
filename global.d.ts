type Messages = typeof import("./messages/fr-CH.json");
type DeMessages = typeof import("./messages/fr-CH.json");

declare interface IntlMessages extends Messages, DeMessages {default: any}


