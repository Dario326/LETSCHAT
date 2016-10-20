angular.module('letsChat').controller('mainCtrl', function($scope){

    window.peer = new Peer({
        key: 'k0jmlay96akedn29',
        debug: 3,
        config: {'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'stun:stun1.l.google.com:19302' }
        ]}
    });

    peer.on('open', function () {
        $('#myPeerId').text(peer.id);
    });

    peer.on('call', function(incomingCall) {
        window.currentCall = incomingCall;
        incomingCall.answer(window.localStream);
        incomingCall.on('stream', function(remoteStream){
            window.remoteStream = remoteStream;
            $('#theirVideo').prop('src', URL.createObjectURL(remoteStream));
        });
    });

    navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia );

    navigator.getUserMedia({audio:false, video: true}, function(stream){
        var video = document.getElementById("myVideo");
        video.src = URL.createObjectURL(stream);
        window.localStream = stream;
    }, function(error){
        console.log(error);
    });

    $scope.makeCall = function(remotePeerId) {
        var outgoingCall = peer.call(remotePeerId, window.localStream);
        window.currentCall = outgoingCall;
        outgoingCall.on('stream', function (remoteStream) {
            window.remoteStream = remoteStream;
            $('#theirVideo').prop('src', URL.createObjectURL(remoteStream));
        });
    };


    $scope.endCall = function () {
        window.currentCall.close();
    };






});

