let topoffset=$('#about').offset().top
$(window).on('scroll',function(){
    let wscroll=$(window).scrollTop();
    if(wscroll>topoffset-60){
        $('.navbar').css({cssText:"background-color:rgb(200,100,70) !impotant"})
    } else{
        $('.navbar').css({backgroundColor:"transparent"})
    }
})