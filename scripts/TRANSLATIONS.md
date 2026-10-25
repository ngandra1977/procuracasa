# Website languages

Portuguese remains the source language and keeps its existing URLs. English,
French, German and Spanish use `/en`, `/fr`, `/de`, `/es` prefixes. Public pages
are rendered on the server in the selected language; forms and calculators use
the same versioned dictionary through a client context. The language switcher
keeps the current route. Administration and APIs are not localized.

`src/lib/i18n/*.json` contains generated translations, reviewed for branding and
main headings. The public language bar discloses automatic translation. Fiscal
rules, numerical calculations and stored enum values remain Portuguese.

To update public copy translations:

1. Refresh `scripts/property-translation-sources.json` with the current published
   property IDs, titles, descriptions, locations and statuses. Do not add drafts,
   secrets, enquiries or personal records. This file contains public listing copy.
2. Run `node scripts/extract-translations.cjs`.
3. Run `python scripts/translate-site.py` with network access. This sends only
   public source text to Google's translation service at generation time. There
   is no translation service request or API key in the visitor's browser or on
   the production request path. Generation is best-effort; checked-in dictionaries
   keep the website independent of provider availability.
4. Run `python scripts/review-translations.py` and review new translations,
   particularly legal wording, licensing claims and property facts.
5. Run `npm test` and `npm run build -- --webpack`.

New or edited listing copy without a dictionary entry stays in Portuguese.
The property page labels an untranslated description as the Portuguese original.
The numerical price, area, status and contact details remain live database data.
Do not imply that missing translations or automatic translations were manually
validated by a professional translator.

The sitemap and canonical/hreflang metadata enumerate all five languages.
Fixtures used for local tests must not be published as actual listings.
