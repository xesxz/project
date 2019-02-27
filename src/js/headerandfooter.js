
define(["jquery"],function($){
	function HeaderAndFooter(){
		this.init();

	}
	HeaderAndFooter.prototype = {
		constructor:HeaderAndFooter,
		init(){
			this.loadHeader();
			this.loadFooter();

		},
		loadHeader(){
						$.get("/html/include/header.html",(res)=>{
				$("header").html(res);
				this.addListener();
			})
		},
		loadFooter(){
			
			$("footer").load("/html/include/footer.html");
		},
			// 注册事件监听
		addListener() {
			// 搜索框事件
			$("form :text").on("keyup", this.suggestHandler)
		},
	// 搜索建议处理
		suggestHandler(event) {
			// 文本框中的输入值
			const v = $(event.target).val()
			// 跨域请求 baidu 的 jsonp 提示接口
			const url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${v}&cb=?`;
			$.getJSON(url, (res) => {
				console.log(res);

				let html = "";
				res.s.forEach(curr=>{
				html += `<div>${curr}</div>`;
				


			});

			$(".suggest").html(html);
				// todo..........
				
			})
		}
	}

	// 创建对象，并返回
	return new HeaderAndFooter();
});