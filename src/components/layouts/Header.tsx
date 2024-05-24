import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

export default function Header() {
	return (
		<div className="flex flex-wrap flex-col w-full justify-center items-center sm:flex-row sm:justify-between bg-slate-900 px-10 py-5">
			<NavLink to="/">
				<motion.div
					className=" flex items-center gap-2 group"
					initial={{
						opacity: 0,
						x: -50,
					}}
					animate={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						duration: 1,
						delay: 1,
					}}
				>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.8,
						}}
						animate={{
							opacity: 1,
							scale: 1,
						}}
						transition={{
							duration: 0.5,
							delay: 2,
						}}
					>
						<img src="/logo.png" className="h-24 group-hover:scale-105 group-active:scale-100 transition-all ease-in" />
					</motion.div>
					<h1 className={"text-center font-bold text-3xl sm:text-5xl text-white"}>
						<span className="text-orange-300">XP</span> Bowl
					</h1>
				</motion.div>
			</NavLink>
			<motion.div
				initial={{
					opacity: 0,
					x: 50,
				}}
				animate={{
					opacity: 1,
					x: 0,
				}}
				transition={{
					duration: 1,
					delay: 1,
				}}
			>
				<NavBar />
			</motion.div>
		</div>
	);
}
