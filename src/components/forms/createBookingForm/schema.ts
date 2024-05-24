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
	name1: z.string().min(0).max(50),
	name2: z.string().min(0).max(50),
	name3: z.string().min(0).max(50),
	name4: z.string().min(0).max(50),
});