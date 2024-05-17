import ActivityCarousel from "@/components/homepage/ActivityCarousel";
import VideoPlayer from "@/components/homepage/VideoPlayer";
import Footer from "@/components/layouts/Footer";

export default function HomePage() {
	return (
		<>
			<VideoPlayer />
			<div className=" flex justify-center">
				<ActivityCarousel />
			</div>
			<Footer />
		</>
	);
}
