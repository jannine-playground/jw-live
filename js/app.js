var app = angular.module("AcapellaLiveShot", []);

app.controller("HomeController", function($scope){

  $scope.message = "Hello";
  $scope.photos = [];

  var bv = new $.BigVideo();
  bv.init();
  bv.show('videos/bunny.webm',{ambient:true});

  $scope.capture = function(){

    var player =  bv.getPlayer();
    var video = player.M;
    var w = video.videoWidth;
    var h = video.videoHeight;

    var canvas =  document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    var urlData = canvas.toDataURL("image/png");

    $scope.photos.push(urlData);

    var photos = document.getElementById("photos");
    var img = document.createElement("img");
    img.setAttribute("src", urlData);
    img.classList.add("animated");
    img.classList.add("fadeIn");

    photos.appendChild(img);
  };
});
