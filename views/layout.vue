<template>
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="image/x-icon" rel="shortcut icon" href="/public/img/logo.png">
    <!--<script src="/public/js/axios.min.js"></script>-->
    </head>
    <body>
    {{{app}}}
    <script>
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }

        function showPosition(position) {
            document.getElementById('inLat').value = position.coords.latitude
            document.getElementById('inLong').value = position.coords.longitude
//            $("#lat").val(position.coords.latitude);
//            $("#long").val(position.coords.longitude);
//        console.log(position.coords.latitude, position.coords.longitude)
        }

        function load_near() {
            var data = {
                lat: $('#lat').val(),
                long: $('#long').val(),
                type: $('#type').val(),
                r: $('#r').val(),
            }
            $.ajax({
                url: "/find/Near",
                type: "POST",
                dataType: "json",
                data: data,
                success: function (result) {
                    console.log(result);
                    var app = new Vue({
                        el: '#myApp',
                        data: {
                            location: result
                        }
                    })

                }
            })
        }

        function load_dist() {
            var data = {
                dist: $('#district').val(),
                type: $('#type').val()

            }
            $.ajax({
                url: "/find/Dist",
                type: "POST",
                dataType: "application/json",
                data: data
            })
        }

        function load_form() {
            document.getElementById('inDist').value = document.getElementById('district').value;
            document.getElementById('inType').value = document.getElementById('type').value;
            document.getElementById('inR').value = document.getElementById('r').value;
            document.getElementById('inType2').value = document.getElementById('type').value;
            document.getElementById("nearForm").submit();
        }

        function load_form2() {
            document.getElementById('inDist').value = document.getElementById('district').value;
            document.getElementById('inType2').value = document.getElementById('type').value;
            document.getElementById("distForm").submit();
        }

        function load_form3() {
            document.getElementById('inType').value = document.getElementById('type').value;
            document.getElementById('inType2').value = document.getElementById('type').value;
        }

        function nearFunction() {
            document.getElementById("nearForm").submit();
        }

        function distFunction() {
            document.getElementById("distForm").submit();
        }
    </script>
    {{{script}}}

    </body>
    </html>
</template>
