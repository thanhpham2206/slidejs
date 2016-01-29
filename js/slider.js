/**
 * Created by User on 1/25/2016.
 */
var ul;
var liItems;
var imageNumber;
var imageWidth;
var prev, next;
var currentPostion = 0;
var currentImage = 0;

function init() {
    ul = document.getElementById("sliderContainer");
    liItems = ul.children;
    imageNumber = liItems.length;
    imageWidth = liItems[0].children[0].clientWidth;
    ul.style.width = parseInt(imageWidth * imageNumber) + "px";
    prev = document.getElementById("prev");
    next = document.getElementById("next");
    generatePointList(imageNumber);

    prev.onclick = function() {
        onClickPrev();
    };
    next.onclick = function() {
        onClickNext();
    };
}

function animate(opts){
    var start = new Date;
    var id = setInterval(function() {
        var timePassed = new Date - start;
        var progress = timePassed / opts.duration;
        if (progress > 1) {
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1) {
            clearInterval(id);
            opts.callback();
        }
    }, opts.relay || 17);
}

function slideTo(imageToGo) {
    var direction;
    var numOfImageToGo = Math.abs(imageToGo - currentImage);
    direction = currentImage > imageToGo ? 1 : -1;
    currentPostion = -1 * imageWidth * currentImage;
    var opts = {
        duration: 1000,
        delta:function(p) {
            return p;
        },
        step:function(delta) {
            ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + "px";
        },
        callback:function() {
            currentImage = imageToGo;
        }
    };
    animate(opts);
}

function onClickPrev() {
    if(currentImage == 0) {
        slideTo(imageNumber - 1);
    }
    else {
        slideTo(currentImage - 1);
    }
}

function onClickNext() {
    if(currentImage == imageNumber - 1) {
        slideTo(0);
    }
    else {
        slideTo(currentImage + 1);
    }
}

function generatePointList(imageNumber) {
    var pointNumber;
    var pointDiv = document.getElementById("pointList");
    for (var i = 0; i < imageNumber; i++) {
        var li = document.createElement("li");
        pointNumber = document.createTextNode("");
        li.appendChild(pointNumber);
        pointDiv.appendChild(li);
        li.onclick = function(i) {
            return function() {
                slideTo(i);
            }
        }(i);
    }
    var computedStyle = document.defaultView.getComputedStyle(li, null);
    var liWidth = parseInt(li.offsetWidth);
    var liMargin = parseInt(computedStyle.margin.replace("px", ""));
    pointDiv.style.width = parseInt((liWidth + liMargin * 2) * imageNumber) + "px";
}
window.onload = init;