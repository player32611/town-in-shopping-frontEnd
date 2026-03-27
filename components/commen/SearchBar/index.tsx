import { useRouter } from "next/navigation";

import { Input } from "antd";

const { Search } = Input;

export default function SearchBar() {
	const router = useRouter();

	const handleSearch = (value: string) => {
		if (value.trim()) {
			router.push(`/search?keyword=${encodeURIComponent(value.trim())}`);
		}
	};

	return (
		<Search placeholder="点击搜索" enterButton style={{ width: "50%" }} onSearch={handleSearch} />
	);
}
