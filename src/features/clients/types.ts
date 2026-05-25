import type { z } from "zod";

import type { createClientSchema } from "./schema";

export type ClientPayload = z.infer<typeof createClientSchema>;

export type Client = ClientPayload & {
  readonly id: string;
  readonly userId: string;
  createdAt: string;
  updatedAt: string;
};
