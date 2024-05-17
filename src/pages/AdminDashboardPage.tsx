
import { SlCalender } from "react-icons/sl";
import { GiBowlingStrike } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

import DashboardButton from "@/components/core/DashboardButton";

export default function AdminDashboardPage() {
	return (
		<section className="flex flex-col gap-10 justify-center items-center">
			<h2 className="text-white text-3xl sm:text-5xl font-bold text-center text-pretty">Administrationspanel</h2>
			<div className="flex gap-10 sm:gap-16 justify-center flex-col sm:flex-row">
				<DashboardButton text="Produkter" linkTo="products">
					<FaShoppingCart className="text-white group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Kalender" linkTo="calender">
					<SlCalender className="text-white group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>

				<DashboardButton text="Aktiviteter" linkTo="activities">
					<GiBowlingStrike className="text-white group-hover:text-orange-300 group-hover:scale-105 transition-all" size={130} />
				</DashboardButton>
			</div>
		</section>
	);
}
