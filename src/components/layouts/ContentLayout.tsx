import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
	children: ReactNode;
};

export default function ContentLayout({ children }: Props) {
	return (
		<motion.div
			className="m-8"
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
		>
			{children}
		</motion.div>
	);
}
