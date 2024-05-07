import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ProductsPage() {

	return (
		<>
			<div>ProductsPage</div>
			<Link to={"form"}>
				<button>Klik mig</button>
			</Link>
		</>
	);
}
