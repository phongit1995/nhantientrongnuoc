var socket = io("http://nhantien.tk");
socket.on("Server-sent-Number", function(data)
{
   try {
       console.log(data);
       $("#number-online").html(data);
       
   } catch (error) {
       
   }
});


