var socket = io("http://nhantien.tk");
socket.on("Server-sent-Number", function(data)
{
   try {
       $("#number-online").html(data);
       
   } catch (error) {
       
   }
});


