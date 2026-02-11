const q = (sel, root = document) => root.querySelector(sel);
const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function initYear() {
  const year = new Date().getFullYear();
  for (const node of qa("[data-year]")) node.textContent = String(year);
}

function normalizePath(pathname) {
  if (!pathname) return "/";
  let p = pathname;
  p = p.split("?")[0].split("#")[0];
  if (p.endsWith("/index.html")) p = p.slice(0, -"/index.html".length) + "/";
  return p;
}

function initActiveNav() {
  const current = normalizePath(window.location.pathname);
  const links = qa("a.nav-link, a.mobile-link");
  for (const link of links) {
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) continue;
    const url = new URL(href, window.location.href);
    const target = normalizePath(url.pathname);
    if (target === current) link.setAttribute("aria-current", "page");
  }
}

function initMobileNav() {
  const toggle = q("[data-nav-toggle]");
  const nav = q("#nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("hidden", !open);
  };

  setOpen(false);

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
initActiveNav();
initMobileNav();
initMailtoForm();
