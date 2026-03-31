import { useRouter } from "next/navigation";

import { ConfigProvider, Typography } from "antd";
import Image from "next/image";

import "./index.scss";

const { Paragraph, Title } = Typography;
export default function ProductCard(props: {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
}) {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/productDetail?id=${props.id}`);
	};

	return (
		<div className="card" onClick={handleClick}>
			<div className="card__shine"></div>
			<div className="card__glow"></div>
			<div className="card__content">
				<div className="card__badge">NEW</div>
				<div className="card__image">
					<Image src={props.image} alt={props.name} width={175} height={100} loading="eager" />
				</div>
				<div className="card__text">
					<Title
						className="card__title"
						level={5}
						ellipsis={{
							rows: 1,
						}}
					>
						{props.name}
					</Title>
					<ConfigProvider
						theme={{
							token: {
								fontSize: 10,
							},
						}}
					>
						<Paragraph
							className="card__description"
							ellipsis={{
								rows: 2,
							}}
						>
							{props.description}
						</Paragraph>
					</ConfigProvider>
				</div>
				<div className="card__footer">
					<div className="card__price">${props.price}</div>
					<div className="card__button">
						<svg height="16" width="16" viewBox="0 0 24 24">
							<path
								strokeWidth="2"
								stroke="currentColor"
								d="M4 12H20M12 4V20"
								fill="currentColor"
							></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
