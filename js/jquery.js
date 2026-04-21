$(function () {
  $(".accordion-content").hide();

  // open first
  $(".accordion-item:first .accordion-content").show();
  $(".accordion-item:first .icon").addClass("rotate");

  $(".accordion-header").click(function () {
    const content = $(this).next(".accordion-content");
    const isOpen = content.is(":visible");

    $(".accordion-content").slideUp(300);
    $(".accordion-header .icon").removeClass("rotate");

    if (!isOpen) {
      content.slideDown(300);

      const icon = $(this).find(".icon");

      // 🔥 delay ensures animation is visible
      setTimeout(() => {
        icon.addClass("rotate");
      }, 10);
    }
  });
});
