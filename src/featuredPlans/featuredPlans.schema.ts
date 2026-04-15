import { z } from "zod";

export const createFeaturedPlanSchema = z.object({
  listing_id: z.string().uuid(),
  user_id: z.string().uuid(),
  days: z.number().min(1),
  paid_amount: z.number().positive(),
});
