var pubnub = new PubNub({
    subscribeKey: "sub-c-6032dc88-d7a2-11e6-9a5d-02ee2ddab7fe",
    publishKey: "pub-c-c6afc110-89d2-49a0-b4e5-56b51d28ca87",
    ssl: true
})


var openGames = {};
var myChannel;
pubnub.addListener({
    
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        
        if(msg.type == "channelCreate"){
            openGames[msg.id] = {name: msg.gameName, player: msg.playerName, uuid: msg.id, time: msg.timesent}
        }
        
        if(msg.type == "channelJoin" && msg.joinedid != myUUID && channelName == myChannel){
            window.clearInterval(spamLobby)
            startGame(true, myName, msg.player)
        }
        if(msg.type == "channelJoin" && msg.joinedid != myUUID){
            delete openGames[msg.channel]
            showGames()
        }
        
        if(msg.type == "move" && msg.id != myUUID){
            moveReceived(msg.move)
        }
        
        showGames();
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        // handle status
    }
})

pubnub.subscribe({
    channels: ['lobby'],
    withPresence: true // also subscribe to presence instances.
})

var spamLobby;
function pubnubCreateLobby(uuid, game, player){
   spamLobby = window.setInterval(function(){
        pubnub.publish(
            {
                message: {
                    type: "channelCreate",
                    id: uuid,
                    gameName: game,
                    playerName: player,
                    timesent: new Date().getTime() / 1000
                },
                channel: 'lobby',
                sendByPost: false, // true to send via post
                storeInHistory: false, //override default storage options
                meta: {
                    "cool": "meta"
                } // publish extra meta with the request
            },
            function (status, response) {
                // handle status, response
            }
        );   
    },3000)
    
    pubnub.subscribe({
        channels: [uuid],
        withPresence: true // also subscribe to presence instances.
    })
    myChannel = uuid;
}


function showGames(){
    $("#openGames").empty();
    for(var g in openGames){
        $("#openGames").append("<div onclick='joinGame(\"" + openGames[g].uuid +"\")' id='" + openGames[g].uuid + "'>" + openGames[g].name + " / " +  openGames[g].player + " / 1/2")
    }
    
}


function pubnubJoinGame(id){
    myChannel = id
    pubnub.publish(
        {
            message: {
                type: "channelJoin",
                channel: id,
                joinedid: myUUID,
                player: myName,
            },
            channel: id,
            sendByPost: false, // true to send via post
            storeInHistory: false, //override default storage options
            meta: {
                "cool": "meta"
            } // publish extra meta with the request
        },
        function (status, response) {
            // handle status, response
        }
    );
    clearInterval(checkGames)
    pubnub.publish(
        {
            message: {
                type: "channelJoin",
                joinedid: myUUID,
                channel: id,
                player: myName,
            },
            channel: "lobby",
            sendByPost: false, // true to send via post
            storeInHistory: false, //override default storage options
            meta: {
                "cool": "meta"
            } // publish extra meta with the request
        },
        function (status, response) {
            // handle status, response
        }
    );
    pubnub.subscribe({
        channels: [id],
        withPresence: true // also subscribe to presence instances.
    })
    startGame(false, myName, openGames[id].player)
}

function pubnubSendMove(move){
    pubnub.publish(
        {
            message: {
                type: "move",
                channel: myChannel,
                move: move,
                id: myUUID,
            },
            channel: myChannel,
            sendByPost: false, // true to send via post
            storeInHistory: false, //override default storage options
            meta: {
                "cool": "meta"
            } // publish extra meta with the request
        },
        function (status, response) {
            // handle status, response
        }
    );
}


var checkGames = window.setInterval(
    function(){
        for (var property in openGames) {
            if (openGames.hasOwnProperty(property)) {
                var seconds = new Date().getTime() / 1000 - openGames[property].time
                if(seconds > 15){
                    delete openGames[property]
                    showGames()
                    break
                }
            }
        }
    }
,3000)






















function uuidGen()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 35; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}