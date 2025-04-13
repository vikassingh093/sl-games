async function sendWSMessage(ws, response)
{
    try
    {
        if(response != null)
        {
            var str = JSON.stringify(response);
            var len = str.length + "";
            str = len.padStart(4, '0') + str;
            // console.log("response message: " + str);
            ws.send(str);
        }
    }
    catch(e)
    {
        console.log("websocket send error: " + e);
    }
}

module.exports = {sendWSMessage};