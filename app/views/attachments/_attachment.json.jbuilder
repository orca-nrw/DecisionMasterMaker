json.cache! [attachment, attachment.updated_at] do
  json.extract! attachment, :title
  json.body attachment.content.body
  json.files attachment.files do |file|
    json.filename file.blob.filename
    json.url rails_blob_path(file, disposition: "attachment")
  end
end
