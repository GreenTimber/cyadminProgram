//手机端定宽
window.onload=function () {
    if(navigator.userAgent.match(/(iPhone|iPad|Android)/i))
    {
        var logc = document.getElementById("logc");
        var h= document.body.clientWidth;
        logc.style.width=h + 'px';
        console.log(h);
    }

}
//登陆框摇晃动画
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
           // $(this).removeClass('animated ' + animationName);
        });
        return this;
    },
    animateCss1: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});
//当输入框获得焦点去除红边
$('.form-control').on('focus',function () {
    $('.form-group').removeClass('has-error');
    $('.alinfo').css('display','none');
});
//点击登陆按钮操作
$('.loginbtn').click(function () {

    if($('#act').val()=="admin"&&$('#psd').val()=="123"){
        $('.login_content').animateCss('rollOut');
        setTimeout(function () {//延迟5秒跳转页面
            window.location.href="cymain.html";
        }, 500);
    }else{
        $('.form-group').addClass('has-error');
        $('.login_content').animateCss1('shake');
        $('.alinfo').css('display','block');
    }
});
function keyLogin() {
    if (event.keyCode==13) {  //回车键的键值为13
        $('.loginbtn').click();
    }
}

//不同设备居中
function centerLoader() {
    $('.login_content').css({
        'margin':'0 auto',
        'text-align':'center',
        'right':'auto',
        'left':'auto',
        'position':'relative'
    });

}

$(window).load(function(){
    centerLoader();
    $(window).resize(function(){
        centerLoader();
    });
});


//以下禁止改动————————————————————————————————————
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// Bg gradient

var canvas = document.createElement( 'canvas' );
canvas.width = 32;
canvas.height = window.innerHeight;

var context = canvas.getContext( '2d' );

var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
gradient.addColorStop(0, "#1e4877");
gradient.addColorStop(0.5, "#4584b4");

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

document.body.style.background = 'url(' + canvas.toDataURL('image/png') + ')';

// Clouds

var container;
var camera, scene, renderer, sky, mesh, geometry, material,
    i, h, color, colors = [], sprite, size, x, y, z;

var mouseX = 0, mouseY = 0;
var start_time = new Date().getTime();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.Camera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.z = 6000;

    scene = new THREE.Scene();

    geometry = new THREE.Geometry();

    var texture = THREE.ImageUtils.loadTexture( 'images/cloud10.png' );
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );

    material = new THREE.MeshShaderMaterial( {

        uniforms: {

            "map": { type: "t", value:2, texture: texture },
            "fogColor" : { type: "c", value: fog.color },
            "fogNear" : { type: "f", value: fog.near },
            "fogFar" : { type: "f", value: fog.far },

        },
        vertexShader: document.getElementById( 'vs' ).textContent,
        fragmentShader: document.getElementById( 'fs' ).textContent,
        depthTest: false

    } );

    var plane = new THREE.Mesh( new THREE.Plane( 64, 64 ) );

    for ( i = 0; i < 8000; i++ ) {

        plane.position.x = Math.random() * 1000 - 500;
        plane.position.y = - Math.random() * Math.random() * 200 - 15;
        plane.position.z = i;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

        GeometryUtils.merge( geometry, plane );

    }

    mesh = new THREE.Mesh( geometry, material );
    scene.addObject( mesh );

    mesh = new THREE.Mesh( geometry, material );
    mesh.position.z = - 8000;
    scene.addObject( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) * 0.25;
    mouseY = ( event.clientY - windowHalfY ) * 0.15;

}

function onWindowResize( event ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

    position = ( ( new Date().getTime() - start_time ) * 0.03 ) % 8000;

    camera.position.x += ( mouseX - camera.target.position.x ) * 0.01;
    camera.position.y += ( - mouseY - camera.target.position.y ) * 0.01;
    camera.position.z = - position + 8000;

    camera.target.position.x = camera.position.x;
    camera.target.position.y = camera.position.y;
    camera.target.position.z = camera.position.z - 1000;

    renderer.render( scene, camera );

}

