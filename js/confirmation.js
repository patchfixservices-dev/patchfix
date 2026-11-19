(function () {
  var b = null;
  try { b = JSON.parse(localStorage.getItem("patchfix_last_booking")); } catch (e) {}
  if (!b) {
    document.getElementById("conf-root").innerHTML =
      '<p class="kicker">No request found</p><h1>Nothing to<br><em>show yet.</em></h1>' +
      '<p class="confirmation-lede">We couldn’t find a recent service request in this browser.</p>' +
      '<a href="book.html" class="button button-primary">Book a service</a>';
    return;
  }
  var first = b.fullName.split(" ")[0];
  document.getElementById("conf-lede").textContent =
    "Thank you, " + first + ". Your Patchfix request has been submitted. Keep this reference handy if you call us.";
  document.getElementById("c-code").textContent = b.bookingCode;
  document.getElementById("c-service").textContent = b.service + " · " + b.specificService;
  document.getElementById("c-date").textContent = b.preferredDate;
  document.getElementById("c-time").textContent = b.preferredTime;
  document.getElementById("c-phone").textContent = b.phone;
})();
