var socket = io("https://nhantien.herokuapp.com");
socket.on("Server-sent-Number", function(data)
{
   try {
       console.log(data);
       $("#number-online").html(data);
       
   } catch (error) {
       
   }
});


