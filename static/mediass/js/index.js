$(function () {
  var setCaption = function (e) {
    var t = e.$currentPage.find(".caption").html();
    $("#current-caption").html(t).fadeIn(200)
  };

  $("#slider-hp1").anythingSlider(
    {
      appendControlsTo: $(".cap-1"),
      hashTags: !1,
      buildArrows: !1,
      expand: !0,
      playRtl: !1,
      easing: "easeOutCubic",
      startStopped: !0,
      autoPlay: !0,
      delay: 5e3,
      animationTime: 1e3,
      onInitialized: function (t, n) {
        setCaption(n)
      },
      onSlideBegin: function (e, t) {
        $("#current-caption").fadeOut(200)
      },
      onSlideComplete: function (t) {
        setCaption(t)
      },
    }
  );
  var t = function (e) {
    var t = e.$currentPage.find(".name").html();
    $(".ingredient-name").html(t).fadeIn(200)
  };
  $("#slider-hp2").anythingSlider({appendControlsTo: $(".cap-2"), hashTags: !1, expand: !0, easing: "easeOutCubic", buildArrows: !1, startStopped: !0, autoPlay: !1, delay: 5e3, animationTime: 1e3, onInitialized: function (e, n) {
    t(n)
  }, onSlideBegin: function (e, t) {
    $(".ingredient-name").fadeOut(200)
  }, onSlideComplete: function (e) {
    t(e)
  }})
});
