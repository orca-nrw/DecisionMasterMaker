class PagesController < ApplicationController
  def index
  end
  def components
    @breadcrumbs = [
      { text: 'Komponentenübersicht', url: components_path }
    ]
  end
end
