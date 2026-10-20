# Contentbeheer (CFTF)

Versie 1 heeft **geen CMS**. Wijzigingen gaan via bestanden → controle → build → publicatie.

## Waar pas je wat aan?

| Wat | Bestand |
| --- | --- |
| Locatienamen, thema’s, teksten, links, foto’s | `src/data/locations.ts` |
| Routevolgorde, kaartmodus, geverifieerde afstand/tijd/URL | `src/data/route.ts` |
| Titel, intro, instructie, conceptbanner | `src/data/content.ts` |
| Toegestane parent-origins voor iframe-hoogte | `src/data/settings.ts` |
| Schematische tekening | `src/map/schematicSvg.ts` |

## Unieke locaties vs. routevolgorde

- Unieke markers: `avans`, `westerpark`, `willemspoort`
- Programmavolgorde: `avans → westerpark → willemspoort → avans`
- Avans is **één** marker (start én finish). Voeg geen tweede Avans-locatie toe.

## Bronzekerheid

In `route.ts`:

- `verifiedDistanceMeters`, `verifiedWalkingMinutes`, `verifiedRouteUrl` → alleen vullen na controle van de gekozen route.
- `sourceIndication` → historische brongetallen (bijv. 2200 m). **Niet** naar de publieke UI kopiëren zolang `verifiedForSelectedRoute` false is.
- `mapMode: "schematic"` → conceptkaart. Zet pas op `"geographic"` met echte `geometry` en geverifieerde stops.

In `locations.ts`:

- `coordinates: null` wanneer de stop niet bevestigd is.
- `geoVerification: "verified-stop"` mag alleen met echte coördinaten.
- `schematicAnchor` is een tekenpositie in de SVG, **geen** WGS84.

## Foto’s en links

- Foto alleen met bekende rechten; vul `alt` en `rights`.
- Externe links alleen `https://`.
- Geen navigatieknop “Volg de wandelroute” zonder `verifiedRouteUrl`.
- Bron-URL Willemspoort (Heijmans) staat als commentaar bij de locatie; zet pas in `externalLink` na bereikbaarheidscontrole.

## Publicatiewerkwijze

1. Pas data aan.
2. `npm run test` en visueel controleren (`npm run dev`).
3. `npm run build`.
4. Deploy `dist/` via de afgesproken GBC-hostingroute.
5. Werk WordPress-fallback bij met `dist/wordpress-fallback-locations.html` indien gebruikt.

## Voorkom verwarring met bronmateriaal

- Geen evenementdatum 20 mei als actuele uitnodiging.
- Geen persoonsnamen of interne planning in publieke teksten.
- Geen afstand/looptijd tonen tot ze bij déze stopselectie gecontroleerd zijn.
