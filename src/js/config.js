require.config({
	baseUrl: "/", // 基准路径
	paths: { // 配置模块短名称
		"jquery": "libs/jquery/jquery-1.12.4.min",
		"loadHF": "js/headerandfooter",
		"template": "libs/art-template/template-web",
		"cookie": "libs/jquery-plugins/jquery.cookie",
		"fly": "libs/jquery-plugins/jquery.fly.min",
		"url":"js/url"
	},
	shim: {
		"fly": {
			deps: ["jquery"]
		}
	}
});
