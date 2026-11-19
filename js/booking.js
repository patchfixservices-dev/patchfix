(function () {
  var state = { service: "", serviceName: "", step: 1 };
  var $ = function (id) { return document.getElementById(id); };
  var cards = document.querySelectorAll(".choice-card");
  var step1 = $("step1"), step2 = $("step2");
  var next = $("btn-next"), back = $("btn-back"), submit = $("btn-submit"), hint = $("hint"), err = $("form-error");

  function select(slug) {
    state.service = slug;
    cards.forEach(function (c) {
      var on = c.dataset.slug === slug;
      c.classList.toggle("selected", on);
      if (on) state.serviceName = c.dataset.name;
    });
    refresh();
  }
  cards.forEach(function (c) { c.addEventListener("click", function () { select(c.dataset.slug); }); });

  var preset = new URLSearchParams(location.search).get("service");
  if (preset) select(preset);

  function val(id) { return $(id).value.trim(); }
  function valid() {
    if (state.step === 1) return !!(state.service && val("f-specific"));
    return !!(val("f-problem") && val("f-name") && val("f-phone") && val("f-address") &&
              val("f-city") && val("f-pin") && val("f-date") && val("f-time"));
  }
  function refresh() {
    var ok = valid();
    next.disabled = !ok; submit.disabled = !ok;
    hint.style.display = ok ? "none" : "";
  }
  document.querySelectorAll("input, textarea, select").forEach(function (el) {
    el.addEventListener("input", refresh); el.addEventListener("change", refresh);
  });

  function go(n) {
    state.step = n;
    step1.hidden = n !== 1; step2.hidden = n !== 2;
    back.hidden = n !== 2; next.hidden = n !== 1; submit.hidden = n !== 2;
    $("p2").classList.toggle("active", n === 2);
    err.textContent = "";
    refresh();
  }
  next.addEventListener("click", function () { if (valid()) go(2); });
  back.addEventListener("click", function () { go(1); });

  submit.addEventListener("click", function () {
    if (!valid()) return;
    var booking = {
      bookingCode: "PX-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      status: "New",
      service: state.serviceName,
      specificService: val("f-specific"),
      problem: val("f-problem"),
      fullName: val("f-name"),
      phone: val("f-phone"),
      email: val("f-email") || null,
      address: val("f-address"),
      city: val("f-city"),
      pincode: val("f-pin"),
      preferredDate: val("f-date"),
      preferredTime: val("f-time"),
      notes: val("f-notes") || null,
      createdAt: new Date().toISOString()
    };
    try {
      localStorage.setItem("patchfix_last_booking", JSON.stringify(booking));
      var all = JSON.parse(localStorage.getItem("patchfix_bookings") || "[]");
      all.push(booking);
      localStorage.setItem("patchfix_bookings", JSON.stringify(all));
    } catch (e) {
      err.textContent = "Couldn’t save your request in this browser. Please call us instead.";
      return;
    }
    location.href = "booking-confirmation.html";
  });

  refresh();
})();
