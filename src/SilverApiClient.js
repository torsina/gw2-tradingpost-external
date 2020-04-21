import axios from "axios";

export default class SilverApiClient {
	constructor() {
		this.baseUrl = "https://api.datawars2.ie/gw2/v1/items/json";
		this.filters = {};
		this.request = {};
		this.fields = ["id", "name", "buy_price", "sell_price", "profit", "roi", "1d_sell_sold", "1d_buy_sold", "rarity"];
	}

	setFilters(filters) {
		this.filters = filters;
	}

	async exec() {
		this.buildRequests();
		await this.executeRequest();
		this.postRequestFilter();
		return this.request.data;
	}

	/**
	 * for min/max filters if we have both min and max assigned, use max in the query then process the response to filter out the min
	 * for multi-choice select filters, we filter the response
	 * */
	buildRequests() {
		this.request = {preRequestFilters: {}, postRequestFilters: {}, urlFilters: [], url: '', data: null};
		console.log(this.filters);
		const filterKeys = Object.keys(this.filters);
		for (let i = 0; i < filterKeys.length; i++) {
			const filter = this.filters[filterKeys[i]];
			//console.log(filter);
			if (filter.items && Array.isArray(filter.items)) {
				this.request.postRequestFilters[filterKeys[i]] = filter;
				continue;
			}
			if (filter.min && filter.max) {
				this.request.preRequestFilters[filterKeys[i]] = {max: filter.max};
				this.request.postRequestFilters[filterKeys[i]] = {min: filter.min};
			} else {
				if (filter.min) {
					this.request.preRequestFilters[filterKeys[i]] = {min: filter.min};
				} else if (filter.max) {
					this.request.preRequestFilters[filterKeys[i]] = {max: filter.max};
				}
			}
		}

		const preRequestFilterKeys = Object.keys(this.request.preRequestFilters);
		for (let i = 0; i < preRequestFilterKeys.length; i++) {
			const filter = this.request.preRequestFilters[preRequestFilterKeys[i]];
			if (filter.min) {
				// buy_price:lte:150000
				this.request.urlFilters.push(`${preRequestFilterKeys[i]}:gte:${filter.min}`);
			}
			if (filter.max) {
				this.request.urlFilters.push(`${preRequestFilterKeys[i]}:lte:${filter.max}`);
			}
		}

		let firstParam = true;
		if(this.request.urlFilters.length > 0) {
			if(firstParam) {
				this.request.url += "?";
				firstParam = false;
			} else {
				this.request.url += "&";
			}
			this.request.url += "filter=" + this.request.urlFilters.join(",");
		}

		let requiredFields = Object.keys(this.request.postRequestFilters);
		requiredFields = requiredFields.concat(this.fields);
		requiredFields = requiredFields.filter((value, index, array) => {
			return array.indexOf(value) === index;
		});
		if(firstParam) {
			this.request.url += "?";
			firstParam = false;
		} else {
			this.request.url += "&";
		}
		this.request.url += "fields=" + requiredFields.join(",");
	}

	async executeRequest() {
		const response = await axios.get(this.baseUrl + this.request.url);
		if (response.status === 200) {
			this.request.data = response.data;
		}
	}

	postRequestFilter() {
		const keys = Object.keys(this.request.postRequestFilters);
		for (let i = 0; i < keys.length; i++) {
			const filter = this.request.postRequestFilters[keys[i]];
			if (filter.min) {
				this.request.data = this.request.data.filter(item => {
					return item[keys[i]] > filter.min;
				});
			}
			if (filter.items) {
				this.request.data = this.request.data.filter(item => {
					return filter.items.includes(item[keys[i]]);
				});
			}
		}
	}
}
