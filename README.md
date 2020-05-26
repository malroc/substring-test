# Finding non-continuous substring

Both front-end and back-end apps are located in the same repo.

The app is expected to work on Mac OS X and Linux, not tested on Windows.

## Local environment setup

1. Clone this repo: `git clone git@github.com:malroc/substring-test.git`

2. Go to the repo dir `cd substring-test`

3. Make sure that you are running a PostgreSQL server

4. Edit `config/database.yml` if needed (unnecessary in most cases, should normally work out-of-the-box)

5. Setup dev/test database: `rails db:{create,migrate}`

## Running server

1. Execute `rails s`

2. Go to http://localhost:3000 in browser window

## Running tests

1. Execute `rspec`

## Hosted version

A working version of the app is hosted on Heroku: http://substring-test.herokuapp.com/

Please note that it may take 30 seconds before it loads which is a limitation of a free Heroku plan.
