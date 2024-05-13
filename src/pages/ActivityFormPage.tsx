import ActivityForm from "@/components/forms/ActivityForm";
import { IActivity } from "@/models/IActivity";
import { useLocation } from "react-router-dom";



export default function ActivityFormPage() {
    const activityToEdit = useLocation().state as IActivity;
    console.log(activityToEdit);


    return (
		<>
			<div>
				<h2>Rediger aktivitet</h2>
				<h3>{activityToEdit.name} - {activityToEdit.type}</h3>
				<ActivityForm activity={activityToEdit} />
			</div>
		</>
	);
}