require(["./config"], function () {
    require(["jquery", "template", "loadHF"], function ($, template) {
        function List() {
            this.loadList()

        }

        List.prototype = {
            constructor: List,
            loadList() {
                // const _id = location.search.slice(location.search.lastIndexOf("=") + 1);
                const _id = location.search.slice(4);
                console.log(_id);
              
                    console.log(location.search.lastIndexOf("="))
                $.getJSON("http://rap2api.taobao.org/app/mock/126856/api/detail", res => {
                    console.log(res)
                    console.log("获取id的那个对象");
                    console.log(res.res_body.list[_id-1]);
                    const data = res.res_body.list[_id-1];
                    console.log(data)
                    const html = template("list-template", data)
                    $("#product_wrap").html(html)
                })
                $.getJSON("http://rap2api.taobao.org/app/mock/126856/api/recommend", res => {
                    const data = {list: res.res_body.list};

                    console.log(data);
                    const html = template("recommend-template", data);

                    // const html = ""
					// res.res_body.list.forEach(curr => {
					// 	html += `<li>
					// 				<img src="${curr.img}" alt="">
					// 				<p><a href="/html/detail.html?id=${curr.id}">${curr.title}</p>
					// 				<p class="price">${curr.price}</p>
					// 				<a href="">加入购物车</a>
					// 			</li>`;
					// })
                    // $("#product_reco").prepend(html);
                    
                    $("#product_reco").prepend(html)
                })
            },


        }
        new List();


    })
})


