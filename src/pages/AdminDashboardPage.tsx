import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboardPage() {
  return (
		<section className="flex gap-2">
			<Link to={"products"}>
				<div className="bg-red-400 p-5">Produkter</div>
			</Link>
			<div className="bg-red-400 p-5">Kalender</div>
			<Link to={"activities"}>
				<div className="bg-red-400 p-5">Aktiviteter</div>
			</Link>
		</section>
  );
}
