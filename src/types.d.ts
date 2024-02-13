import { z } from "zod";
import { UserSchema } from "./users/app/schemas";
import { ProcedureSchema } from "./procedures/app/schemas";

export type User = z.infer<typeof UserSchema>;
export type Procedure = z.infer<typeof ProcedureSchema>;