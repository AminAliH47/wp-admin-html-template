/**
 * @author      Tayfun Erbilen
 * @web         http://erbilen.net
 * @mail        tayfunerbilen@gmail.com
 */
$(function() {

    $('.box >h3').append('<button type="button" class="toggle"><span class="fa fa-caret-up"></span></button>');

    $(document).on('click', 'button.toggle', function(e) {
        var id = $(this).closest('.box').attr('id');
        $(this).parent().next().toggle();
        if ($('.fa', this).hasClass('fa-caret-up')) {
            $('.fa', this).removeClass('fa-caret-up').addClass('fa-caret-down');
            if (id != 'undefined') {
                localStorage.setItem('box_' + id, true);
            }
        } else {
            $('.fa', this).removeClass('fa-caret-down').addClass('fa-caret-up');
            if (id != 'undefined') {
                delete localStorage['box_' + id];
            }
        }
        e.preventDefault();
    });

    function checkToggle() {
        $.each(localStorage, function(key, val) {
            if (!key.indexOf('box_')) {
                $('#' + (key.replace('box_', '')) + ' .toggle').trigger('click');
            }
        });
    }

    checkToggle();

    $('.cosidebar >ul >li:not(.line)').hover(function() {
        if (!$('.sub-menu:visible', this).length) {
            $('.dropdown-menu', this).show();
            $(this).addClass('hover');
        }
    }, function() {
        $('.dropdown-menu', this).hide();
        $(this).removeClass('hover');
    });

    $('[dropdown] >li').hover(function() {
        $('ul', this).show();
        $(this).addClass('active');
    }, function() {
        $('ul', this).hide();
        $(this).removeClass('active');
    });

    $('.cosidebar >ul >li').each(function() {
        if ($('.sub-menu', this).length) {
            var html = $('.sub-menu', this).html();
            $(this).append('<ul dropdown class="dropdown-menu">' + html + '</ul>');
        }
    });

    $('.collapse-menu').on('click', function(e) {
        const direction = getComputedStyle(document.querySelector('body')).direction

        if (direction === "ltr") {
            $('.cosidebar').toggleClass('fix');
            if ($('.fa', this).hasClass('fa-chevron-circle-left')) {
                $('.cosidebar >ul >li.active .sub-menu').hide();
                $('.fa', this).removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
                localStorage.setItem('cosidebar', true);
            } else {
                $('.fa', this).removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
                $('.cosidebar >ul >li.active .sub-menu').show();
                delete localStorage['cosidebar'];
            }
            e.preventDefault();
        } else {
            $('.cosidebar').toggleClass('fix');
            if ($('.fa', this).hasClass('fa-chevron-circle-right')) {
                $('.cosidebar >ul >li.active .sub-menu').hide();
                $('.fa', this).removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
                localStorage.setItem('cosidebar', true);
            } else {
                $('.fa', this).removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
                $('.cosidebar >ul >li.active .sub-menu').show();
                delete localStorage['cosidebar'];
            }
            e.preventDefault();
        }
    });

    function cosidebarCheck() {
        if (localStorage.getItem('cosidebar')) {
            $('.cosidebar .collapse-menu').trigger('click');
        }
    }

    cosidebarCheck();

    if ($('#editor').length) {
        CKEDITOR.replace('editor');
    }

});

const multipleSelect = document.getElementById("multiple-select");

if (multipleSelect) {
    multipleSelect.addEventListener('change', (el) => {
        if (el.target.checked) {
            document.querySelectorAll("input[name=table-check]").forEach((item) => {
                item.checked = true;
            })
        } else {
            document.querySelectorAll("input[name=table-check]").forEach((item) => {
                item.checked = false;
            })
        }
    })
}

window.addEventListener('load', () => {
    const categoryContainer = document.getElementById("category-container");
    if (categoryContainer) {

        let cli = categoryContainer.querySelectorAll('li');
        if (cli.length > 10) {

            let div = document.createElement("div");
            let label = document.createElement("label");
            label.setAttribute('for', 'search-cat');
            label.innerText = "Search Category";
            div.appendChild(label);
            let searchCat = document.createElement("input");
            searchCat.type = "text";
            searchCat.id = "search-cat";
            searchCat.classList.add("mb-3");
            div.append(searchCat);
            document.querySelector(".category-container").before(div);

            let input, filter, ul, li, clabel, txtValue;

            let labels = $("#category-container label");

            searchCat.addEventListener('keyup', (el) => {
                let val = (el.target.value).toLowerCase();
                if (val == "") {
                    labels.parent().show();
                } else {
                    labels.each(function() {
                        var label = $(this); // cache this
                        var text = label.text().toLowerCase();
                        if (text.indexOf(val) > -1) {
                            label.parents('li').show() // show all li parents up the ancestor tree
                        } else {
                            label.parent().hide(); // hide current li as it doesn't match
                        }
                    });
                }

            })
        }
    }
})