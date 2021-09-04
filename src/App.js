import React, { Component, Fragment } from "react";
import newsapi from "./apis/newsapi";
import NavBar from "./components/NavBar";
import News from "./components/News";

export class App extends Component {
	constructor() {
		super();

		this.state = { articles: [], totalResults: 0, loading: false, page: 1, category: "general" };
	}

	loadArticles = async params => {
		const { data } = await newsapi.get("/top-headlines", { params });

		this.setState({ articles: this.state.articles.concat(data.articles), totalResults: data.totalResults, loading: false });
	};

	componentDidMount() {
		this.setState({ loading: true });
		const params = {
			country: "in",
			page: this.state.page,
			category: this.state.category,
		};
		this.loadArticles(params);
	}

	fetchMoreData = () => {
		this.setState({ page: this.state.page + 1 });
		const params = {
			country: "in",
			page: this.state.page,
			category: this.state.category,
		};
		this.loadArticles(params);
	};

	onCategoryChange = category => {
		this.setState({ articles: [], page: 1, category });
		const params = {
			country: "in",
			page: 1,
			category,
		};
		this.loadArticles(params);
	};

	render() {
		return (
			<Fragment>
				<NavBar title="GlobeNews" onCategoryChange={this.onCategoryChange} />
				<News articles={this.state.articles} loading={this.state.loading} fetchMoreData={this.fetchMoreData} page={this.state.page} totalResults={this.state.totalResults} category={this.state.category} />
			</Fragment>
		);
	}
}

export default App;
