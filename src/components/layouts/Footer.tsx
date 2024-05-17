import React from "react";

export default function Footer() {
	return (
		<div className="bg-slate-900 h-20 text-white flex justify-center items-center">
			<p>
				Lavet af{" "}
				<a className="font-bold hover:text-orange-300 transition-all" href="https://github.com/AliHMohammad">
					Ali
				</a>{" "}
				og{" "}
				<a className="font-bold hover:text-orange-300 transition-all" href="https://github.com/Forkeh">
					{" "}
					Brian{" "}
				</a>
			</p>
		</div>
	);
}
