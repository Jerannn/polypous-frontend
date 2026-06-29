import { z } from "zod";

import type { profileSchema } from "./schema";

export type Profile = z.infer<typeof profileSchema>;
