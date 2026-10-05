import { homePath, routes, systemPath, type Locale, type NavKey } from "./config";
import { systems } from "./content/systems";

export function switchPath(current: string, from: Locale, to: Locale) {
  const path = current.replace(/\/$/, "") || "/";
  if (from === to) return path === "/" ? homePath(to) : path;

  for (const key of Object.keys(routes[from]) as NavKey[]) {
    const fromPage = routes[from][key].replace(/\/$/, "") || "/";
    if (path === fromPage) return routes[to][key];
  }

  const workPrefix = from === "pt" ? "/trabalhos/" : "/en/work/";
  if (path.startsWith(workPrefix)) {
    const slug = path.slice(workPrefix.length);
    const match = systems.find((s) => s.slugs[from] === slug);
    if (match) return systemPath(match.slugs, to);
    return routes[to].work;
  }

  return homePath(to);
}
