import "./index.scss";

export default function Logo() {
	return (
		<button className="brutalist-button">
			<div className="ms-logo">
				<div className="ms-logo-square"></div>
				<div className="ms-logo-square"></div>
				<div className="ms-logo-square"></div>
				<div className="ms-logo-square"></div>
			</div>
			<div className="button-text">
				<span>欢迎来到</span>
				<span>Town In 购</span>
			</div>
		</button>
	);
}
