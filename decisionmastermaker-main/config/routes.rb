Rails.application.routes.draw do
  mount Lockup::Engine, at: '/lockup'
  resources :content_bundles
  resources :self_evaluation_nodes
  resources :stepwise_diagnostic_nodes do
    resources :diagnostic_types, only: %i[create new]
  end
  resources :diagnostic_types, only: %i[index show edit update destroy]

  resources :body_examinations
  resources :quiz_answers
  resources :quiz_nodes do
    resources :quiz_answers, only: %i[create index new]
  end
  resources :quiz_answers, only: %i[show edit update destroy]

  resources :anamnesis_questions
  resources :fuse_nodes
  resources :nklm_links

  resources :attachments
  resources :patients do
    get 'preview', on: :member
    resources :steps, only: %i[create]
  end
  resources :steps, only: %i[show edit update destroy] do
    resources :nklm_links, only: %i[create index new]
  end
  get '/steps/:id/lower', to: 'steps#lower', as: :step_lower
  get '/steps/:id/higher', to: 'steps#higher', as: :step_higher
  resources :nklm_links, only: %i[show edit update destroy]

  resources :text_video_nodes

  resources :fuse_nodes do
    resources :anamnesis_questions, only: %i[create index new]
  end
  resources :anamnesis_questions, only: %i[show edit update destroy]

  resources :body_nodes do
    resources :body_examinations, only: %i[create index new]
  end
  resources :body_examinations, only: %i[show edit update destroy]

  root 'pages#index'
  get '/components', to: 'pages#components'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
