require(["config"],function(){
	require(["jquery","url","loadHF"],function($,Url){
		function Verify(){
			this.addListener();
			this.gencode();
		}
		Verify.prototype = {
			constructor : Verify,
			addListener(){
				// console.log(1234)
				$("#username2").blur(function(){
					// console.log(788)
					let _username = $("#username2").val()

					// console.log(_username)
					$.ajax({
						url: Url.baseUrlPhp + "/api/v1/check.php",
						method: "post",
						data: { username: _username },
						dataType:"json",
						success: function(data){

							// console.log(data.error)
							$("#uname_info2").html(data.error)
						
						   }
					})

				})
				$("#loginBtn").on("click",(e)=>{
					e.preventDefault();
					let _username = $("#username1").val(),
						_password = $("#password1").val()

						// console.log(_username);

						// return false
						// 第二种阻止默认事件的方法
						$.ajax({
							url: Url.baseUrlPhp + "/api/v1/login.php",
							method: "post",
							data: { _username, _password },
							dataType:"json",
							success: function(data){
							if(data.code==1){
								location = "login.html";
							}else(data.code==0)
								alert(data.message)
							


		
							// console.log(data.message)

							}
						})

						
				})

				$("#regBtn").on("click",(e)=>{
					e.preventDefault();
					let _username = $("#username2").val(),
						_password = $("#password2").val();

						// $.ajax({
						// 	url: Url.baseUrlPhp + "/api/v1/register.php",
						// 	method: "post",
						// 	data: { _username, _password },
						// 	dataType:"json",
						// 	success: function(data){
						// 	alert(12)
						// 	}	
						//   });
						$.ajax({
							url: Url.baseUrlPhp + "/api/v1/register.php",
							method: "post",
							data: { _username, _password },
							dataType:"json",
							success: function(data){
								console.log(1)
								console.log(data)

							
							   }
						})



				})
			} ,

			gencode(){
				$.ajax({
					url: "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=1dc4670a3c32431b8ff0a616b3dce4c0",
					dataType: "json",
					success: res => {
						const {sid, image} = res.showapi_res_body;
						$("#gen-code").attr("src",image)
						$("#gen-code").sid = sid; // 添加自定义属性，保存生成验证码的sid标识
						// console.log(image)
					}
				});
			}
		}
		new Verify()
	})
})


