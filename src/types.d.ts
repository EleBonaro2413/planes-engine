import { z } from "zod";
import { UserSchema } from "~/schemas";
import { ProcedureSchema } from "~/schemas";
import { ProjectSchema } from "~/schemas";

export type User = z.infer<typeof UserSchema>;
export type Procedure = z.infer<typeof ProcedureSchema>;
export type Project = z.infer<typeof ProjectSchema>;