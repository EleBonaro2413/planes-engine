import { z } from "zod";
import { UserSchema } from "./users/app/schemas";
import { ProcedureSchema } from "./procedures/app/schemas";
import { ProjectSchema } from "./projects/app/schemas";

export type User = z.infer<typeof UserSchema>;
export type Procedure = z.infer<typeof ProcedureSchema>;
export type Project = z.infer<typeof ProjectSchema>;