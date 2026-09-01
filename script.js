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

/* The world map. Present on the home page only. */
const placeCode = document.querySelector("[data-place-code]");
const placeName = document.querySelector("[data-place-name]");
const placeCopy = document.querySelector("[data-place-copy]");
const placePoints = document.querySelectorAll("[data-place]");

if (placeCode && placeName && placeCopy) {
  placePoints.forEach((point) => {
    point.addEventListener("click", () => {
      const place = places[point.dataset.place];
      if (!place) return;

      placePoints.forEach((item) => item.classList.remove("is-active"));
      point.classList.add("is-active");
      placeCode.textContent = place.code;
      placeName.textContent = place.name;
      placeCopy.textContent = place.copy;
    });
  });
}

/* The dispatch index. Every entry is already in the page; this only narrows
   the view. With scripting off the full record reads top to bottom. */
const beatOrder = ["everreach_life", "open_court", "interview", "outside_contact"];
const filterBar = document.querySelector("[data-beat-filter]");
const entries = Array.from(document.querySelectorAll(".dispatch-entry"));
const filterEmpty = document.querySelector("[data-filter-empty]");

if (filterBar && entries.length > 1) {
  const seen = [];
  entries.forEach((entry) => {
    const beat = entry.dataset.beat;
    const section = entry.dataset.section;
    if (!beat || !section) return;
    if (!seen.some((item) => item.beat === beat)) seen.push({ beat, section });
  });

  seen.sort((a, b) => {
    const ai = beatOrder.indexOf(a.beat);
    const bi = beatOrder.indexOf(b.beat);
    return (ai < 0 ? beatOrder.length : ai) - (bi < 0 ? beatOrder.length : bi);
  });

  if (seen.length > 1) {
    const buttons = [];

    const apply = (beat) => {
      let shown = 0;
      entries.forEach((entry) => {
        const match = beat === "all" || entry.dataset.beat === beat;
        entry.hidden = !match;
        if (match) shown += 1;
      });
      buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.filter === beat));
      });
      if (filterEmpty) filterEmpty.hidden = shown > 0;
    };

    const addButton = (value, label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.filter = value;
      button.textContent = label;
      button.setAttribute("aria-pressed", String(value === "all"));
      button.addEventListener("click", () => apply(value));
      filterBar.appendChild(button);
      buttons.push(button);
    };

    addButton("all", "All");
    seen.forEach((item) => addButton(item.beat, item.section));

    filterBar.setAttribute("role", "group");
    filterBar.setAttribute("aria-label", "Filter dispatches by section");
    filterBar.hidden = false;
  }
}

const yearSlot = document.querySelector("[data-year]");
if (yearSlot) yearSlot.textContent = new Date().getFullYear();
