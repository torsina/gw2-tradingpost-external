import Vue from 'vue';
import VueRouter from 'vue-router';
import BuyView from "@/components/BuyView";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ path: '/buy', component: BuyView}
	]
});
