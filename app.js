const tl = gsap.timeline({ defaults: { duration: 0.75, ease: "Power2.out" } });
const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

// Svg line
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
  const input = container.querySelector("input");
  const line = container.querySelector(".elastic-line");
  const label = container.querySelector("label");

  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end, duration: 0.75, ease: "Power2.out" } }
      );
      tl.to(line, { attr: { d: start }, ease: "elastic.out(2, 0.3)" }, "<50%");
      tl.fromTo(
        label,
        { scale: 1, y: 0 },
        { scale: 0.7, y: -17, duration: 0.5 },
        "<50%"
      );
    }
  });
});

form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector("input");
    const line = container.querySelector(".elastic-line");
    const label = container.querySelector("label");

    if (document.activeElement !== input) {
      if (!input.value) {
        tl.to(label, { scale: 1, y: 0, duration: 0.5 });
      }
    }

    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          colorize("#0096c7", label, line);
        } else {
          colorize("red", label, line);
        }
      }
    });

    input.addEventListener("input", (e) => {
      if (e.target.type === "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          colorize("#0096c7", label, line);
        } else {
          colorize("red", label, line);
        }
      }
    });

    input.addEventListener("input", (e) => {
      if (e.target.type === "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          colorize("#0096c7", label, line);
        } else {
          colorize("red", label, line);
        }
      }
    });
  });
});

function validateEmail(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

function validatePhone(phone) {
  let regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return regex.test(phone);
}

function colorize(color, label, line) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(label, { color: color, duration: 0.75 });
}

// Fill checkbox

const checkbox = document.querySelector("#checkbox");
const tl2 = gsap.timeline({ dafaults: { duration: 0.5, ease: "Power2.out" } });

const checkMarkPath = document.querySelector(".tick-mark path");
const pathLength = checkMarkPath.getTotalLength();

gsap.set(checkMarkPath, {
  strokeDashoffset: pathLength,
  strokeDasharray: pathLength,
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    tl2.to(".checkbox-fill ", { top: "0%" });
    tl2.fromTo(
      checkMarkPath,
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 },
      "<50%"
    );
    tl2.to(".checkbox-label", { color: "#0096c7" }, "<");
  } else {
    tl2.to(".checkbox-fill ", { top: "100%" });
    tl2.fromTo(
      checkMarkPath,
      { strokeDashoffset: 0 },
      { strokeDashoffset: pathLength },
      "<50%"
    );
    tl2.to(".checkbox-label", { color: "#adb5bd" }, "<");
  }
});

// Eyes animation

gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scaleY: 1 },
  { scaleY: 0.3, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: "Power2.out" }
);

// Submit button
const button = document.querySelector("button");

const tl3 = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power3.easeOut" },
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  tl3.to(".contact-left, .contact-right", {
    y: 30,
    opacity: 0,
    pointerEvents: "none",
  });
  tl3.to("form", { scale: 0.8 }, "<");
  tl3.fromTo(".submitted", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "<50%");
});
