# Testoverzicht

Ingevuld tijdens de bouwfase. Geen claims over live WordPress-headers.

## Bundelgrootte (productiebuild)

| Bestand | Raw | Gzip |
| --- | --- | --- |
| JS | ~21 kB | ~6,9 kB |
| CSS | ~7,4 kB | ~2,2 kB |

Ruim onder de richtwaarde van 200 kB gecomprimeerd (excl. optionele beelden).

## Uitgevoerd

| Check | Resultaat |
| --- | --- |
| `npm run test` (datavalidatie) | OK — 3 locaties, route avans→westerpark→willemspoort→avans, schematic |
| `npm run typecheck` | OK |
| `npm run build` | OK |
| `npm run test:build-subdir` | OK — geen absolute `/assets/`-paden |
| `npm run test:ui` (Playwright) | OK — marker/lijstselectie, reset, geen gelekte bronafstand/-tijd |
| Desktop / mobiel / embed screenshots | Vastgelegd onder artifacts |
| Cross-origin iframe-host `5174`→`5173` | Kaart laadt; selectie in iframe werkt |
| Conceptbanner zichtbaar | Ja |
| Eén Avans-marker; start/finish in volgorde | Ja |
| Geen afstand/looptijd/navigatie uit bronindicatie | Ja |
| Heijmans-URL als CTA | Niet opgenomen — omgeving kreeg HTTP 403; opnieuw toevoegen na controle |

## Niet uitgevoerd / buiten bereik

| Check | Reden |
| --- | --- |
| Live WordPress-iframe op greenbusinessclub.nl | Geen WP-toegang / geen publicatie in scope |
| Productie CSP / frame-ancestors | Hosting nog niet gekozen |
| Exacte GPS-stopverificatie ter plaatse | Gegevens ontbreken; conceptkaart |
| Breed screenreader-onderzoek (meerdere AT’s) | Beperkt tot semantiek, focus, aria-live |

## Resterende beperkingen

- Kaart is een **schematisch concept**, geen navigatiekaart.
- Coördinaten en routegeometrie zijn `null`.
- Geen locatiefoto’s (geen rechtenvaste assets aangeleverd).
- Externe projectlink Willemspoort nog niet als publieke knop.
