<template>
    <v-navigation-drawer
            app
            :disable-resize-watcher="true">
        <div style="margin: 20px">
            <v-row>
                <!-- eslint-disable-next-line -->
                <v-text-field placeholder="Search" label="Search" @keyup.enter="request" v-model="search">

                </v-text-field>
            </v-row>
            <search-select-filter label="rarities" :items="rarities"></search-select-filter>
            <search-select-filter label="item types" :items="itemTypes"></search-select-filter>
            <div ref="min-max-filters" v-for="filter in filterMinMaxMetaData" :key="filter.apiFilter">
                <search-min-max-filter :label="filter.label" :api-filter="filter.apiFilter" :ref="`filter-min-max-${filter.apiFilter}`"></search-min-max-filter>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script>
	import SearchMinMaxFilter from "@/components/SearchMinMaxFilter";
	import SearchSelectFilter from "@/components/SearchSelectFilter";
	export default {
		name: "SearchBar",
		components: {SearchSelectFilter, SearchMinMaxFilter},
		data() {
			return {
				search: null,
				rarities: [
					"Junk",
					"Basic",
					"Fine",
					"Masterwork",
					"Rare",
					"Exotic",
					"Ascended",
					"Legendary"
				],
				itemTypes: [
					"Armor",
					"Weapon",
					"Trinket",
					"Back",
					"Crafting Material",
					"Upgrade Component",
					"Consumable",
					"Bag",
					"Container",
					"Gathering",
					"Gizmo",
					"MiniPet",
					"Tool",
					"Trait",
					"Trophy"
				],
                filterMinMaxMetaData: [
                    { label: 'level', apiFilter: 'level'},
                    { label: 'ROI', apiFilter: 'roi'},
					{ label: 'Profit', apiFilter: 'profit'},
					{ label: 'Buy', apiFilter: 'buy_price'},
					{ label: 'Sell', apiFilter: 'sell_price'},
					{ label: 'Bought', apiFilter: '1d_buy_sold'},
					{ label: 'Sold', apiFilter: '1d_sell_sold'},
					{ label: 'Demmand', apiFilter: 'buy_quantity'},
					{ label: 'Supply', apiFilter: 'sell_quantity'},
					{ label: 'Bids', apiFilter: 'buy_listings'},
					{ label: 'Offers', apiFilter: 'sell_listings'}
                ]
            }
        },
        computed: {
			filters: function () {
				const refKeys = Object.keys(this.$refs);
				const minMaxFilters = refKeys.filter(key => key.includes("filter-min-max"));
				const selectFilters = refKeys.filter(key => key.includes("filter-select"));
				const filters = {};
				for(let i = 0; i < minMaxFilters.length; i++) {
					const key = minMaxFilters[i];
					filters[this.$refs[key].apiFilter] = {
						min: parseFloat(this.$refs[key].min),
                        max: parseFloat(this.$refs[key].max)
                    }
                }
				for(let i = 0; i < selectFilters.length; i++) {
					const key = selectFilters[i];
					filters[this.$refs[key].apiFilter] = {
						items: this.$refs[key].items
					}
				}
				return filters;
			}
        },
        methods: {
			request() {
				console.log("search: " + this.search + " " + this.filters)
            }
        }
	}
</script>

<style scoped>

</style>
