/* ビルド・外部ライブラリ不要。記事は data/articles.js から読み込みます。 */
(() => {
  "use strict";
  const script = document.currentScript;
  const root = new URL("../", script.src);
  const config = window.MACHIKADO_CONFIG || {};
  const categories = Array.isArray(config.categories) ? config.categories : [];
  const categoryMap = new Map(categories.map(item => [item.id, item]));
  const rawArticles = Array.isArray(window.MACHIKADO_ARTICLES) ? window.MACHIKADO_ARTICLES : [];
  const local = path => new URL(path, root).href;
  const normalize = value => String(value || "").normalize("NFKC").toLocaleLowerCase("ja-JP");
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function safeArticleURL(article) {
    if (article.articleUrl && !/^([a-z][a-z\d+.-]*:|\/|\\)/i.test(article.articleUrl)) {
      const url = new URL(article.articleUrl, root);
      if (url.href.startsWith(root.href)) return url.href;
    }
    try {
      const url = new URL(article.noteUrl);
      if (url.protocol === "https:" && url.hostname === "note.com") return url.href;
    } catch (_) { /* 不正なURLは表示対象から外します。 */ }
    return null;
  }
  function validDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return false;
    const parsed = new Date(date + "T00:00:00Z");
    return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date;
  }
  const ids = new Set();
  const articles = rawArticles.filter(article => {
    const valid = article && typeof article.id === "string" && !ids.has(article.id) &&
      typeof article.title === "string" && article.title.trim() && validDate(article.date) &&
      categoryMap.has(article.category) && safeArticleURL(article);
    if (valid) ids.add(article.id);
    return valid;
  }).sort((a, b) => b.date.localeCompare(a.date));
  const dateLabel = date => date.replaceAll("-", ".");

  // メニューは、画面幅が変わった場合やEscapeキーでも元に戻ります。
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-navigation");
  if (toggle && nav) {
    const desktop = matchMedia("(min-width: 900px)");
    const setOpen = (open, returnFocus = false) => {
      toggle.setAttribute("aria-expanded", String(open && !desktop.matches));
      toggle.querySelector(".menu-label").textContent = open && !desktop.matches ? "閉じる" : "メニュー";
      nav.hidden = !desktop.matches && !open;
      if (returnFocus && !desktop.matches) toggle.focus();
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
    });
    document.addEventListener("click", event => {
      if (!desktop.matches && !nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    desktop.addEventListener("change", () => setOpen(false));
    setOpen(false);
  }
  if (config.noteUrl) {
    try {
      const note = new URL(config.noteUrl);
      if (note.protocol === "https:" && note.hostname === "note.com") {
        document.querySelectorAll("[data-note-link]").forEach(link => { link.href = note.href; });
      }
    } catch (_) { /* HTMLに書かれた既定リンクを使います。 */ }
  }

  function createCard(article, featured = false) {
    const card = el("article", featured ? "feature-card" : "article-card");
    card.dataset.articleId = article.id;
    const link = el("a", "card-link");
    link.href = safeArticleURL(article);
    const imageFrame = el("div", article.imageIsPlaceholder !== false ? "image-frame is-placeholder" : "image-frame");
    const img = el("img");
    const fallback = local("assets/images/placeholder-town.svg");
    // 画像はサイト内のファイルを使い、外部画像への依存を防ぎます。
    const imagePath = String(article.image || "");
    img.src = /^assets\/images\/[\w./-]+$/.test(imagePath) && !imagePath.includes("..") ? local(imagePath) : fallback;
    img.alt = typeof article.imageAlt === "string" ? article.imageAlt : "";
    img.width = 1200;
    img.height = 800;
    img.loading = featured ? "eager" : "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => { if (img.src !== fallback) img.src = fallback; }, { once: true });
    imageFrame.append(img);
    if (article.imageIsPlaceholder !== false) imageFrame.append(el("span", "image-caption", "写真準備中"));
    const body = el("div", featured ? "feature-body" : "article-body");
    const meta = el("div", "article-meta");
    meta.append(el("span", "category-badge", categoryMap.get(article.category).label));
    const time = el("time", "", dateLabel(article.date));
    time.dateTime = article.date;
    meta.append(time);
    body.append(meta, el("h3", "", article.title), el("p", "", article.description || ""));
    if (!featured && Array.isArray(article.tags) && article.tags.length) {
      const tags = el("div", "tags");
      article.tags.slice(0, 4).forEach(tag => tags.append(el("span", "", "#" + tag)));
      body.append(tags);
    }
    if (article.eventDate && validDate(article.eventDate) && article.eventDate < new Date().toLocaleDateString("sv-SE", {timeZone:"Asia/Tokyo"})) {
      body.append(el("div", "event-note", "過去の開催予定を紹介した記事です"));
    }
    body.append(el("span", "read-label", article.articleUrl ? "記事を読む" : "noteで記事を読む"));
    link.append(imageFrame, body);
    card.append(link);
    return card;
  }
  function fillCards(target, list, featured = false) {
    const fragment = document.createDocumentFragment();
    list.forEach(article => fragment.append(createCard(article, featured)));
    target.replaceChildren(fragment);
  }
  const featured = document.getElementById("featured-articles");
  if (featured) {
    const picks = articles.filter(article => article.featured);
    fillCards(featured, (picks.length ? picks : articles).slice(0, 2), true);
  }
  const latest = document.getElementById("latest-articles");
  if (latest) fillCards(latest, articles.slice(0, 6));
  const themes = document.getElementById("theme-list");
  if (themes) {
    const fragment = document.createDocumentFragment();
    categories.forEach((category, index) => {
      const link = el("a", "theme-link");
      link.href = local("archive.html") + "?category=" + encodeURIComponent(category.id);
      link.append(el("span", "theme-number", String(index + 1).padStart(2, "0")));
      link.append(el("span", "theme-name", category.label));
      link.append(el("small", "", category.description));
      link.append(el("span", "theme-count", articles.filter(article => article.category === category.id).length + " 記事"));
      fragment.append(link);
    });
    themes.replaceChildren(fragment);
  }
  if ((featured || latest) && !articles.length) {
    const notice = document.getElementById("data-notice");
    if (notice) notice.hidden = false;
  }

  const form = document.getElementById("archive-form");
  if (!form) return;
  form.hidden = false;
  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const sort = document.getElementById("sort");
  const results = document.getElementById("archive-results");
  const count = document.getElementById("results-status");
  const empty = document.getElementById("empty-state");
  categories.forEach(item => {
    const option = el("option", "", item.label);
    option.value = item.id;
    category.append(option);
  });
  const params = new URLSearchParams(location.search);
  search.value = params.get("q") || "";
  category.value = categoryMap.has(params.get("category")) ? params.get("category") : "";
  sort.value = params.get("sort") === "oldest" ? "oldest" : "newest";
  function update() {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    const list = articles.filter(article => {
      const haystack = normalize([article.title, article.description, categoryMap.get(article.category).label, ...(article.tags || [])].join(" "));
      return (!category.value || article.category === category.value) && words.every(word => haystack.includes(word));
    });
    if (sort.value === "oldest") list.reverse();
    fillCards(results, list);
    const label = category.value ? categoryMap.get(category.value).label : "すべてのテーマ";
    count.textContent = label + " · " + list.length + " 記事（全 " + articles.length + " 記事）";
    empty.hidden = list.length !== 0;
    const state = new URLSearchParams();
    if (search.value.trim()) state.set("q", search.value.trim());
    if (category.value) state.set("category", category.value);
    if (sort.value === "oldest") state.set("sort", "oldest");
    try { history.replaceState(null, "", location.pathname + (state.size ? "?" + state.toString() : "") + location.hash); } catch (_) { /* file://のプレビューでも表示は継続します。 */ }
  }
  const reset = () => { search.value = ""; category.value = ""; sort.value = "newest"; update(); search.focus(); };
  form.addEventListener("submit", event => { event.preventDefault(); update(); });
  search.addEventListener("input", update);
  category.addEventListener("change", update);
  sort.addEventListener("change", update);
  document.querySelectorAll("[data-reset-filters]").forEach(button => button.addEventListener("click", reset));
  update();
})();
