import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Loader from "./Loader";

export class News extends Component {
	constructor(props) {
		super(props);

		document.title = `${this.props.headingTitle} - GlobeNews`;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.headingTitle !== this.props.headingTitle) {
			document.title = `${this.props.headingTitle} - GlobeNews`;
		}
	}

	renderNewsItems() {
		const { articles } = this.props;
		return articles.map(article => {
			return <NewsItem key={article.url} article={article} />;
		});
	}

	renderCountryoptions() {
		const { countries } = this.props;
		if (countries) {
			return countries.map(country => {
				const { name, Iso2, Iso3 } = country;
				if (name && Iso2 && Iso3) {
					return (
						<option key={Iso3.toLowerCase()} value={Iso2.toLowerCase()}>
							{name}
						</option>
					);
				}
				return null;
			});
		}
	}

	render() {
		return (
			<div className="container my-4">
				<h1 className="my-4 text-center">GlobeNews - {this.props.headingTitle}</h1>
				<select className="form-select my-4 w-50 mx-auto" value={this.props.selectedCountryValue} aria-label="Select countries" onChange={e => this.props.onCountryChange(e)}>
					<option value="international" disabled>
						International
					</option>
					{this.renderCountryoptions()}
				</select>
				{this.props.loading ? <Loader /> : null}
				<InfiniteScroll dataLength={this.props.articles.length} next={this.props.fetchMoreData} hasMore={this.props.articles.length < this.props.totalResults} loader={<Loader />}>
					<div className="container">
						<div className="row row-cols-1 row-cols-md-3 g-4">{this.renderNewsItems()}</div>
					</div>
				</InfiniteScroll>
			</div>
		);
	}
}

export default News;
