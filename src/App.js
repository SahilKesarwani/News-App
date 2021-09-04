import React, { Component, Fragment } from "react";
import newsapi from "./apis/newsapi";
import NavBar from "./components/NavBar";
import News from "./components/News";

export class App extends Component {
	constructor() {
		super();

		this.state = { articles: [], totalPages: 1, loading: false, page: 1, category: "general" };
	}

	loadArticles = async params => {
		this.setState({ loading: true });
		const { data } = await newsapi.get("/top-headlines", { params });

		this.setState({ articles: data.articles, totalPages: Math.ceil(data.totalResults / 18), loading: false });
	};

	componentDidMount() {
		const params = {
			country: "in",
			pageSize: 18,
			page: this.state.page,
			category: this.state.category,
		};
		this.loadArticles(params);
	}

	onNextClick = () => {
		if (this.state.page + 1 <= this.state.totalPages) {
			this.setState({ articles: [], page: this.state.page + 1 });
			const params = {
				country: "in",
				pageSize: 18,
				page: this.state.page + 1,
				category: this.state.category,
			};
			this.loadArticles(params);
		}
	};

	onPrevClick = () => {
		if (this.state.page > 1) {
			this.setState({ articles: [], page: this.state.page - 1 });
			const params = {
				country: "in",
				pageSize: 18,
				page: this.state.page - 1,
				category: this.state.category,
			};
			this.loadArticles(params);
		}
	};

	onCategoryChange = category => {
		this.setState({ articles: [], category });
		const params = {
			country: "in",
			pageSize: 18,
			page: this.state.page,
			category,
		};
		this.loadArticles(params);
	};

	render() {
		return (
			<Fragment>
				<NavBar title="GlobeNews" onCategoryChange={this.onCategoryChange} />
				<News articles={this.state.articles} loading={this.state.loading} onNextClick={this.onNextClick} onPrevClick={this.onPrevClick} page={this.state.page} totalPages={this.state.totalPages} category={this.state.category} />
			</Fragment>
		);
	}
}

export default App;
