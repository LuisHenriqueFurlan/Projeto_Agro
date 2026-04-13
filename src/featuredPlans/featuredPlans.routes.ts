import { FastifyInstance } from "fastify";
import { createFeaturedPlanController } from "./featuredPlans.controller";
import { createFeaturedPlanSchema } from "./featuredPlans.schema";

export async function featuredPlansRoutes(app: FastifyInstance) {
  app.post(
    "/featured-plans",
    { schema: { body: createFeaturedPlanSchema } },
    createFeaturedPlanController,
  );
}
