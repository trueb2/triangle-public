# Triangle's Website

The website consists of a Ruby on Rails backend and an Ember.js frontend.

### Dev dependecies that I used
* ruby - 2.3.1
* rails - 5.0.1
* node - 6.3.1
* npm - 3.10.3
* bower - 1.8.0
* ember - 2.10.0
* imagemagik - 6.9.1 (for paperclip)
* postgresql - 9.5.3 (for pg gem) (I used http://postgresapp.com)

### Preparing the Rails backend
* `bundle install`
* `rails db:create db:migrate db:seed`

### Preparing the Ember frontend
* `cd frontend`
* `npm install`
* `bower install`

### Running the app
* `rails s`
* go to localhost:3000 to see the ember app
* go to localhost:3000/api/[something from the routes.rb file] to see the api

### Testing
Needs work. (Highest Priority for future work)

### Deployment
* `rails g ember:heroku`
* verify that package.json has bower as a depedency and not a devDependency
* `git add . && git commit -m 'heroku release'`
* `git push heroku master`
* If the db needs to be wiped use, `heroku pg:reset --confirm [app name goes here]`
* `heroku run rails db:migrate`
* If the db needs to be reseeded use, `heroku run rails db:seed`
