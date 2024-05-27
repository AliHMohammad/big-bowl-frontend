import { motion } from "framer-motion";

export default function VideoPlayer() {
	return (
		<section className="relative flex justify-center h-[400px] sm:h-[600px] overflow-hidden">
			<video
				className="absolute w-full h-full object-cover brightness-50"
				src="https://cdn.bowlnfun.dk/wp-content/uploads/branding.mp4"
				autoPlay
				muted
				loop
			></video>
			<div className=" z-50 relative flex items-center justify-center w-2/3 sm:w-1/3 text-center m-auto">
				<motion.p className="text-white text-3xl sm:text-6xl font-bold">
					<motion.span
						className="text-orange-300"
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 3, duration: 1 }}
					>
						De sjoveste oplevelser
					</motion.span>
					<motion.span initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 4, duration: 1 }}>
						&nbsp;er dem, vi skaber med hinanden
					</motion.span>
				</motion.p>
			</div>
		</section>
	);
}
