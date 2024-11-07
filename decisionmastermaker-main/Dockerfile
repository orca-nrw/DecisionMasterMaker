FROM ruby:3.1.1

ARG RAILS_MASTER_KEY

# get node 14 LTS and yarn
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
    imagemagick \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN npm install -g yarn@1

RUN mkdir /app
WORKDIR /app

ENV RAILS_ENV=production
ENV NODE_ENV=production

COPY Gemfile* package.json yarn.lock ./
RUN bundle install
RUN yarn install

COPY . /app

RUN bundle exec rails assets:precompile
RUN yarn build

EXPOSE 3000

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
