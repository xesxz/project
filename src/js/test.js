require(["config"], function(){
	require(["jquery","url","loadHF"], function($, Url){
	  function Reg(){
		this.init();
	  }
	  Reg.prototype.init = function(){
		this.usernameInput = $("#username2");
		this.passwordInput = $("#password2");
		this.regBtn = $("#regBtn");
		this.bindEvents();
	  }
	  Reg.prototype.bindEvents = function(){
		//绑定登录事件
		this.regBtn.on("click", ()=>{
		  let username = this.usernameInput.val(),
			password = this.passwordInput.val();
			//发送ajax请求，登录
			$.ajax({
			  url: Url.baseUrlPhp + "/api/v1/register.php",
			  method: "post",
			  data: { username, password },
			  dataType:"json",
			  success: function(data){
			   if(data.code === 1){
				 
			   }
			  }
			});

		

			return false;
		})
		
	  }
		new Reg();

		function Login(){
			this.init();
			}
			Login.prototype.init = function(){
			this.usernameInput = $("#username1");
			this.passwordInput = $("#password1");
			this.loginBtn = $("#loginBtn");
			this.bindEvents();
			}
			Login.prototype.bindEvents = function(){
			//绑定登录事件
			this.loginBtn.on("click", ()=>{
				let username = this.usernameInput.val(),
				password = this.passwordInput.val();
				//发送ajax请求，登录
				$.ajax({
					url: Url.baseUrlPhp + "/api/v1/login.php",
					method: "post",
					data: { username, password },
					// dataType:"json",
					success: function(data){
					//  if(data.code === 1){
					 
					//  }

					console.log(data)
					}
				})
				return false;
			})
			
			}
			new Login();
	// function Check(){
	// 	this.init()
	// }

	
	}
	
	
	
	)
	})


