var slideIndex = [1, 1];
/* Class the members of each slideshow group with different CSS classes */
var slideId = ["mySlides1", "mySlides2"];

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function currentSlide(n, no) {
  showSlides(n, no);
}

function showSlides(n, no) {
  console.log("showSlides - n=" + n + ", no=" + no);
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("espn-prev");
  // onClick's logic below:
  link.addEventListener("click", function() {
    plusSlides(-1, 0);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("espn-next");
  // onClick's logic below:
  link.addEventListener("click", function() {
    plusSlides(1, 0);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("yahoo-prev");
  // onClick's logic below:
  link.addEventListener("click", function() {
    plusSlides(-1, 1);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("yahoo-next");
  // onClick's logic below:
  link.addEventListener("click", function() {
    plusSlides(1, 1);
  });
});

$(function() {
  console.log("ready!");
  showSlides(1, 0);
  showSlides(1, 1);
});
