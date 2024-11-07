json.cache! [step, step.updated_at] do
  json.extract! step, :interactable_type, :casefile, :objective
  json.attachments do
    json.array! step.attachments, partial: 'attachments/attachment', as: :attachment
  end
  json.nklm_links do
    json.array! step.nklm_links, partial: 'nklm_links/nklm_link', as: :nklm_link
  end
  json.title step.problem
  json.params step.interactable.props
end
