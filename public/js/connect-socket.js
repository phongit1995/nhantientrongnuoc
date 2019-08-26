var socket = io("https://nhantien.herokuapp.com");
socket.on("Server-sent-Number", function(data)
{
   try {
       $("#number-online").html(data);
       
   } catch (error) {
       
   }
});


