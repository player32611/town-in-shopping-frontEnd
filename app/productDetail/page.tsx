import { Suspense } from "react";
import ProductDetailContent from "./ProductDetailContent";

export default function ProductDetailPage() {
	return (
		<Suspense fallback={<div>加载中...</div>}>
			<ProductDetailContent />
		</Suspense>
	);
}
