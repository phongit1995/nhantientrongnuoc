$(document).ready(function() {
    Loadingtext();
    turnof();
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

    },5* 1000);
}