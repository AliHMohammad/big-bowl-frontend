import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ActivityCarouselItem from "./ActivityCarouselItem";
import Autoplay from "embla-carousel-autoplay";

export default function ActivityCarousel() {
	return (
		<section className="w-[52rem]">
			<Carousel
				className="h-[35rem] flex items-center"
				opts={{ loop: true }}
				plugins={[
					Autoplay({
						delay: 3000,
					}),
				]}
			>
				<CarouselContent>
					<CarouselItem className="basis-1/3">
						<ActivityCarouselItem image="xp-bowl-1.jpg" text="Spisning" color="bg-orange-500" />
					</CarouselItem>
					<CarouselItem className="basis-1/3">
						<ActivityCarouselItem image="xp-bowl-2.jpg" text="Klar til strike" color="bg-green-500" />
					</CarouselItem>
					<CarouselItem className="basis-1/3">
						<ActivityCarouselItem image="xp-bowl-3.jpg" text="Så der kamp!" color="bg-yellow-500" />
					</CarouselItem>
					<CarouselItem className="basis-1/3">
						<ActivityCarouselItem image="xp-bowl-4.jpg" text="Familietid" color="bg-blue-500" />
					</CarouselItem>
					<CarouselItem className="basis-1/3">
						<ActivityCarouselItem image="xp-bowl-5.jpg" text="Hygge og sjov" color="bg-red-500" />
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	);
}
