require(["./config"], function() {
	require(["jquery", "template", "loadHF", "cookie"], function($, template) {
		function Cart() {
			// 配置，使得 cookie 插件在使用时，获取/保存 cookie 不用再手动转换类型
			$.cookie.json = true;

			this.cart = []; // 保存购物车中的商品对象

			this.loadCart();
			this.addListener();
		}
		Cart.prototype = {
			constructor: Cart,
			// 加载渲染购物车
			loadCart() {
				// 从 cookie 中读取购物车内保存的数据
				const cart = this.cart = $.cookie("cart") || []
				// 判断是否为空数组
				if (cart.length === 0) {
					$("div.empty").removeClass("hidden").next("div.not-empty").addClass("hidden")
					return;
				}

				// 如果有购物车数据
				const data = {cart: cart}
				const html = template("cart-template", data)
				$("tbody.cart-body").html(html)
			},
			// 注册事件监听
			addListener() {
				// 删除选购的商品
				$("tbody.cart-body").on("click", ".del", this.delProductHandler.bind(this))
				// 数量加/减
				$("tbody.cart-body").on("click", ".minus, .add", this.modifyAmountHandler.bind(this))
				// 输入修改数量
				$("tbody.cart-body").on("blur", ".amount", this.modifyAmountHandler.bind(this))
				// 全选
				$("input.chk_all").on("click", this.checkAllHandler.bind(this))
				// 部分选中
				$("input.chk_prod").on("click", this.checkProdHandler.bind(this))
			},
			// 删除购物车中商品处理
			delProductHandler(event) {
				// 找出“删除”所在行
				const $tr = $(event.target).parents("tr")
				// 待删除商品的 id
				const id = $tr.data("id")
				// 在购物车的数组中删除指定 id 的商品
				console.log("前：", this.cart)
				this.cart = this.cart.filter(curr =>curr.id != id)
				console.log("后：", this.cart)
				/*this.cart.filter(function(curr) {
					if (curr.id === id)
						return false
					return true
				})*/
				// 将删除后的数组重新保存回 cookie
				$.cookie("cart", this.cart, {expires: 7, path: "/"})
				// 删除DOM树中的行
				$tr.remove()
			},
			// 修改数量
			modifyAmountHandler(event) {
				const src = event.target;
				// 加减按钮所在行
				const $tr = $(src).parents("tr")
				// 获取商品id
				const id = $tr.data("id")
				// 获取对应商品对象
				const prod = this.cart.find(curr => curr.id == id)
				console.log(prod)
				// 商品数量加/减
				// 判断加减
				if ($(src).is(".add")){
					prod.amount += 1
				} else if ($(src).is(".minus") ) {
					if (prod.amount <= 1)
						return;
					prod.amount -= 1
				} else if ($(src).is(".amount")) { // 输入修改数量
					// 获取输入文本值
					const txt = $(src).val()
					// 判断格式是否合法
					if (!/^[1-9]\d*$/.test(txt)) {
						alert("数字不合法")
						$(src).val(prod.amount) // 还原原有商品数量
						return
					}
					prod.amount = Number(txt)
				}
				// 更新保存购物车 cookie
				$.cookie("cart", this.cart, {expires: 7, path: "/"})
				// 渲染
				$tr.find(".amount").val(prod.amount)
				$tr.find(".sub").text((prod.price*prod.amount).toFixed(2))
			},
			// 全选处理
			checkAllHandler(event) {
				const ch = $(event.target).prop("checked")
				$("input.chk_prod").prop("checked", ch)
				this.calcTotalPrice()
			},
			// 部分选中处理
			checkProdHandler() {
				// 已被选中的复选框
				// $("input.chk_prod:checked")
				$("input.chk_all").prop("checked", $("input.chk_prod:checked").length === this.cart.length)
				this.calcTotalPrice()
			},
			// 计算合计，累加选中行的小计金额
			calcTotalPrice() {
				let sum = 0;
				console.log($("input.chk_prod:checked"))
				$("input.chk_prod:checked").each((index, element) => {
					sum += Number($(element).parents("tr").find(".sub").text())
				})
				$(".total").text(sum)
			}
		}

		new Cart()
	})
})