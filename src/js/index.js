require(["./config"], function() {
	require(["jquery", "loadHF"], function($) {
		function Index() {
			this.loadHot();
		}
		Index.prototype = {
			constructor: Index,
			// 加载热销商品数据，渲染
			loadHot() {
				$.getJSON("http://148.70.25.70:8080/app/mock/18/api/hot", (res) => {
				// $.getJSON("/mock/hot.json", (res) => {					
					let html = ""
					res.res_body.list.forEach(curr => {
						html += `<li>
									<img src="${curr.img}" alt="">
									<p><a href="/html/detail.html?id=${curr.id}">${curr.title}</p>
									<p class="price">${curr.price}</p>
									<a href="">加入购物车</a>
								</li>`;
					})
					$(".in").prepend(html);

					
				})
			}
		}

		new Index();
	})
})