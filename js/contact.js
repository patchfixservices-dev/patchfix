document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var enquiry = {
    name: document.getElementById("c-name").value.trim(),
    phone: document.getElementById("c-ph").value.trim(),
    email: document.getElementById("c-em").value.trim() || null,
    service: document.getElementById("c-svc").value || null,
    message: document.getElementById("c-msg").value.trim(),
    createdAt: new Date().toISOString()
  };
  try {
    var all = JSON.parse(localStorage.getItem("patchfix_enquiries") || "[]");
    all.push(enquiry);
    localStorage.setItem("patchfix_enquiries", JSON.stringify(all));
  } catch (err) {}
  this.hidden = true;
  document.getElementById("c-success").hidden = false;
});
