import React, { Component } from "react";
import PropTypes from "prop-types";

export class NavBar extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	};

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						{this.props.title}
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" href="/">
									Home
								</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Category
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("general")}>
											General
										</button>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("entertainment")}>
											Entertainment
										</button>
									</li>
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("technology")}>
											Technology
										</button>
									</li>
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("science")}>
											Science
										</button>
									</li>
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("sports")}>
											Sports
										</button>
									</li>
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("business")}>
											Business
										</button>
									</li>
									<li>
										<button className="dropdown-item" onClick={() => this.props.onCategoryChange("health")}>
											Health
										</button>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default NavBar;
