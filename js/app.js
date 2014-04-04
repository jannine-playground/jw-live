var app = angular.module("AcapellaLiveShot", []);

app.controller("HomeController", function($scope){

  $scope.message = "Hello";
  $scope.photos = [];
  $scope.bv = null;
  $scope.sly = null;

  function loadVideo(video) {
    var bv = new $.BigVideo();
    bv.init();
    bv.show(video, {ambient:true});

    bv.getPlayer().volume(100);


    return bv;
  }

  angular.element(document).ready(function(){
    initVideo();
    initSly();
  });

  function initVideo() {
//     var video = "videos/jw.ogv";
//     var video = "videos/acapella.mp4";
    var video = "videos/trouble.mp4";
    var bv = loadVideo(video);
    $scope.bv = bv;
  }

  function initSly(){
    $scope.sly = start();
  }

  function shot(video) {
    var w = video.videoWidth;
    var h = video.videoHeight;

    var canvas =  document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    var urlData = canvas.toDataURL("image/png");
    return urlData;
  };

  function show(urlData) {
    var photos = document.getElementById("photos");
    var img = document.createElement("img");
    img.setAttribute("src", urlData);
    img.classList.add("animated");
    img.classList.add("fadeInDown");

    var li = document.createElement("li");
    li.appendChild(img);
    return li;

  };

  $scope.capture = function(){

    var player =  $scope.bv.getPlayer();
    var video = player.M;
    var url = shot(video);
    var li = show(url);

    var sly = $scope.sly;
    sly.add(li);
    sly.toEnd();
  };
});
