import type { CalendarResponseFix, NodeICalSyncFix } from "~/lib/types";

/* eslint-disable */
const nodeIcal = require("node-ical");

export const sync: NodeICalSyncFix = {
  parseICSFix: (body: string): CalendarResponseFix => {
    return nodeIcal.parseICS(body);
  },
  parseFileFix: (file: string): CalendarResponseFix => {
    return nodeIcal.parseFile(file);
  },
};
/* eslint-enable */