export type Locale = "pt" | "en";

export const locales = {
  pt: { html: "pt-BR", path: "", switchLabel: "EN", switchTo: "en" as const },
  en: { html: "en", path: "/en", switchLabel: "PT", switchTo: "pt" as const },
};

export const owner = {
  name: "Leonardo Mitsuo Fukuda",
  given: "Leonardo",
  middle: "Mitsuo",
  family: "Fukuda",
  github: "https://github.com/mitsuoleo",
  /** Fill before going public. Empty strings are omitted from contact surfaces. */
  email: "mitsuodeveloper@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardofukuda/",
  /** Public resume PDF. */
  cv: "/cv.pdf",
  lab: "SYSTEMS LAB",
  coords: "23.55°S 46.63°W",
};

export const routes = {
  pt: {
    home: "/",
    work: "/trabalhos",
    profile: "/perfil",
    contact: "/contato",
    resume: "/curriculo",
  },
  en: {
    home: "/en/",
    work: "/en/work",
    profile: "/en/profile",
    contact: "/en/contact",
    resume: "/en/resume",
  },
} as const;

export type NavKey = keyof typeof routes.pt;

export function pagePath(key: NavKey, locale: Locale) {
  return routes[locale][key];
}

export function systemPath(slugs: { pt: string; en: string }, locale: Locale) {
  return locale === "pt" ? `/trabalhos/${slugs.pt}` : `/en/work/${slugs.en}`;
}

export function homePath(locale: Locale) {
  return pagePath("home", locale);
}
