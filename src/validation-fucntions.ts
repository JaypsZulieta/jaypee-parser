import { z as Zod } from "zod";

export function isNotAString(data: unknown): boolean {
  return !Zod.string().safeParse(data).success;
}
