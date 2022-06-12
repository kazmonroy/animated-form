const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });

// Line

const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//  Elastic
containers.forEach((container) => {
  const input = container.querySelector("input");
  const line = container.querySelector(".elastic-line");
  const label = container.querySelector("label");

  input.addEventListener("focus", () => {
    //check if input if empty
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, duration: 0.75, ease: "Power2.out" }
      );
      tl.to(line, { attr: { d: start }, ease: "elastic.out(2, 0.3)" }, "<50%");

      //Label shift
      tl.to(
        label,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<40%"
      );
    }
  });
});

// Revert line to initial position

form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector("input");
    const line = container.querySelector(".elastic-line");
    const label = container.querySelector("label");

    if (document.activeElement !== input) {
      if (!input.value) {
        tl.to(label, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }

    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          // Colorize
          colorize("#0096c7", line, label);
        } else {
          colorize("red", line, label);
        }
      }

      // Email validation

      if (e.target.type === "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          // Colorize
          colorize("#0096c7", line, label);
        } else {
          colorize("red", line, label);
        }
      }

      // Phone validation

      if (e.target.type === "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          // Colorize
          colorize("#0096c7", line, label);
        } else {
          colorize("red", line, label);
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

//Colorize
function colorize(color, line, label) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(label, { color: color, duration: 0.75 });
}

// Checkbox animation fill

