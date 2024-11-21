json.cache! [content_bundle, content_bundle.updated_at] do
  json.extract! content_bundle, :title, :contact, :tutorial_id
  json.patients do |p|
    json.array! content_bundle.patients.order(:title), partial: 'patients/patient', as: :patient
  end
end
