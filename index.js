//-----------------------------------------------------------------------
//-------------- header ----------------
let nav1 = document.getElementById("nav1");
let nav2 = document.getElementById("nav2");
let logo = document.getElementById("logo");

const header = document.querySelector('header');
const slide = document.querySelector(".observe-me")
var heightOfNavSection = header.getBoundingClientRect().height;

console.log(((window.screen.height) - (heightOfNavSection))+"px")
slide.style.height = ((window.screen.height) - (heightOfNavSection))+"px";

const options = {}

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{
  console.table(entry)
});
},options)

observer.observe(slide)


// window.addEventListener("scroll", () => {
  
//   if ((576 < screen.width )&&(window.scrollY >= 100)) {
//     console.log(window.scrollY + "  " + "  if ");
//     nav1.style.display = "none";
//     nav2.style.display = "none";
//     logo.style.height = "60px";
//   } else {
//     console.log(window.scrollY + "  " + "  else ");
//     nav1.style.display = "block ";
//     nav2.style.display = "block ";
//     logo.style.height = "110px";
//   }
// });

// -----------------------------------------------------------------------
//---------------- slideshow--------------

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n = 1) {
  showSlides((slideIndex += n));
}

// image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";

}
setInterval(plusSlides, 5000);
