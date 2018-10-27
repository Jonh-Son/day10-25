function LoginModal(){
    this.createDom();
    this.addListener();
};

LoginModal.ModalTemplate = `<!-- 登录模态框 -->
    <div class="modal fade" id="loginModal" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="loginModalLabel">用户登录</h4>
          </div>
          <div class="modal-body">
          <div class="alert alert-danger hidden login-error">用户名或密码错误</div>
            <form class="form-login">
              <div class="form-group">
                <label for="loginUsername">用户名</label>
                <input type="text" class="form-control" name="username" id="loginUsername" placeholder="请输入用户名">
              </div>
              <div class="form-group">
                <label for="loginPassword">密码</label>
                <input type="password" class="form-control" name="password" id="loginPassword" placeholder="请输入密码">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-login">登录</button>
          </div>
        </div>
      </div>
    </div>`;

$.extend(LoginModal.prototype,{
    createDom(){
        $("body").append(LoginModal.ModalTemplate);
    },
    //注册事件监听
    addListener(){
      $(".btn-login").on("click",this.loginHandler);
    },
    //登录处理
    loginHandler(){
      const data = $(".form-login").serialize();
      const url = "http://rap2api.taobao.org/app/mock/86937/api/users/login";
      $.post(url,data,(data)=>{
        if(data.res_body.status === 1){
         sessionStorage.username = data.res_body.data.username;
         location.reload();
        }else{
          $(".login-error").removeClass("hidden");
        }
      },"json")
    }
});
