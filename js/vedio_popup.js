jQuery("document").ready(function() {
    var youtubeVideo = {
        videoBtn:'[data-videourl]',
    
        model: function() {
    
            function videoinit() {
                $('body').on('click', youtubeVideo.videoBtn, function(event) {
                    event.preventDefault();
                    var videoSrc = $(this).data('videourl');
                  
                    var ID = '';
                    var url = videoSrc.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                    if (url[2] !== undefined) {
                        ID = url[2].split(/[^0-9a-z_\-]/i);
                        ID = ID[0];
                    } else {
                        ID = url;
                    }
    
                    var videoElement = $('<div class="video-popup-model">' + '<div class="video-layer">' + '<div class="video-model-close-layer">' + '</div>' + '<div class="model-wrapper">' + '<div class="videomodel">' + '<div class="videoscreen">' + '<iframe width="100%" height="auto" class="videlement"' + 'src="https://www.youtube.com/embed/' + ID + '?rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1' + '" frameborder="0"' + 'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' + 'allowfullscreen></iframe>' + '</div>' + '<div class="modelCloseBtn">' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>');
    
                    $('body').prepend(videoElement);
                    var videoWidth = $('.video-popup-model .videlement').width();
                    var videHeight = (9 / 16) * videoWidth;
                    $('.video-popup-model .videlement').height(videHeight);
                    $('body').find('.video-popup-model').addClass('smooth_show');
                });
            }
            videoinit();
    
            function modelClose() {
                $('body').on('click', '.modelCloseBtn', function(event) {
                    var model = $(this).parents('.video-popup-model')
                    model.removeClass('smooth_show');
                    setTimeout(function() {
                        model.remove();
                    }, 500);
                    $('body').removeClass('no-reload');
                });
            }
            modelClose();
    
            function modelLayerClose() {
                $('body').on('click', '.video-model-close-layer', function(event) {
                    $(".modelCloseBtn").trigger('click');
                });
            }
            modelLayerClose();
        },
        init: function() {
            youtubeVideo.model();
        }
    };
    
    youtubeVideo.init();
});