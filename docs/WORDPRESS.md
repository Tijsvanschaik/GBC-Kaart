# WordPress-integratie

Beoogde plaatsing (voorstel, nog niet live): pagina onder `/den-bosch/stadswandeling/` of Projecten.

De WordPress-pagina bevat idealiter:

1. Titel + korte introductie (gewone pagina-inhoud)
2. Ingebedde kaartmodule (iframe)
3. Tekstuele locatielijst / fallback uit `dist/wordpress-fallback-locations.html`

## Hosting

Voorkeur: statische bestanden van `dist/` onder beheer van GBC (HTTPS).

Alternatief: afgesproken externe HTTPS-host die iframe-embedding toestaat.

Deze repository publiceert **niet** zelfstandig naar productie.

## Voorbeeld-iframe

Vervang `MODULE_URL` door de echte HTTPS-URL van de gebouwde module.

```html
<iframe
  id="gbc-map-embed"
  data-gbc-map-embed
  title="Ontdek de Spoorzone — interactieve wandelkaart"
  src="MODULE_URL?embed=1"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  style="width:100%;border:0;min-height:640px;display:block;"
></iframe>
```

- Geen decoratieve rand
- Volle beschikbare breedte
- `?embed=1` voorkomt dubbele sitechrome
- Beginhoogte beperkt verspringen tot de eerste resize-message

## Hoogtehelper

Bestand: `public/gbc-map-embed.js` (na build ook in `dist/gbc-map-embed.js`).

1. Configureer `ALLOWED_CHILD_ORIGINS` op de **module-origin**.
2. Laad het script via thema of goedgekeurde inbouwroute (niet via mediabibliotheek als dat scripts blokkeert).
3. Het script bindt iframes met `id="gbc-map-embed"` of `data-gbc-map-embed`.

Controles in de helper:

- `event.origin` allowlist
- `event.source === iframe.contentWindow`
- berichttype `gbc-map:resize`
- eindige hoogte met onder- en bovengrens

De childmodule stuurt alleen naar geconfigureerde parent-origins in `src/data/settings.ts` (geen productie-`*`).

### Zonder hoogtescript

De iframe blijft op de CSS-`min-height`. Test of mobiele detailtekst niet wordt afgeknipt; vergroot desnoods de vaste hoogte handmatig.

## Origin-configuratie

| Bestand | Wat instellen |
| --- | --- |
| `src/data/settings.ts` → `embed.allowedParentOrigins` | WordPress-origin(s), bijv. `https://greenbusinessclub.nl` |
| `public/gbc-map-embed.js` → `ALLOWED_CHILD_ORIGINS` | Origin van de kaartmodule |

Lokale origins (`localhost` / `127.0.0.1`) zijn alleen voor development.

## Beveiligingsheaders (door webbeheerder te controleren)

Nog **niet** live getest vanuit deze oplevering:

- Mag de WP-omgeving iframes opslaan?
- `Content-Security-Policy` `frame-src` op de hostpagina: module-origin toestaan
- Op de modulehost: `frame-ancestors` die GBC toestaat (responseheader, geen meta-tag)
- Geen blokkerende `X-Frame-Options: DENY/SAMEORIGIN` als cross-origin embed nodig is
- Alleen HTTPS in productie

Iframe ≠ CORS. Voeg geen permissieve CORS-headers toe zonder noodzaak.

### Sandbox

Gebruik `sandbox` alleen bewust. Voor deze module zijn minimaal scripts en same-origin (of passende tokens) nodig; een te strikte sandbox breekt bediening of externe links.

## Wat de webbeheerder doet

1. Host `dist/` op de afgesproken plek.
2. Maak/kies de WP-pagina met intro + iframe + fallback-HTML.
3. Laad `gbc-map-embed.js` met juiste child-origin.
4. Stem menu/Projecten-link af met GBC.
5. Test desktop, mobiel en of hoogte meegroeit na locatieselectie.

## Lokaal oefenen

Zie README: `npm run dev` + `npm run dev:embed-host` (poorten 5173 / 5174).
