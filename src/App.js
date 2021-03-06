import React, { Component, Fragment } from "react";
import newsapi from "./apis/newsapi";
import countries from "./apis/countries";
import NavBar from "./components/NavBar";
import News from "./components/News";

export class App extends Component {
	constructor() {
		super();

		this.state = { articles: [], endPoint: "/", params: {}, totalResults: 0, countries: [], selectedCountryValue: "in", loading: false, page: 1, category: "general", searchTerm: "", headingTitle: "" };
	}

	loadArticles = async () => {
		const { data } = await newsapi.get(this.state.endPoint, { params: this.state.params });

		this.setState({ articles: this.state.articles.concat(data.articles), totalResults: data.totalResults, loading: false });
	};

	loadCountries = async () => {
		const { data } = await countries.get("/countries/iso");

		this.setState({ countries: data.data });
	};

	componentDidMount() {
		this.setState({
			loading: true,
			endPoint: "/top-headlines",
			headingTitle: "General",
			params: {
				country: this.state.selectedCountryValue,
				page: this.state.page,
			},
		});
		this.loadCountries();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.params !== this.state.params || prevState.endPoint !== this.state.endPoint) {
			this.loadArticles();
		}
	}

	fetchMoreData = () => {
		this.setState({
			page: this.state.page + 1,
			params: {
				...this.state.params,
				page: this.state.page + 1,
			},
		});
	};

	capitalize = str => {
		const lower = str.toLowerCase();
		return str.charAt(0).toUpperCase() + lower.slice(1);
	};

	onCategoryChange = category => {
		this.setState({
			articles: [],
			page: 1,
			category,
			country: this.state.selectedCountryValue === "international" ? "in" : this.state.selectedCountryValue,
			endPoint: "/top-headlines",
			headingTitle: this.capitalize(category),
			params: {
				country: this.state.selectedCountryValue === "international" ? "in" : this.state.selectedCountryValue,
				page: 1,
				category,
			},
		});
	};

	onCountryChange = e => {
		this.setState({
			articles: [],
			selectedCountryValue: e.target.value,
			endPoint: "/top-headlines",
			page: 1,
			params: {
				country: e.target.value,
				page: 1,
				category: this.state.category,
			},
		});
	};

	onSearchTermChange = e => {
		this.setState({ searchTerm: e.target.value });
	};

	onSearchSubmit = e => {
		e.preventDefault();
		this.setState({
			articles: [],
			page: 1,
			category: "general",
			selectedCountryValue: "international",
			headingTitle: "Search",
			params: {
				q: this.state.searchTerm,
				page: 1,
			},
			endPoint: "/everything",
		});
		this.setState({ searchTerm: "" });
	};

	render() {
		return (
			<Fragment>
				<NavBar onCategoryChange={this.onCategoryChange} searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange} onSearchSubmit={this.onSearchSubmit} />
				<News articles={this.state.articles} loading={this.state.loading} fetchMoreData={this.fetchMoreData} page={this.state.page} totalResults={this.state.totalResults} countries={this.state.countries} selectedCountryValue={this.state.selectedCountryValue} onCountryChange={this.onCountryChange} headingTitle={this.state.headingTitle} />
			</Fragment>
		);
	}
}

export default App;
