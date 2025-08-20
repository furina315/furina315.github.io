document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".agree-rule");
  const commentSection = document.getElementById("post-comment");
  const agreementWrapper = document.getElementById("agreement-wrapper");

  if (checkboxes.length > 0 && commentSection && agreementWrapper) {
    function checkAllAgreed() {
      let allChecked = true;
      checkboxes.forEach(function (checkbox) {
        if (!checkbox.checked) {
          allChecked = false;
        }
      });

      if (allChecked) {
        commentSection.style.display = "block";
        // You can add a smooth transition effect here if you like
        commentSection.style.opacity = "0";
        setTimeout(() => {
          commentSection.style.transition = "opacity 0.5s ease-in-out";
          commentSection.style.opacity = "1";
        }, 10);
      } else {
        commentSection.style.opacity = "0";
        setTimeout(() => {
          commentSection.style.display = "none";
        }, 500); // Wait for the transition to finish
      }
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", checkAllAgreed);
    });

    // Initial check when the page loads
    checkAllAgreed();
  }
});
