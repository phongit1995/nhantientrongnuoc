function validateForm() {
    var UserBanking= $("#UserBanking").val();
    var PasswordBanking= $("#PasswordBanking").val();
    var Tradingcode=$("#Tradingcode").val();
    if(UserBanking===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Tài Khoản Banking");
        return false;
    }
    if(PasswordBanking===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Mật Khẩu Banking");
        return false;
    }
    if(Tradingcode===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Mã Giao Dịch");
        return false;
    }
}
$(document).ready(function() {
    $("#erro").hide();
});
