import type { Doc } from "../../convex/_generated/dataModel";

export type FullEvent = Doc<"events"> & {
  venue: Doc<"venues"> | null;
  ticketTypes: Doc<"ticketTypes">[];
};
