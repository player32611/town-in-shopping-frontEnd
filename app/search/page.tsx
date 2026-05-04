// app/search/page.tsx
import { Suspense } from "react";
import SearchContent from "./SearchContent";

import { Skeleton } from "antd";

export default function SearchPage() {
	return (
		<Suspense fallback={<Skeleton active />}>
			<SearchContent />
		</Suspense>
	);
}
