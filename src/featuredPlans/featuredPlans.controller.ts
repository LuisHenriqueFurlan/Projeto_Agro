import { FastifyRequest, FastifyReply } from "fastify";
import { createFeaturedPlan } from "./featuredPlans.service";

interface CreatePlanBody {
  listing_id: string;
  user_id: string;
  days: number;
  paid_amount: number;
}

export const createFeaturedPlanController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { listing_id, user_id, days, paid_amount } =
    request.body as CreatePlanBody;

  try {
    const plan = await createFeaturedPlan({
      listing_id,
      user_id,
      days,
      paid_amount,
    });

    return reply.status(201).send({
      success: true,
      message: "Plano criado com sucesso",
      data: plan,
    });
  } catch (error: any) {
    if (error.message === "Anúncio não encontrado") {
      return reply.status(404).send({
        success: false,
        message: "Anúncio não encontrado",
      });
    }

    return reply.status(400).send({
      success: false,
      message: error.message || "Erro ao criar plano",
    });
  }
};
