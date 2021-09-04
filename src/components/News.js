import React, { Component, Fragment } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";

export class News extends Component {
	constructor(props) {
		super(props);

		document.title = `(${this.props.page})${this.capitalize(this.props.category)} - GlobeNews`;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.category !== this.props.category || prevProps.page !== this.props.page) {
			document.title = `(${this.props.page})${this.capitalize(this.props.category)} - GlobeNews`;
		}
	}

	renderNewsItems() {
		const { articles } = this.props;
		return articles.map(article => {
			return <NewsItem key={article.url} article={article} />;
		});
	}

	renderButtons() {
		if (!this.props.loading) {
			return (
				<div className="d-flex justify-content-between my-4">
					<button disabled={this.props.page === 1} className="btn btn-primary" type="button" onClick={() => this.props.onPrevClick()}>
						&larr; Previous
					</button>
					<button disabled={this.props.page === this.props.totalPages} className="btn btn-primary" type="button" onClick={() => this.props.onNextClick()}>
						Next &rarr;
					</button>
				</div>
			);
		}
	}

	capitalize = str => {
		const lower = str.toLowerCase();
		return str.charAt(0).toUpperCase() + lower.slice(1);
	};

	render() {
		return (
			<Fragment>
				<div className="container my-4">
					<h1 className="my-4 text-center">GlobeNews - Top Headlines - {this.capitalize(this.props.category)}</h1>
					{this.props.loading ? <Loader /> : null}
					<div className="row row-cols-1 row-cols-md-3 g-4">{this.renderNewsItems()}</div>
					{this.renderButtons()}
				</div>
			</Fragment>
		);
	}
}

export default News;
