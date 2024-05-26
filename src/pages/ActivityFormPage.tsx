import ActivityForm from "@/components/forms/ActivityForm";
import { IActivity } from "@/models/IActivity";
import { useLocation } from "react-router-dom";

export default function ActivityFormPage() {
	const activityToEdit = useLocation().state as IActivity;

	return (
		<>
			<h2 className="text-white text-center text-3xl font-bold mb-10">Rediger
				aktivitet: {activityToEdit.name} </h2>
			<section className="flex justify-center">
				<ActivityForm activity={activityToEdit} />
			</section>
		</>
	);
}
