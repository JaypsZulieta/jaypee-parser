import { z as Zod } from "zod";

export function isNotAString(data: unknown): boolean {
  return !Zod.string().safeParse(data).success;
}

export function isNotANumber(data: unknown): boolean {
  if (!isNotAString(data)) return true;
  return !Zod.number().safeParse(data).success;
}
