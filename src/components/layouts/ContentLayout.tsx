import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function ContentLayout({ children }: Props) {
	return <div className="m-8">{children}</div>;
}
