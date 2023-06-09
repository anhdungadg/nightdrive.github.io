/*
Copyright (c) 2021 RockOn HTML Template
------------------------------------------------------------------
[Master Javascript]

Project:	RockOn HTML Template

-------------------------------------------------------------------*/

(function($) {
    "use strict";
    var RockOn = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {

            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }

            /*-------------- RockOn Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.RTL();
            this.Tooltip();
            this.MainSlider();
            this.Menu();
            this.Style_Switcher();
            this.Accordion();
            this.MailFunction();
            this.EventTab();
            this.PageTitleBG();
            this.Player();
            this.TrackSlider();
            this.Popup();
            this.GalleryTab();
            this.OwlSlider();
            this.FooterGrid();
            this.OtherJS();
            this.PreLoader();
            this.PlayListSlider();
            this.navMenu();

        },

        /*-------------- RockOn Functions definition ---------------------------------------------------
        ---------------------------------------------------------------------------------------------------*/
        RTL: function() {
            // On Right-to-left(RTL) add class 
            var rtl_attr = $("html").attr('dir');
            if (rtl_attr) {
                $('html').find('body').addClass("rtl");
            }
        },

        PreLoader: function() {
            jQuery(window).on("load", function() {
                jQuery("#status").fadeOut();
                jQuery("#preloader").delay(350).fadeOut("slow");
            });
        },

        Tooltip: function() {
            // tooltip
            jQuery(function() {
                if ($('[data-toggle="tooltip"]').length > 0) {
                    jQuery('[data-toggle="tooltip"]').tooltip();
                }
            })
        },

        MainSlider: function() {
            //main slider


            var bannerCarousal = $('.banner-carousel .owl-carousel');
            bannerCarousal.owlCarousel({
                margin: 0,
                loop: true,
                items: 1,
                nav: false,
                dots: false,
                // autoplay: true,
                smartSpeed: 1000,
                mouseDrag: false,
                responsive: {
                    0: {
                        autoHeight: true,
                    },
                    600: {
                        autoHeight: true,
                    },
                }

            });


            jQuery(window).on('load', function() {
                //background grid main slider
                $('#ri-grid').gridrotator({
                    rows: 4,
                    columns: 8,
                    maxStep: 2,
                    interval: 2000, // manage interval for grid image rotation 
                    w1024: {
                        rows: 5,
                        columns: 6
                    },
                    w768: {
                        rows: 5,
                        columns: 5
                    },
                    w480: {
                        rows: 6,
                        columns: 4
                    },
                    w320: {
                        rows: 7,
                        columns: 4
                    },
                    w240: {
                        rows: 7,
                        columns: 3
                    },
                });
            });


        },
        Menu: function() {
            // fixed menu on scroll
            var hig = window.innerHeight - 130;
            $(window).bind('scroll', function() {
                if ($(window).scrollTop() > hig) {
                    $('#rock_header').addClass('rock_header_fixed');
                } else {
                    $('#rock_header').removeClass('rock_header_fixed');
                }
            });
            $(window).bind('scroll', function() {
                if ($(window).scrollTop() > 0) {
                    $('#rock_header_otherpage').addClass('rock_header_fixed');
                } else {
                    $('#rock_header_otherpage').removeClass('rock_header_fixed');
                }
            });
            $(window).bind('scroll', function() {
                if ($(window).scrollTop() > hig) {
                    $('#rock_header_single_page').addClass('rock_header_fixed');
                } else {
                    $('#rock_header_single_page').removeClass('rock_header_fixed');
                }
            });

            //active menu on scroll single page
            $(window).scroll(function() {
                var windscroll = $(window).scrollTop();
                if (windscroll >= 100) {
                    $('.rockon_section').each(function(i) {
                        if ($(this).position().top <= windscroll + 10) {
                            $('.rock_menu_single ul li').removeClass('active');
                            $('.rock_menu_single ul li').eq(i).addClass('active');
                        }
                    });
                } else {

                    $('.rock_menu_single ul li').removeClass('active');
                    $('.rock_menu_single ul li:first').addClass('active');
                }
            }).scroll();

        },
        Style_Switcher: function() {
            $("#style-switcher .bottom a.settings").on('click', function(e) {
                e.preventDefault();
                var div = $("#style-switcher");
                if (div.css("left") === "-161px") {
                    $("#style-switcher").animate({
                        left: "0px"
                    });
                } else {
                    $("#style-switcher").animate({
                        left: "-161px"
                    });
                }
            });

            //color change
            $('.colorchange').on('click', function() {
                var color_name = $(this).attr('id');
                var new_style = '../assets/css/color/' + color_name + '.css';
                $('#theme-color').attr('href', new_style);
            });
            //pattern change
            $('.pattern_change').on('click', function() {
                var name = $(this).attr('id');
                var new_style = '../assets/css/pattern/' + name + '.css';
                $('#theme-pattern').attr('href', new_style);
            });

        },
        Accordion: function() {
            //accordion
            jQuery(function($) {
                var $active = $('#accordion .panel-collapse.in').prev().addClass('active');
                $active.find('a').prepend('<i class="glyphicon fa fa-minus"></i>');
                $('#accordion .panel-heading').not($active).find('a').prepend('<i class="glyphicon fa fa-plus"></i>');
                $('#accordion').on('show.bs.collapse', function(e) {
                    $('#accordion .panel-heading.active').removeClass('active').find('.glyphicon').toggleClass('fa fa-plus fa fa-minus');
                    $(e.target).prev().addClass('active').find('.glyphicon').toggleClass('fa fa-plus fa fa-minus');
                })
            });

        },
        MailFunction: function() {
            //contact mail function	
            $('#em_sub').on('click', function() {
                var un = $('#uname').val();
                var em = $('#uemail').val();
                var wsite = $('#web_site').val();
                var meesg = $('#message').val();

                $.ajax({
                    type: "POST",
                    url: "ajaxmail.php",
                    data: {
                        'username': un,
                        'useremail': em,
                        'website': wsite,
                        'mesg': meesg,
                    },
                    success: function(msg) {
                        var full_msg = msg.split("#");
                        if (full_msg[0] == '1') {
                            $('#uname').val("");
                            $('#uemail').val("");
                            $('#web_site').val("");
                            $('#message').val("");
                            $('#err').html(full_msg[1]);
                        } else {
                            $('#uname').val(un);
                            $('#uemail').val(em);
                            $('#web_site').val(wsite);
                            $('#message').val(meesg);
                            $('#err').html(full_msg[1]);
                        }
                    }
                });
            });

            /* booking mail function */
            $('#booking_sub').on('click', function() {
                var book_tn = $('#booking_table_no').val();
                var book_date = $('.booking_date').val();
                var book_fname = $('#booking_fname').val();
                var book_lname = $('#booking_lname').val();
                var book_guest = $('#booking_guest').val();
                var book_female = $('#booking_female').val();
                var book_male = $('#booking_male').val();
                var book_mail = $('#booking_mail').val();
                var book_phone = $('#booking_phone').val();
                var book_instruction = $('#booking_instruction').val();

                $.ajax({
                    type: "POST",
                    url: "book-table.php",
                    data: {
                        'booking_table_no': book_tn,
                        'booking_date': book_date,
                        'booking_fname': book_fname,
                        'booking_lname': book_lname,
                        'booking_guest': book_guest,
                        'booking_female': book_female,
                        'booking_male': book_male,
                        'booking_mail': book_mail,
                        'booking_phone': book_phone,
                        'booking_instruction': book_instruction,
                    },
                    success: function(msg) {
                        var full_msg = msg.split("#");
                        if (full_msg[0] == '1') {
                            $('#booking_table_no').val("");
                            $('.booking_date').val("");
                            $('#booking_fname').val("");
                            $('#booking_lname').val("");
                            $('#booking_guest').val("");
                            $('#booking_female').val("");
                            $('#booking_male').val("");
                            $('#booking_mail').val("");
                            $('#booking_phone').val("");
                            $('#booking_instruction').val("");
                            $('#booking_err').html(full_msg[1]);
                        } else {
                            $('#booking_table_no').val(book_tn);
                            $('.booking_date').val(book_date);
                            $('#booking_fname').val(book_fname);
                            $('#booking_lname').val(book_lname);
                            $('#booking_guest').val(book_guest);
                            $('#booking_female').val(book_female);
                            $('#booking_male').val(book_male);
                            $('#booking_mail').val(book_mail);
                            $('#booking_phone').val(book_phone);
                            $('#booking_instruction').val(book_instruction);
                            $('#booking_err').html(full_msg[1]);
                        }
                    }
                });
            });

        },
        EventTab: function() {
            // event tab
            $('.rock_event_tab > ul').each(function() {
                var $active, $content, $links = $(this).find('a');
                $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
                $active.addClass('active');
                $content = $($active[0].hash);
                $links.not($active).each(function() {
                    $(this.hash).hide();
                });
                $(this).on('click', 'a', function(e) {
                    $active.removeClass('active');
                    $content.hide();
                    $active = $(this);
                    $content = $(this.hash);
                    $active.addClass('active');
                    $content.fadeIn().addClass('animated fadeIn');
                    e.preventDefault();
                });
            });
        },
        DateTimePicker: function() {
            // date time picker	
            var logic = function(currentDateTime) {
                if (currentDateTime) {
                    if (currentDateTime.getDay() == 6) {
                        this.setOptions({
                            minTime: '11:00'
                        });
                    } else
                        this.setOptions({
                            minTime: '8:00'
                        });
                }
            };
            $('#datetimepicker').datetimepicker({
                onChangeDateTime: logic,
                onShow: logic
            });

            // custom select picker
            $('.selectpicker').selectpicker({
                'selectedText': 'cat'
            });

        },
        PageTitleBG: function() {
            //page title background grid	
            $('#rock_page_title_bg').gridrotator({
                rows: 1,
                columns: 8,
                maxStep: 2,
                interval: 2000, // adjust flip interval of page title background grid 

            });
        },
        Player: function() {
            //player
            $('.rock_player').mediaelementplayer({
                alwaysShowControls: true,
                features: ['playpause', 'progress', 'volume'],
                audioVolume: 'horizontal',
                audioWidth: 450,
                audioHeight: 70,
                iPadUseNativeControls: true,
                iPhoneUseNativeControls: true,
                AndroidUseNativeControls: true
            });
        },
        TrackSlider: function() {
            //club track slider
            $('.bxslider-ffoter').bxSlider({
                mode: 'vertical',
                slideMargin: 5,
                minSlides: 4,
                auto: true,
                default: 500,
                controls: false,
                pager: false,
                autoHover: true
            });
        },

        PlayListSlider: function() {
            //play list slider 
            $('.rock_track_playlist_slider').bxSlider({
                mode: 'vertical',
                slideMargin: 0,
                minSlides: 2,
                auto: true,
                default: 500,
                controls: true,
                pager: false,
                autoHover: true,
                nextSelector: '#rock_track_playlist_slider_next',
                prevSelector: '#rock_track_playlist_slider_prev',
                nextText: '<i class="fa fa-angle-up"></i>',
                prevText: '<i class="fa fa-angle-down"></i>'
            });
        },
        Popup: function() {
            // club photo image popup
            $(".fancybox").fancybox({
                openEffect: 'elastic',
                closeEffect: 'elastic',
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            });
        },
        GalleryTab: function() {
            $('.main_gallery_tab > ul').each(function() {
                var $active, $content, $links = $(this).find('a');
                $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
                $active.addClass('active');
                $content = $($active[0].hash);
                $links.not($active).each(function() {
                    $(this.hash).hide();
                });
                $(this).on('click', 'a', function(e) {
                    $active.removeClass('active');
                    $content.hide();
                    $active = $(this);
                    $content = $(this.hash);
                    $active.addClass('active');
                    $content.fadeIn();
                    e.preventDefault();
                });
            });
        },
        OwlSlider: function() {
            // club photo slider
            var rcps_owl = $("#rock_club_photo_slider");
            rcps_owl.owlCarousel({
                items: 3,
                itemsDesktop: [1000, 3],
                itemsDesktopSmall: [900, 1],
                itemsTablet: [600, 1],
                itemsMobile: true,
                nav: true,
                dots: false,
                navText: ['<span class="rock_slider_button prev"><i class="fa fa-angle-left"></i></span>', '<span class="rock_slider_button prev"><i class="fa fa-angle-right" aria-hidden="true"></i></span>']

            });
            // Custom Navigation Events
            $(".owl-next").on('click', function() {
                rcps_owl.trigger('owl.next');
            });
            $(".owl-prev").on('click', function() {
                rcps_owl.trigger('owl.prev');
            });

            //disc jockcy slider 
            var rdjs_owl = $("#rock_disc_jockcy_slider");
            rdjs_owl.owlCarousel({
                items: 4,
                itemsDesktop: [1000, 4],
                itemsDesktopSmall: [900, 3],
                itemsTablet: [600, 2],
                itemsMobile: false,
                autoPlay: true,
                nav: true,
                dots: false,
                navText: ['<span class="rock_slider_button prev"><i class="fa fa-angle-left"></i></span>', '<span class="rock_slider_button prev"><i class="fa fa-angle-right" aria-hidden="true"></i></span>'],
                responsive: {
                    1200: {
                        items: 4,
                    },

                    991: {
                        items: 2,
                    },
                    600: {
                        items: 2,
                    },
                    580: {
                        items: 1,
                    },
                    0: {
                        items: 1,
                    },
                }

            });
            // Custom Navigation Events
            $(".next").on('click', function() {
                rdjs_owl.trigger('owl.next');
            });
            $(".prev").on('click', function() {
                rdjs_owl.trigger('owl.prev');
            });


        },
        FooterGrid: function() {
            $('#ri-grid2').gridrotator({
                rows: 1,
                columns: 8,
                maxStep: 2,
                interval: 2000,

            });
        },

        OtherJS: function() {



            // logo animation
            $('.rock_logo:after').addClass('animated fadeInDownBig');


            //
            var bg_w = window.innerWidth;
            var bg_h = window.innerHeight;
            $('rock_single_page_slider_bg').css('width', bg_w);
            $('rock_single_page_slider_bg').css('height', bg_h);


            // drop down menu
            $('.rock_menu ul li').children('ul').addClass('animated fadeInDown');
            $('.rock_menu ul li ul li').children('ul').addClass('animated fadeInLeft');


            // club photo hover overlay
            $('.rock_club_photo_item').hover(function() {
                $(this).children('.rock_club_photo_overlay').fadeToggle();
            });


            // footer and rock-track
            var track_height = $(".rock_club_track").innerHeight() - 100;
            var half_of_track_height = track_height / 2;
            $('.rock_footer_home').css('margin-top', half_of_track_height);
            $('.rock_footer_home').css('padding-top', half_of_track_height + 30);


            //player poster hover
            $('.rock_audio_player').hover(function() {
                $('.rock_audio_player_track_image_overlay').toggle().addClass('animated fadeInUp');
            });


            //Rockon Club Track share button hover
            $('.rock_share_track').hover(function() {
                var id = $(this).attr('id');
                $('.' + id).show();
                $('.' + id + ' li').addClass('animated fadeInLeft');
            });
            $('.rock_track_playlist ul li .rock_track_detail').mouseleave(function() {
                $('.rock_track_playlist ul li .rock_track_detail .rock_social').hide();
            });


            // sidebar categories dropdown
            $('.rock_categories ul li').on('click', function() {
                $(this).children('ul').slideToggle();
            });

            // book table
            $('.rock_table_1').on('click', function() {
                var existno = $('#booking_table_no').val();
                var id = $(this).attr('id');

                if (existno == '')
                    $('#booking_table_no').val(id);
                else
                    $('#booking_table_no').val(existno + ',' + id);

                $(this).addClass('active');
                $(this).children('.table_overlay').children('p').html('<p>Reserve</p>');
                $(this).children('.table_overlay').children('p').css('margin-left', '-27px');
                $(this).children('.table_overlay').css('cursor', 'not-allowed');
                $('#cls_' + id).css('display', 'block');
            });

            // gallery item click
            $('.main_gallery_item_link').on('click', function() {
                $('.main_gallery_item_popup').each(function() {
                    $(this).hide();
                });
                var shaid = $(this).attr('id');
                $('.' + shaid).slideDown();
            });
            $('.main_gallery_item_popup_close').on('click', function() {
                $('.main_gallery_item_popup').slideUp();
            });

        },





        /*-----------------------------------------------------
        	Fix Mobile Menu 
        -----------------------------------------------------*/
        navMenu: function() {
            /* Menu Toggle */
            $(".menu-btn").on('click', function(event) {
                $(".main-menu, .menu-btn").toggleClass("open-menu");
            });
            $("body").on('click', function() {
                $(".main-menu, .menu-btn").removeClass("open-menu");
            });
            $(".menu-btn, .main-menu").on('click', function(event) {
                event.stopPropagation();
            });

            /* Submenu */

            var w = window.innerWidth;
            if (w <= 1199) {
                $(".main-menu > ul > li").on('click', function(e) {
                    $('.main-menu > ul > li').not($(this)).closest('li').find('.sub-menu').slideUp();
                    $('.main-menu > ul > li').not($(this)).closest('li').removeClass('open');
                    $(this).closest('li').find('.sub-menu').slideToggle();
                    $(this).toggleClass("open");
                });
                $(".sub-menu").on('click', function(event) {
                    event.stopPropagation();
                });
            }

            /* Linking */
            $(function() {
                for (var a = window.location, counting = $(".main-menu > ul > li > a").filter(function() {
                        return this.href == a;
                    }).addClass("active");;) {
                    if (!counting.is(".has-sub-menu")) break;
                    counting = counting.parent().addClass("active");
                }
                // Submenu
                for (var a = window.location, counting = $(".sub-menu a").filter(function() {
                        return this.href == a;
                    }).parent().parent().parent().addClass("active");;) {
                    if (!counting.is(".has-sub-menu")) break;
                    counting = counting.parent().addClass("active");
                }
            });
        },




    };

    RockOn.init();




    function rock_table_close(clsid) {
        $('#' + clsid).removeClass('active');
        $('#cls_' + clsid).css('display', 'none');
        $('#' + clsid).children('.table_overlay').children('p').children('p').html(clsid);
        $('#' + clsid).children('.table_overlay').children('p').children('p').css('margin-left', '5px');
        $(this).children('.table_overlay').css('cursor', 'not-allowed');

        var curval = $('#booking_table_no').val();
        var newclsid = ',' + clsid;
        var newtextval = curval.replace(newclsid, '');
        //console.log(newtextval);
        var clsid1 = clsid + ',';
        var newtextval1 = newtextval.replace(clsid1, '');

        var newtextval2 = newtextval.replace(clsid, '');
        //console.log(newtextval1);

        var newtextval12 = newtextval2.replace(/^,/, '');
        $('#booking_table_no').val(newtextval12);
    }





    // SINLE PAGE SCOLL


    jQuery(function($) {
        var topMenuHeight = $("#desktop-nav").outerHeight();
        $("#desktop-nav").menuScroll(topMenuHeight);
    });

    // COPY THE FOLLOWING FUNCTION INTO ANY SCRIPTS
    jQuery.fn.extend({
        menuScroll: function(offset) {
            // Declare all global variables
            var topMenu = this;
            var topOffset = offset ? offset : 0;
            var menuItems = $(topMenu).find("a");
            var lastId;

            // Save all menu items into scrollItems array
            var scrollItems = $(menuItems).map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

            // When the menu item is clicked, get the #id from the href value, then scroll to the #id element
            $(topMenu).on("click", "a", function(e) {
                var href = $(this).attr("href");

                var offsetTop = href === "#" ? 0 : $(href).offset().top - topOffset;

                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 300);
                e.preventDefault();
            });

            // When page is scrolled
            $(window).scroll(function() {
                var nm = $("html").scrollTop();
                var nw = $("body").scrollTop();
                var fromTop = (nm > nw ? nm : nw) + topOffset;


                // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
                var current = $(scrollItems).map(function() {
                    if ($(this).offset().top <= fromTop)
                        return this;
                });

                // Get the most recent passed section from current array
                current = current[current.length - 1];
                var id = current && current.length ? current[0].id : "";
                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    $(menuItems)
                        .parent().removeClass("active")
                        .end().filter("[href='#" + id + "']").parent().addClass("active");
                }

            });
        }
    });


})(jQuery);