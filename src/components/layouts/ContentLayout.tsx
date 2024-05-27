import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type Props = {
	children: ReactNode;
};

export default function ContentLayout({ children }: Props) {
	const location = useLocation();


	return (
		<motion.div key={location.pathname}
					className="m-8 mx-auto max-w-screen-lg"
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
