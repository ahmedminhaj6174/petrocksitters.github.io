var testimonials = document.getElementById('testimonials-1');
var control1 = document.getElementById('control1');
var control2 = document.getElementById('control2');
var control3 = document.getElementById('control3');

control1.onclick = function () {
    testimonials.style.transform = "translateX(870px)";
    control1.classList.add("active-controls");
    control2.classList.remove("active-controls");
    control3.classList.remove("active-controls");
}

control2.onclick = function () {
    testimonials.style.transform = "translateX(0px)";
    control1.classList.remove("active-controls");
    control2.classList.add("active-controls");
    control3.classList.remove("active-controls");
}

control3.onclick = function () {
    testimonials.style.transform = "translateX(-870px)";
    control1.classList.remove("active-controls");
    control2.classList.remove("active-controls");
    control3.classList.add("active-controls");
}
