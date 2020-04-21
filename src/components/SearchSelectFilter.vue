<template>
    <v-select
            :items="items"
            :label="label"
            v-model="item"
            solo
            light
            multiple
            dense
            :menu-props="{light: true}"
    ></v-select>
</template>

<script>
	export default {
		name: "SearchSelectFilter",
		props: {
			label: String,
			items: Array
		},
		data() {
			return {
				item: null
			}
		}
	}
</script>

<style scoped>

</style>
