// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['~/assets/css/style.scss'],
	modules: [
		['@nuxtjs/google-fonts', {
			families: {
				Roboto: true,
				Inter: [400, 700],
				'Josefin+Sans': true,
				Lato: [100, 300],
				Raleway: {
					wght: [100, 400],
					ital: [100]
				}
			}
		}], '@pinia/nuxt'
	],
	//ssr: false
})