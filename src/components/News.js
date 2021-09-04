import React, { Component, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Loader from "./Loader";

export class News extends Component {
	constructor(props) {
		super(props);

		document.title = `${this.capitalize(this.props.category)} - GlobeNews`;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.category !== this.props.category) {
			document.title = `${this.capitalize(this.props.category)} - GlobeNews`;
		}
	}

	renderNewsItems() {
		const { articles } = this.props;
		return articles.map(article => {
			return <NewsItem key={article.url} article={article} />;
		});
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
					<InfiniteScroll dataLength={this.props.articles.length} next={this.props.fetchMoreData} hasMore={this.props.articles.length < this.props.totalResults} loader={<Loader />}>
						<div className="container">
							<div className="row row-cols-1 row-cols-md-3 g-4">{this.renderNewsItems()}</div>
						</div>
					</InfiniteScroll>
				</div>
			</Fragment>
		);
	}
}

export default News;
