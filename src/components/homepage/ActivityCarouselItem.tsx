interface Props {
	image: string;
	text: string;
	color: string;
}

export default function ActivityCarouselItem({ image, text, color }: Props) {
	return (
		<article className={`h-80 w-64 rounded-lg ${color} overflow-hidden shadow-xl shadow-slate-600`}>
			<img className="h-72 w-64 object-cover" src={image} alt="" />
			<p className="text-center text-white font-semibold border-t-2 border-gray-950">{text}</p>
		</article>
	);
}
