"use client";

import { useRouter } from "next/navigation";

import { Button, Result } from "antd";

export default function Error() {
	const router = useRouter();

	return (
		<Result
			status="404"
			title="404"
			subTitle="抱歉，您访问的页面不存在"
			extra={
				<Button type="primary" onClick={() => router.push("/")}>
					返回首页
				</Button>
			}
		/>
	);
}
