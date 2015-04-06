/// <reference path="helpers.ts" />
var $fancybox = $["fancybox"];
var $orderForm = $("#order-form");
var $orderThankyou = $("#order-thankyou");
$orderForm.submit(function (e) {
    e.preventDefault();
    var baseURL = 'https://docs.google.com/forms/d/1z3wH2XmCgic7YggJVYkpLNTnhCwhgFieE2qyoCYiN4E/formResponse';
    var phoneNo = $('#order-phoneno').val();
    var dishId = $("#order-dishid").find("input").val() || $("#order-dishid").val();
    var amount = $('#order-amount').val();
    var note = $('#order-note').val();
    var datetime = $orderForm.find('[name=datetime]').val();
    var okHandler = function () {
        //window.location.replace("ThankYou.html");
        $fancybox.close();
        $fancybox($orderThankyou, {
            autoSize: true
        });
    };
    $.ajax({
        url: baseURL,
        data: {
            entry_613942565: fbUser.first_name,
            entry_503077836: fbUser.last_name,
            entry_1857211771: fbUser.email,
            entry_1734625217: fbUser.id,
            entry_2032980305: phoneNo,
            entry_818666184: dishId,
            entry_1139180800: amount,
            entry_1791757759: datetime,
            entry_242462620: note
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: okHandler,
            200: okHandler
        }
    });
    return false;
});
$orderFormButton
    .click(function (e) {
    e.preventDefault();
    if (fbUser) {
    }
    $fancybox($orderForm, {
        autoSize: true
    });
    return false;
});
$('#order-dishid')["ddslick"]({
    width: 250
});
// different that the previous $('#order-dishid')
$('#order-dishid').find('.dd-selected').html("Choose your dish");
$('#order-dishid').find('.dd-selected-value').val("");
var now = new Date();
var nowRoundTo30Min = new Date(Math.round(now.valueOf() / 1800000) * 1800000);
var hoursFromNow12 = new Date(nowRoundTo30Min.valueOf() + 43200000);
var weekFromNow1 = new Date(nowRoundTo30Min.valueOf() + 604800000);
function getLocalISOString(i) {
    console.log(i);
    var MM, dd, hh, mm;
    var M = i.getMonth() + 1;
    if (M < 10) {
        MM = "0" + M;
    }
    else {
        MM = M.toString();
    }
    var d = i.getDate();
    if (d < 10) {
        dd = "0" + d;
    }
    else {
        dd = d.toString();
    }
    var h = i.getHours();
    if (h < 10) {
        hh = "0" + h;
    }
    else {
        hh = h.toString();
    }
    var m = i.getMinutes();
    if (m < 10) {
        mm = "0" + m;
    }
    else {
        mm = m.toString();
    }
    return i.getFullYear() +
        "-" + MM +
        "-" + dd +
        "T" + hh +
        ":" + mm;
}
$('#order-datetime')
    .attr("min", getLocalISOString(hoursFromNow12))
    .attr("max", getLocalISOString(weekFromNow1))
    .attr("step", 1800);
