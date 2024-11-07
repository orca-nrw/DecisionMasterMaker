class DiagnosticType < ApplicationRecord
  belongs_to :stepwise_diagnostic_node
  has_rich_text :result
  has_many :attachments, as: :attachable

  after_create_commit do
    broadcast_append_to(stepwise_diagnostic_node.step,
                        target: 'diagnostic-types',
                        partial: 'diagnostic_types/diagnostic_type',
                        locals: { diagnostic_type: self })
    broadcast_replace_to(stepwise_diagnostic_node.step,
                         target: stepwise_diagnostic_node,
                         partial: 'steps/step',
                         locals: { step: stepwise_diagnostic_node.step })
  end

  after_update_commit do
    broadcast_replace_to(stepwise_diagnostic_node.step,
                         target: self,
                         partial: 'diagnostic_types/diagnostic_type',
                         locals: { diagnostic_type: self })
    broadcast_replace_to(stepwise_diagnostic_node.step,
                         target: stepwise_diagnostic_node,
                         partial: 'steps/step',
                         locals: { step: stepwise_diagnostic_node.step })
  end

  after_destroy_commit do
    broadcast_remove_to(stepwise_diagnostic_node.step, target: self)
    broadcast_replace_to(stepwise_diagnostic_node.step,
                         target: stepwise_diagnostic_node,
                         partial: 'steps/step',
                         locals: { step: stepwise_diagnostic_node.step })
  end

  after_update :touch_stepwise_diagnostic_node
  after_touch :touch_stepwise_diagnostic_node

  def touch_stepwise_diagnostic_node
    stepwise_diagnostic_node.touch
  end
end
