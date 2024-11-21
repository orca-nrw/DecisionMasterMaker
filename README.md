# DecisonMasterMaker
Make DecisionMasters with ease!

This is a Rails 7, TailwindCSS, Hotwire and React powered web app that lets
users create, preview and export content for DecisionMaster.

## Dependencies
You'll need:
- Ruby
- PostgreSQL
- node
- yarn

(probably also build tools for native extensions, but only worry about this
should installing the dependencies fail)

1. Install Ruby dependencies: `bundle`
2. Install JS dependencies: `yarn`

## Configuration

Generate secret_key, master.key: `bin/rails credentials:edit`, add lockup config as described in config/credentials.yml.example.
Adjust the rest of the config files (particularly config/database.yml, config/storage.yml and config/cable.yml) as needed.

## Development
1. Start the local dev server: `bin/rails s -b 0.0.0.0`
2. Start JS compilation: `yarn build:js --watch`
3. Start CSS compilation: `yarn build:css --watch`
4. (optional) Start the dev console: `bin/rails c`

## Deploy
An example Dockerfile and gitlab ci instructions are provided. We recommend running against postgresql, azure storage and redis
but on a dedicated server sqlite and local storage should be fine.
