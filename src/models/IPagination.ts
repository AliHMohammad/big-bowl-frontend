export interface IPagination<T> {
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
	size: number;
	content: T[];
	number: number;
	sort: Sort[];
	numberOfElements: number;
	pageable: Pageable;
	empty: boolean;
}

export interface Pageable {
	offset: number;
	sort: Sort[];
	pageNumber: number;
	pageSize: number;
	unpaged: boolean;
	paged: boolean;
}

export interface Sort {
	direction: string;
	nullHandling: string;
	ascending: boolean;
	property: string;
	ignoreCase: boolean;
}