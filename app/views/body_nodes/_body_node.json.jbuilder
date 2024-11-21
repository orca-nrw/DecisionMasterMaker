json.extract! body_node, :id, :created_at, :updated_at
json.url body_node_url(body_node, format: :json)
