import { ReactNode } from "react";
import Header from "@/components/layouts/Header.tsx";
import { motion } from "framer-motion";

type Props = {
	children: ReactNode;
};

export default function PageLayout({ children }: Props) {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
		>
			<Header />
			<main>{children}</main>
		</motion.div>
	);
}
