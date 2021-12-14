# Accountable Raso

## App Structure

The App essentially consists of a multi-step form connected to a wrapper over the ELSTER API

It uses a traditional React app structure of:

- public
  Favicon
  public docs (pdfs etc)
  index.html file
  robots.txt
  Logos
- src
  components
  pages
  res
  settings
  data-layer
  App.js etc

environment files (package.json etc)

## Components

All Component folders are in PascalCase with the main export being a default from the `index.js` file.

Some bespoke components derived from or related to the main one may also be present as named exports in their own file.

Individual CSS files are included in each component folder

`hooks` → Contains reusable logic for browser APIs & `useLocalState` for managing each form screen state. (Autosaving, persisting all data entered, updating, etc.)

## Pages

Contains page level components for use with React Router

1. `index`: Main Raso page with multi-step form
2. `success`: Success page for B in A|B Test _(likely to be depreciated)_
3. `test`: Used for testing components in isolation → _Only active in dev_

## Res

App library for

1. Utils
2. Form data
3. Fonts
4. Locales (translation files)
5. Analytics

## ‼️ Settings

Configuration for analytics and environment URLs

1. If a new staging domain is needed, please change URLs & appropriate regexes here first. Vercel is currently being used. [Docs](https://vercel.com/docs)
2. Depending on your setup, a local instance of the `wpUrl` may be needed. For further instructions:

[Install website locally using local ](https://www.notion.so/Install-website-locally-using-local-3cb7fc3889ad4c7db744d30ef8c1053a)

## Data Layer (state)

Divided into 3 domains:

- User Testing
  Responsible for the logic related to A|B testing.
  Values should be pulled from the URL query string to allow for ad campaigns to set test groups
- User Interaction
  Responsible for interaction tracking, and general UX values as the users progress through the form.
- User Data
  The resulting form values the user enters. Divided into each screen → `personalFields`, `businessFields`, `taxInfoFields`, `taxEstimateFields`, `bankAccountFields`, `reviewFields`, `manageTaxes`,

## App Environment

[Repo](https://bitbucket.org/accountableapp/accountable-raso/)

[Pipelines are configured for a prod deployment](https://bitbucket.org/accountableapp/accountable-raso/addon/pipelines/home#!/results/page/1)

[i18nnext](https://react.i18next.com/) is used for translations

A jsconfig.json is used to allow for clean imports
