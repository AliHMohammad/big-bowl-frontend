import ActivityCarousel from "@/components/homepage/ActivityCarousel";
import VideoPlayer from "@/components/homepage/VideoPlayer"

export default function HomePage() {
	return (
		<>
			<VideoPlayer />
			<div className=" flex justify-center">
				<ActivityCarousel />
			</div>
		</>
	);
}
