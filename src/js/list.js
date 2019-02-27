require(["./config"], function() {
	require(["jquery", "template", "loadHF", "cookie", "fly"], function($, template) {
		function List() {
			this.loadList()
			this.addListener();
		}

		List.prototype = {
			constructor: List,
			// ajax 加载列表数据
			loadList() {
				// $.getJSON("/mock/list.json", res => {
				$.getJSON("http://148.70.25.70:8080/app/mock/18/api/list", res => {
					console.log(res)
					// res.res_body.list;
					const data = {list: res.res_body.list}
					const html = template("list-template", data)
					$(".ull").append(html)
				})
			},
			// 注册事件监听
			addListener() {
				$("ul.ull").on("click", "button.add-to-cart", this.addToCartHandler)
			},
			// 处理添加到购物车
			addToCartHandler(event) {
				// 当前点击按钮的父元素
				const $parent = $(event.target).parent()
				// console.log(event.target, this)
				// 获取当前选购商品的信息
				const currProd = {
					id: $parent.data("id"),
					title: $parent.find(".p1").text(),
					img: $parent.find(".prod-img").attr("src"),
					price: $parent.find(".p3").text(),
					amount: 1
				}
				console.log(currProd)
				// 读取cookie中保存的已有购物车
				$.cookie.json = true;
				const cart = $.cookie("cart") || []
				// 判断购物车是否已保存了当前选购商品
				const has = cart.some(curr => {
					if (curr.id == currProd.id) { // 存在，则数量递增
						curr.amount++;
						return true
					}
					return false
				})
				// 如果不存在，则添加到数组中
				if(!has)
					cart.push(currProd)
				// 将购物车保存到cookie中
				$.cookie("cart", cart, {expires: 7, path: "/"})

				// 添加抛物线效果
				// const _end = $(".mycart").offset();
				// const flyer = $(`<img src="${currProd.img}" style="width:40px; height: 40px;">`);
				// flyer.fly({
				// 	start: {
				// 		left: event.pageX - $(window).scrollLeft(),
				// 		top: event.pageY - $(window).scrollTop()
				// 	},
				// 	end: {
				// 		left: _end.left - $(window).scrollLeft(),
				// 		top: _end.top - $(window).scrollTop()
				// 	},
				// 	onEnd: function() {
				// 		this.destroy();
				// 	}
				// });
			}
		}

		new List();
	})
})