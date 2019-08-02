$(document).ready(function() {
    Loadingtext();
    turnof();
    hideinput();
    $("#erro").hide();
});
function Loadingtext(){
    var originalText = $("#loading").text(),
    i  = 0;
setInterval(function() {

    $("#loading").append(" . ");
    i++;

    if(i == 4)
    {
        $("#loading").html(originalText);
        i = 0;
    }

    }, 500);
}
function turnof(){
    setTimeout(()=>{
        $("#loader").hide();
        $("#info").hide();
        $("#confirm").removeAttr("disabled"); 
        $("#OTP").removeAttr("disabled");
    },120* 1000);
}
function hideinput(){
    $("#confirm").attr("disabled", "disabled");
    $("#OTP").attr("disabled", "disabled");
}
function validateForm() {
    var OTP= $("#OTP").val();
    if(OTP===""){
        $("#erro").show();
        $("#erro").html("Vui Lòng Nhập Mã OTP");
        return false;
    }
}