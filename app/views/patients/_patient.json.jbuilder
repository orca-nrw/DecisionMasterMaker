json.cache! [patient, patient.updated_at] do
  json.extract! patient, :id, :title, :skip
  json.gender patient.graphic_prefix
  json.maxScore patient.max_score
  json.attachments do
    json.array! patient.attachments, partial: 'attachments/attachment', as: :attachment
  end
  json.steps do
    json.array! patient.steps, partial: 'steps/step', as: :step
  end
end
