
export function makeOptions(method: string, body?: object, authRequired?: boolean): RequestInit {
	const headers = new Headers();
	headers.append("Content-type", "application/json");
	headers.append("Accept", "application/json");

	if (authRequired) {
		const token = localStorage.getItem("token");
		headers.append("Authorization", `Bearer ${token}`);
	}

	const opts: RequestInit = {
		method: method,
		headers: headers,
	};

	if (body) {
		opts.body = JSON.stringify(body);
	}

	return opts;
}

export async function handleHttpErrors(res: Response) {
	if (!res.ok) {
		const errorResponse = await res.json();
		const msg = errorResponse.message ? errorResponse.message : "No details provided";
		throw new Error(msg);
	}
	return res.json();
}