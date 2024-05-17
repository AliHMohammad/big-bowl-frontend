import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useEffect, useState } from "react";
import { createProduct, getAllProductCategories, updateProduct } from "@/services/productApi";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/models/IProduct.ts";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	image: z.string().min(2),
	price: z.coerce.number().int().min(1),
	stock: z.coerce.number().int().min(1),
	category: z.string().min(2).max(50),
});

export type productRequest = {
	id?: number;
	name: string;
	image: string;
	price: number;
	stock: number;
	category: string;
};

interface Props {
	product: IProduct | null;
}

export default function ProductForm({ product }: Props) {
	const [categories, setCategories] = useState<string[] | null>(null);
	const navigate = useNavigate();


	useEffect(() => {
		getAllProductCategories()
			.then((res) => setCategories(res.data))
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde kategorierne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product?.name || "",
			image: product?.image || "",
			price: product?.price || 0,
			stock: product?.stock || 0,
			category: product?.category || "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);

		if (product) {
			// PUT


			updateProduct({
				...values,
				id: product.id,
			})

				.then(() => {
					toast({
						title: "Produkt opdateret!",
						description: `Vi har opdateret ${values.name.toLowerCase()} til prisen ${values.price}kr. i systemet.`,
					});
					navigate("/administration/products");
					return;
				})
				.catch(() => {
					toast({
						title: "Åh nej! Noget gik galt!",
						description: `Kunne ikke opdatere produktet i systemet. Prøv igen på et senere tidspunkt.`,
						variant: "destructive",
					});
				});

       
		} else {
			// POST
			createProduct(values as productRequest)
				.then(() => {
					toast({
						title: "Produkt oprettet!",
						description: `Vi har oprettet ${values.name.toLowerCase()} til prisen ${values.price}kr. i systemet.`,
					});
					navigate("/administration/products");
					return;
				})
				.catch(() => {
					toast({
						title: "Åh nej! Noget gik galt!",
						description: `Måske eksisterer produktet allerede i systemet. Prøv igen på et senere tidspunkt.`,
						variant: "destructive",
					});
				});
		}

	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-60">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Navn</FormLabel>

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
							<FormLabel className="text-white">Pris</FormLabel>

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

							<FormLabel className="text-white">Billede</FormLabel>

							<FormControl>
								<Input placeholder="(.jpg, .jpeg, .png)" {...field} />
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

							<FormLabel className="text-white">Antal</FormLabel>

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

							<FormLabel className="text-white">Kategori</FormLabel>

							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger className="">
										<SelectValue placeholder="Vælg kategori" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{categories &&
												categories.map((c) => (
													<SelectItem {...field} key={c} value={c}>
														{c}
													</SelectItem>
												))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>


				<div className="flex justify-center">
					<Button type="submit">{product ? "Opdater" : "Opret"}</Button>
				</div>

			</form>
		</Form>
	);
}
