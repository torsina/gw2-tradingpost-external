<template>
    <v-data-table
            :headers="headers"
            :items="data"
            class="elevation-1"
            ref="table"
            @update:sort-desc="emitEvent"
            @update:sort="emitEvent"
            @update:sort-by="emitEvent"
    ></v-data-table>
</template>

<script>
	export default {
		name: "ItemList",
		props: {
			data: Array
		},
		computed: {
			headers() {
				if (this.data.length > 0) {
					const data = this.data[0];
					const keys = Object.keys(data);

					const headers = [];
					for (let i = 0; i < keys.length; i++) {
						headers.push({text: keys[i], value: keys[i]});
					}
					return headers;
				} else {
					return [];
				}
			}
		},
		methods: {
			filteredContent() {
				return new Promise(((resolve) => {
					const saved = this.$refs.table.itemsPerPage;
					this.$refs.table.itemsPerPage = -1;
					this.$nextTick(()=> {
						this.$refs.table.itemsPerPage = saved;
						resolve(this.$refs.table.internalCurrentItems);
					});
				}));
			},
			emitEvent() {
				this.$emit("update:sort-by");
			}
		}
	}
</script>

<style scoped>

</style>
