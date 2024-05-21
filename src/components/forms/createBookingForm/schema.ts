import { z } from "zod";

const IProductBookingRequestSchema = z.object({
	id: z.number(),
	quantity: z.number(),
});

export const formSchema = z.object({
	startTime: z.string(),
	activityId: z.number(),
	// end: z.date(),
	// userId: z.string(),
	// participants: z.array(z.string()),
	// products: z.array(IProductBookingRequestSchema),
});