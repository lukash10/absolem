module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{vue,jpg,webp,png,jfif,psd,jpeg,js,scss}'
	],
	swDest: './public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};