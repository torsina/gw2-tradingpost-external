<template>
    <div class="filter-box">
        <v-row>
            <span>
                {{ label }}
            </span>
        </v-row>
        <v-row>
            <v-col class="col-adjust">
                <v-tooltip bottom nudge-bottom="-20">
                    <template v-slot:activator="{ on }">
                        <v-text-field label="min" placeholder="0" color="primary" v-on="on" v-model="min"></v-text-field>
                    </template>
                    <div style="">
                        Tooltip
                    </div>
                </v-tooltip>
            </v-col>
            <v-col class="col-adjust">
                <v-tooltip bottom nudge-bottom="-20">
                    <template v-slot:activator="{ on }">
                        <v-text-field label="max" placeholder="0" color="primary" v-on="on" v-model="max"></v-text-field>
                    </template>
                    <div style="">
                        Tooltip
                    </div>
                </v-tooltip>
            </v-col>
        </v-row>
    </div>
</template>

<script>
	export default {
		name: "SearchMinMaxFilter",
        props: {
			label: String,
            apiFilter: String
        },
        data() {
			return {
				min: null,
                max: null
            }
        }
	}
</script>

<style scoped>
    .filter-box {
        margin-left: -10px;
        border: 1px solid white;
        border-radius: 5px;
        padding-left: 15px;
        padding-right: 15px;
        width: 110%;
    }

    .col-adjust {
        padding-bottom: 5px;
        max-height: 75px
    }
</style>
