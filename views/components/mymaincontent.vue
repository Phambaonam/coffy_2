<template>
    <section class="container-fluid tab">
        <div class="container mieuta">
            <div class="container" id="second-menu">
                <div class="row">
                    <div class="col-sm-2 col-xs-12 submit" hidden="hidden">
                        <form action="/find/loc" method="post" id="nearForm">
                            <input id="inLat" name="inLat">
                            <input id="inLong" name="inLong">
                            <input id="inType" name="inType">
                            <input id="inR" name="inR">
                        </form>

                        <form action="/find/dist" method="post" id="distForm">
                            <input id="inDist" name="inDist">
                            <input id="inType2" name="inType2">
                        </form>

                    </div>

                    <div class="col-sm-2 col-xs-12 district">
                        <select name="district" class="select" id="district" onchange="load_form2()">
                            <option>- Quận/Huyện -</option>
                            <option value="1">Quận Hà Đông</option>
                            <option value="2">Quận Hai Bà Trưng</option>
                            <option value="3">Quận Hoàn Kiếm</option>
                            <option value="4">Quận Ba Đình</option>
                            <option value="5">Quận Thanh Xuân</option>
                            <option value="6">Quận Đống Đa</option>
                            <option value="7">Quận Cầu Giấy</option>
                            <option value="8">Quận Tây Hồ</option>
                            <option value="9">Quận Gia Lâm</option>
                            <option value="10">Quận Hoàng Mai</option>
                            <option value="11">Quận Nam Từ Liêm</option>
                            <option value="12">Quận Bắc Từ Liêm</option>
                            <option value="13">Quận Long Biên</option>
                        </select>
                    </div>

                    <div class="col-sm-2 col-xs-12 type">
                        <select name="type" class="select" id="type" onchange="load_form3()">
                            <option>- Thể loại -</option>
                            <option value="1">Restaurant</option>
                            <option value="2" selected="selected">Café/Dessert</option>

                        </select>
                    </div>

                    <div class="col-sm-2 col-xs-12 radius">
                        <select name="r" class="select" id="r" onchange="load_form()">
                            <option>- Khoảng cách -</option>
                            <option value="200">200m</option>
                            <option value="500">500m</option>
                            <option value="1000">1 km</option>
                            <option value="2000">2 km</option>
                            <option value="5000">5 km</option>
                        </select>
                    </div>

                    <div class="col-sm-2 col-xs-12 submit" hidden="hidden">
                        <input type="button" onclick="nearFunction()" value="FIND NEAR">
                        <input type="button" onclick="distFunction()" value="FIND DIST">
                    </div>
                    <!--</form>-->
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <!--<h1>{{mydata}}</h1>-->
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 special" v-for="data in mydata">
                        <div class="list">
                            <div class="item">
                                <div class="image">
                                    <img :src="data.image">
                                    <div class="image-overlay">
                                        <a :href="/detail/ + data.id_location"><span>Xem Chi Tiết</span></a>
                                    </div>
                                </div>
                                <div class="description">
                                    <span>{{data.rate }}</span>
                                    <a href="detail.html">
                                        <h3>{{ data.name }}</h3>
                                    </a>
                                    <p>{{ data.address }}, {{ data.district }}, Hà Nội</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--{% else %}-->
                    <!--<p>NOT FOUND</p>-->


                </div>
            </div>
        </div>

    </section>
    <!-- LOGIN MODAL -->
    <!--    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Large modal</button> -->
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <ul class="nav nav-tabs" id="myTabs" role="tablist">
                        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab"
                                                                  data-toggle="tab">Đăng nhập</a></li>
                        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Đăng
                            kí</a></li>
                    </ul>
                </div>
                <div class="modal-body">
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="home">
                            <form class="form-login-signup">
                                <div class="form-group login-form">
                                    <label for="recipient-name" class="control-label">Email:</label>
                                    <input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
                                           id="email">
                                </div>
                                <div class="form-group login-form">
                                    <label for="message-text" class="control-label">Mật khẩu:</label>
                                    <input type="password" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
                                           id="password">
                                </div>
                            </form>


                            <div class="btn-login-sign-up">
                                <div id="lost-pass">
                                    <a href="">Quên mật khẩu?</a>
                                    <input type="checkbox" name="" id=""><span>&nbsp; Ghi nhớ đăng nhập</span>
                                </div>

                                <div class="socials-login">
                                    <a href="" id="login-fb" class="color-white">
                                        <span class="fa fa-facebook text-center background-blue"></span>
                                        <span class="fix-width-social text-center color-blue">Facebook</span>
                                    </a>
                                    <a href="" id="login-gg" class="color-white">
                                        <span class="fa fa-google-plus text-center background-red"></span>
                                        <span class="fix-width-social text-center color-red">Google</span>
                                    </a>
                                </div>

                                <a href="user-dashboard.html">
                                    <button type="button" class="btn btn-primary">Đăng Nhập</button>
                                </a>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="profile">
                            <div role="tabpanel" class="tab-pane active" id="home">
                                <form class="form-login-signup">


                                    <div class="form-group login-form">
                                        <label for="recipient-name" class="control-label">Email:</label>
                                        <input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
                                               id="email">
                                    </div>

                                    <div class="form-group login-form">
                                        <label for="message-text" class="control-label">Mật khẩu:</label>
                                        <input type="password"
                                               class="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
                                               id="password">
                                    </div>

                                    <div class="form-group login-form">
                                        <label for="message-text" class="control-label">Xác nhận mật khẩu:</label>
                                        <input type="password"
                                               class="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
                                               id="password">
                                    </div>

                                    <div class="form-group login-form">
                                        <label for="recipient-name" class="control-label">Họ tên:</label>
                                        <input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
                                               id="username">
                                    </div>

                                    <div class="form-group login-form">
                                        <label for="recipient-name" class="control-label">Số điện thoại:</label>
                                        <input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control">
                                    </div>
                                </form>
                                <div class="btn-login-sign-up">
                                    <a href="">
                                        <button type="button" class="btn btn-primary">Đăng Kí</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['mydata']
    }
</script>
