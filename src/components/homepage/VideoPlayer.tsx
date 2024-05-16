import React from 'react'

export default function VideoPlayer() {
  return (
		<section className="relative flex justify-center h-[600px] overflow-hidden">
			<video className="absolute object-cover brightness-50" src="https://cdn.bowlnfun.dk/wp-content/uploads/branding.mp4" autoPlay muted loop></video>
			<div className=" z-50 relative flex items-center justify-center w-1/3 text-center m-auto">
				<p className="text-white text-6xl marker:text-pretty font-bold">
					<span className="text-orange-300">De sjoveste oplevelser</span> er dem, vi skaber med hinanden
				</p>
			</div>
		</section>
  );
}
