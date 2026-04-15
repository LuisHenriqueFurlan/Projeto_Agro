import { prisma } from "../../prisma/prismaClient";

export const createFeaturedPlan = async (data: {
  listing_id: string;
  user_id: string;
  days: number;
  paid_amount: number;
}) => {
  const listing = await prisma.listing.findUnique({
    where: { id: data.listing_id }
  })

  if (!listing) {
    throw new Error("Anúncio não encontrado")
  }

  const starts_at = new Date();

  const ends_at = new Date();
  ends_at.setDate(ends_at.getDate() + data.days);

  const plan = await prisma.featured_plans.create({
    data: {
      listing_id: data.listing_id,
      user_id: data.user_id,
      starts_at,
      ends_at,
      days: data.days,
      amount: data.paid_amount,
    },
  });

  await prisma.listing.update({
    where: { id: data.listing_id },
    data: { featured: true },
  });

  return plan;
};
