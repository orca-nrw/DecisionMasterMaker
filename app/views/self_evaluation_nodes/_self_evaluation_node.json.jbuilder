json.extract! self_evaluation_node, :id, :step_id, :prompt, :sampleSolution, :score, :created_at, :updated_at
json.url self_evaluation_node_url(self_evaluation_node, format: :json)
json.prompt self_evaluation_node.prompt.to_s
json.sampleSolution self_evaluation_node.sampleSolution.to_s
