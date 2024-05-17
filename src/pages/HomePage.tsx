import ActivityCarousel from "@/components/homepage/ActivityCarousel";
import VideoPlayer from "@/components/homepage/VideoPlayer";
import { SignedOut } from "@clerk/clerk-react";
import Footer from "@/components/layouts/Footer";
import { SignInButton } from "@clerk/clerk-react";

export default function HomePage() {
	return (
		<>
			<VideoPlayer />
			<div className="flex justify-center my-10">
				<article className=" bg-orange-300 w-[30rem] rounded-2xl p-8 space-y-5 text-center">
					<h3 className=" text-4xl text-white font-semibold">Velkommen til!</h3>
					<p className="text-xl">
						Kom og skab de fedeste oplevelser med venner og familie hos <span className="font-semibold">XP Bowl</span>. Med en lang række
						aktiviteter, herunder bowling og Air hockey, er XP Bowl det perfekte sted for hygge og sjov.
					</p>

					<SignedOut>
						<SignInButton mode={"modal"}>
							<p className="hover:scale-105 transition-all cursor-pointer font-bold text-2xl">Opret dig nu!</p>
						</SignInButton>
					</SignedOut>
				</article>
			</div>
			<div className="flex justify-center">
				<ActivityCarousel />
			</div>
			<Footer />
		</>
	);
}
