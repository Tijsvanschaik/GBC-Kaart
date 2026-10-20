# Ontdek de Spoorzone

Interactieve, geïllustreerde wandelkaart voor **Green Business Club Den Bosch Spoorzone**.

Lichte frontendmodule (Vite + TypeScript + CSS + SVG). Geen CMS, database of runtime-backend. Inhoud beheert CFTF via gegevensbestanden in de repository.

## Lokaal starten

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173/

- Standalone: `/`
- Embedmodus: `/?embed=1`

### Cross-origin iframe-testhost

Terminal 1: `npm run dev` (kaart op poort 5173)  
Terminal 2: `npm run dev:embed-host` (testhost op poort 5174)

Open http://127.0.0.1:5174/

## Testen

```bash
npm run test          # gegevensvalidatie
npm run typecheck
npm run build
npm run test:build-subdir   # productiebuild met genest basispad
```

Preview van de build:

```bash
npm run preview
```

## Bouwen en subpad

Standaardbuild gebruikt relatieve assetpaden (`base: './'`), zodat de module ook onder een onbekend subpad kan draaien.

```bash
npm run build
npm run build:subdir   # voorbeeld: /den-bosch/stadswandeling/kaart/
```

De build schrijft ook `dist/wordpress-fallback-locations.html` (zelfde contentbron).

## Architectuur (kort)

| Onderdeel | Locatie |
| --- | --- |
| Locaties | `src/data/locations.ts` |
| Route + bronzekerheid | `src/data/route.ts` |
| Publieke teksten | `src/data/content.ts` |
| Embed-origins | `src/data/settings.ts` |
| Schematische SVG | `src/map/schematicSvg.ts` |
| Host-hoogtescript | `public/gbc-map-embed.js` |

Kaartmodus staat op **schematic**: exacte stopposities en voetpaden zijn nog niet gecontroleerd. Zie `docs/`.

## Documentatie

- [Contentbeheer](docs/CONTENT.md)
- [WordPress-integratie](docs/WORDPRESS.md)
- [Publicatiechecklist](docs/PUBLICATIECHECKLIST.md)
- [Testoverzicht](docs/TESTOVERZICHT.md)

## Scope versie 1

Wel: interactieve ontdekkaart, drie unieke locaties, lijst + paneel, embed + hoogtecommunicatie, onderhoudbare data.

Niet: CMS, GPS-navigatie, accounts, analytics, WordPress-plugin, live publicatie door deze repo alleen.
