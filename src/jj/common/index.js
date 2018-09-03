$(function() {
    $.ajax({
        url: "/api/list",
        success: function(res) {
            var res = JSON.parse(res);
            if (res.code === 1) {
                console.log(res);
            }
        }
    })
})