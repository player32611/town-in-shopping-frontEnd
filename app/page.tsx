import React from "react";

import { Carousel, Image, Space } from "antd";
import Wallet from "@/components/commen/Wallet";

const App: React.FC = () => {
	return (
		<Space orientation="vertical" size="large" style={{ display: "flex", height: "70vh" }}>
			<Carousel
				autoplay
				arrows
				style={{
					height: 160,
					width: 500,
				}}
			>
				<Image
					src="https://img.shetu66.com/2023/10/27/1698418427416160.png"
					alt="1"
					width={500}
					height={160}
				/>
				<Image
					src="https://img.shetu66.com/2023/10/27/1698418976513781.png"
					alt="2"
					width={500}
					height={160}
				/>
				<Image
					src="https://img.shetu66.com/2023/10/27/1698417424229236.png"
					alt="3"
					width={500}
					height={160}
				/>
				<Image
					src="https://img.shetu66.com/2023/10/27/1698418822738795.png"
					alt="3"
					width={500}
					height={160}
				/>
			</Carousel>
			<Wallet />
		</Space>
	);
};

export default App;
