function validateForm() {
    var NumberATM = $("#NumberATM").val();
    var NameUser =$("#NameUser").val();
    var releasedate = $("#releasedate").val();
    if(NumberATM==="" || !Number.isInteger(parseInt(NumberATM))){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Dãy Số In Trên Thẻ");
        return false;
    }
    if(NameUser===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Họ Tên Chủ Tài Khoản");
        return false;
    }
    if(releasedate===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Ngày Phát Hành");
        return false;
    }
    
   
}
$(document).ready(function() {
    $("#erro").hide();
});
