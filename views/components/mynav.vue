<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <a class="navbar-brand" href="#" title="TUNGSEVEN"><img
                        src="/public/img/logo.png" style="width: 50px; margin-top: -15px" alt="logo"
                        title="TUNGSEVEN"></a>
                <!--<a class="navbar-brand" href="#">Tungseven</a>-->
            </div>

            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/">Trang chủ</a></li>
                </ul>
                <form class="navbar-form navbar-left">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder=" Địa điểm, Nhà hàng...">
                        <div class="input-group-btn">
                            <button class="btn btn-default" type="submit">
                                <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0)" id="btn-dangnhap"><span class="fix-br"><i
                            class="glyphicon glyphicon-log-in"></i>Đăng nhập</span></a></li>
                    <li><a href="javascript:void(0)" id="btn-dangki"><span class="fix-br"><i
                            class="glyphicon glyphicon-user"></i>Đăng kí</span></a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>