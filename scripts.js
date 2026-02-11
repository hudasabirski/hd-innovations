const q = (sel, root = document) => root.querySelector(sel);
const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function initYear() {
  const year = new Date().getFullYear();
  for (const node of qa("[data-year]")) node.textContent = String(year);
}

function initMobileNav() {
  const toggle = q(".nav-toggle");
  const nav = q("#nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function initStickyHeader() {
  const header = q(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.dataset.stuck = window.scrollY > 8 ? "true" : "false";
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const nodes = qa("[data-reveal]");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.12 }
  );

  nodes.forEach((n) => obs.observe(n));
}

function initMailtoForm() {
  const form = q("[data-mailto-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) return;

    const subject = `HD Innovations inquiry — ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent from hd-innovations website`;

    const href = `mailto:hudasphotographer@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
    window.location.href = href;
  });
}

initYear();
initMobileNav();
initStickyHeader();
initReveal();
initMailtoForm();

