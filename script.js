const places = {
  spire: {
    code: "Seat // SP-01",
    name: "Alliance Spire",
    copy: "The clan seat and Artemis's home. Its halls hold the council chamber, private quarters, archives, workshops, gardens, and rooms kept ready for members not yet arrived.",
  },
  memory: {
    code: "Sanctuary // MG-05",
    name: "Memory Grove",
    copy: "A living archive beneath luminous trees. Memories may be kept here without becoming chains, and every member decides which parts of a life belong to the Circle.",
  },
  court: {
    code: "Duel ground // OC-03",
    name: "The Open Court",
    copy: "A place for consent, challenge, and practice beneath the sky. The court records no permanent victor. It exists so everyone who enters can leave changed.",
  },
  gates: {
    code: "Passage // WG-08",
    name: "The World Gates",
    copy: "Gateways from Everreach into the worlds where NHA meets others. No gate opens by command alone. Passage begins with the choice to cross it.",
  },
};

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

document.body.classList.add("is-ready");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });
});

document.querySelectorAll("[data-place]").forEach((point) => {
  point.addEventListener("click", () => {
    const place = places[point.dataset.place];
    if (!place) return;

    document.querySelectorAll("[data-place]").forEach((item) => item.classList.remove("is-active"));
    point.classList.add("is-active");
    document.querySelector("[data-place-code]").textContent = place.code;
    document.querySelector("[data-place-name]").textContent = place.name;
    document.querySelector("[data-place-copy]").textContent = place.copy;
  });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
