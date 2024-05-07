import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	image: z.string().min(2),
	price: z.number().min(1),
	stock: z.number().min(1),
	category: z.string().min(2).max(50),
});

export default function CreateProductPage() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			image: "",
			price: 0,
			stock: 0,
			category: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Navn</FormLabel>
							<FormControl>
								<Input placeholder="Produkt navn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pris</FormLabel>
							<FormControl>
								<Input placeholder="Pris i kroner (DKK)" type="number" min={0} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Billede</FormLabel>
							<FormControl>
								<Input placeholder="(.jpg, .jpeg, .pn)" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="stock"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Antal</FormLabel>
							<FormControl>
								<Input placeholder="Produkt navn" type="number" min={0} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kategori</FormLabel>
							<FormControl>
								<Input placeholder="Drikkevarer.." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
