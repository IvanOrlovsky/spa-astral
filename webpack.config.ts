const webpack = require("webpack");
const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				REACT_APP_LOGIN: JSON.stringify(process.env.REACT_APP_LOGIN),
				REACT_APP_PASSWORD: JSON.stringify(
					process.env.REACT_APP_PASSWORD
				),
				REACT_APP_LOGIN_API: JSON.stringify(
					process.env.REACT_APP_LOGIN_API
				),
				REACT_APP_ACCESS_TOKEN: JSON.stringify(
					process.env.REACT_APP_ACCESS_TOKEN
				),
				REACT_APP_CARDS_API: JSON.stringify(
					process.env.REACT_APP_CARDS_API
				),
				REACT_APP_GET_USER_API: JSON.stringify(
					process.env.REACT_APP_GET_USER_API
				),
				REACT_APP_SET_USER_API: JSON.stringify(
					process.env.REACT_APP_SET_USER_API
				),
			},
		}),
	],
};
