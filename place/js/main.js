var CANVAS_ID = 'canvas'
var OVERLAY_ID = 'canvas-overlay'
var IMG_SRC = 'img/chopper.png'

var urlString = window.location.href
var url = new URL(urlString);
var a = url.searchParams.get("a");
console.log(a);
var b = url.searchParams.get("b");
console.log(b);
var c = url.searchParams.get("c");
console.log(c);

var body = document.getElementById('body')
var info = document.getElementById('floating-info')
var valPNG = document.getElementById("val-png")
var valX = document.getElementById("val-x")
var valY = document.getElementById("val-y")
var shareLink = document.getElementById("share-link")

var canvas = document.getElementById(CANVAS_ID)
var ctx = canvas.getContext('2d')

// In tiles
var XOrigin = 0
var YOrigin = 0

//pixels per tile
var scale = 10

var mouseX = 0
var mouseY = 0

var mouseXTiles = 0
var mouseYTiles = 0

var img = new Image()

function init(){

    if (a != null) {
        img.src = decodeURIComponent(a)
    }
    if (b != null) {
        XOrigin = parseInt(b)
        document.getElementById("x-origin").value = XOrigin
    } else {
        b = XOrigin
    }
    if (c != null) {
        YOrigin = parseInt(c)
        document.getElementById("y-origin").value = YOrigin
    } else {
        c = YOrigin
    }

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    //img.src = IMG_SRC
    window.requestAnimationFrame(draw);
    //img.src='https://media.discordapp.net/attachments/959471679409647626/959863816366207006/images.png'
  }

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear
    
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale)

    ctx.strokeStyle = 'black';
    ctx.strokeRect((mouseXTiles * scale) - 0.5, (mouseYTiles * scale) -0.5, scale + 1, scale + 1);
    ctx.strokeStyle = 'white';
    ctx.strokeRect((mouseXTiles * scale) - 1.5, (mouseYTiles * scale) -1.5, scale + 3, scale + 3);



    window.requestAnimationFrame(draw);
}
  
canvas.addEventListener('mousedown', e => {
      let x = e.clientX
      let y = e.clientY

      console.log(Math.floor(x/scale))
      console.log(Math.floor(y/scale))

  })

body.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY

    mouseXTiles = Math.floor(mouseX/scale)
    mouseYTiles = Math.floor(mouseY/scale)

    let y = e.pageY - info.offsetHeight - scale
    let x = e.pageX + scale

    if ( y < 25 ){
        y = 25
    }
    info.style.transform = 'translate(' + x + 'px' + ',' + y + 'px' + ')';

    let XDisplay = XOrigin + mouseXTiles
    let YDisplay = YOrigin + mouseYTiles
    info.innerHTML = XDisplay + ',' + YDisplay
})

window.addEventListener("resize", function() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    window.requestAnimationFrame(draw);
})

valPNG.onclick = validatePNG

function validatePNG()
{
    let urlImg = document.getElementById("url-png").value
    console.log(urlImg)
    URL.revokeObjectURL(img.src)
    img.src = urlImg
    a = encodeURIComponent(urlImg)
}

valX.onclick = validateX

function validateX()
{
    XOrigin = parseInt(document.getElementById("x-origin").value)
    b = XOrigin
}

valY.onclick = validateY

function validateY()
{
    YOrigin = parseInt(document.getElementById("y-origin").value)
    c = YOrigin
}


shareLink.onclick = copyLink

function copyLink()
{
    let params = '';

    if (a != null) {
        params = params + 'a=' + a
    }
    if (b != null) {
        params = params + '&b=' + b
    }
    if (c != null) {
        params = params + '&c=' + c
    }

    let link = url.origin + url.pathname + '?' + params

    console.log(link)
    navigator.clipboard.writeText(link).then(function() {
        alert('Link copied')
      }, function() {
        alert('Failed to copy link')
      });
}

document.getElementById('plus').onclick = zoom

function zoom() {
    scale = scale + 1
}

document.getElementById('minus').onclick = dezoom

function dezoom() {
    scale = scale - 1
}

init();