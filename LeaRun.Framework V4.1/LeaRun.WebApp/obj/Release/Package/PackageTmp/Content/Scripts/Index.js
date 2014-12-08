$(function () {
    setIframeH();
    initStartMenu();
});
//样式
function readyIndex() {
    $(".main_menu li div").click(function () {
        $(".main_menu li div").removeClass('main_menu leftselected');
        $(this).addClass('main_menu leftselected');
    }).hover(function () {
        $(this).addClass("hoverleftselected");
    }, function () {
        $(this).removeClass("hoverleftselected");
    });
    //点击TOP按钮显示标签
    $("#topnav .droppopup a").hover(function () {
        $("#topnav .droppopup a").removeClass('onnav');
        $(this).addClass('onnav');
        var Y = $(this).attr("offsetLeft");
        $(this).find('.popup').show().css('top', ($(this).offset().top + 71)).css('left', $(this).offset().left - ($(this).find('.popup').width() / 2 - 36));
    }, function () {
        $("#topnav .droppopup a").removeClass('onnav');
        $(this).find('.popup').hide();
    });
    $(".popup li").click(function () {
        $('.popup').hide();
    })
}
/*设置iframe高度*/
function setIframeH() {
    resizeU();
    $(window).resize(resizeU);
    function resizeU() {
        var divkuangH = $(window).height();
        $("#ContentPannel").height(divkuangH - 136);
    }
}
function initStartMenu() {
    $('#overlay_startmenu').click(function () {
        if ($('#start_menu_panel:visible').length) {
            $('#overlay_startmenu').hide();
            $('#start_menu_panel').slideUp(1);
            $('.nicescroll-rails').hide();
        }
    });
    $('#start_menu').click(function () {
        if ($('#start_menu_panel:visible').length) {
            $('#overlay_startmenu').hide();
            $('#start_menu_panel').slideUp(1);
            $('.nicescroll-rails').hide();
        }
        //遮罩层位置和显示
        $('#overlay_startmenu').show();
        //菜单面板位置
        var top = $('#start_menu').offset().top - $('#start_menu_panel').outerHeight() - 1;
        $('#start_menu_panel').css({ top: top });
        $('#start_menu_panel').show();
        $('.nicescroll-rails').show();
    });
}
/**安全退出**/
function IndexOut() {
    var msg = "<div class='ui_alert'>确认要退出 LeaRun.信息化快速开发框架？</div>"
    top.$.dialog({
        id: "confirmDialog",
        lock: true,
        icon: "hits.png",
        content: msg,
        title: "力软提示",
        button: [
        {
            name: '退出',
            callback: function () {
                Loading(true, "正在退出系统...");
                window.setTimeout(function () {
                    getAjax("/Login/OutLogin", "", function (data) {
                        window.opener = null;
                        var wind = window.open('', '_self');
                        wind.close();
                    })
                }, 200);
            }
        },
        {
            name: '注销',
            callback: function () {
                Loading(true, "正在注销系统...");
                window.setTimeout(function () {
                    getAjax("/Login/OutLogin", "", function (data) {
                        window.location.href = '/Index.htm';
                    })
                }, 200);
            }
        },
        {
            name: '取消'
        }
        ]
    });
}



//修改密码
function UpdatePassword() {
    var url = "/CommonModule/User/ResetPassword?Type=2";
    openDialog(url, "ResetPassword", "修改密码", 400, 150, function (iframe) {
        top.frames[iframe].AcceptClick();
    });
}
//快捷方式列表
function ShortcutsList() {
    $("#Shortcuts").html('');
    AjaxJson("/Home/ShortcutsListJson", {}, function (DataJson) {
        $.each(DataJson, function (i) {
            $("#Shortcuts").append("<li onclick=\"AddTabMenu('" + DataJson[i].ModuleId + "', '" + DataJson[i].Location + "', '" + DataJson[i].FullName + "',  '" + DataJson[i].Icon + "','true');\"><img src=\"/Content/Images/Icon16/" + DataJson[i].Icon + "\" />" + DataJson[i].FullName + "</li>");
        });
    });
    $(".popup li").click(function () {
        $('.popup').hide();
    })
}
//快捷方式设置
function Shortcuts() {
    var url = "/Home/Shortcuts";
    openDialog(url, "Shortcut", "快捷方式设置", 500, 300, function (iframe) {
        top.frames[iframe].AcceptClick()
    });
}
//页面关闭事件
function PageClose() {
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
        window.location.href = "/Login/OutLogin";
    }
}
//技术支持
function Support() {
    Dialog("/Home/SupportPage", "Support", "7 × 24 技术支持服务", 600, 275);
}
//关于我们
function About() {
    alertDialog("力软信息化系统快速开发框架LR-FDMS<br>版本4.1<br>上海力软信息技术有限公司<br>保留所有权利", 0);
}
//个性化皮肤设置
function SkinIndex() {
    Dialog("/Home/SkinIndex", "SkinIndex", "个性化设置", 580, 350);
}