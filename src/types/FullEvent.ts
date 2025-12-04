import type { Doc } from "../../convex/_generated/dataModel";

export type FullEvent = Doc<"events"> & {
  venue: Doc<"venues"> | null;
  tickets: Doc<"tickets">[];
  ticketTypes: Doc<"ticketTypes">[];
  children: Doc<"events">[];
};
