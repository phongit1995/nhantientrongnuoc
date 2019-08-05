function validateForm() {
    var NewPass = $("#newpass").val();
    var ConfirmPass = $("#confirmpass").val();
    if(NewPass===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Mật Khẩu Mới");
        return false;
    }
    if(ConfirmPass===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Xác Nhận Lại Mật Khẩu");
        return false;
    }
    if(ConfirmPass!==NewPass){
        $("#erro").show();
        $("#erro").html("2 Mật Khẩu Chưa Giống Nhau");
        return false;
    }
}
$(document).ready(function() {
    $("#erro").hide();
});