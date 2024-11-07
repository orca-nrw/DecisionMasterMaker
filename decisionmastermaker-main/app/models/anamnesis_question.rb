class AnamnesisQuestion < ApplicationRecord
  belongs_to :fuse_node
  validates :question, presence: true
  validates :answer, presence: true
  validates :reasoning, presence: true
  validates :tags, presence: true

  def formatted_tags
    tags.split(',').map(&:strip)
  end

  after_create_commit do
    broadcast_append_to(fuse_node.step, target: 'anamnesis-questions', partial: 'anamnesis_questions/anamnesis_question',
                                   locals: { anamnesis_question: self })
    broadcast_replace_to(fuse_node.step, target: fuse_node, partial: 'steps/step', locals: { step: fuse_node.step })
  end

  after_update_commit do
    broadcast_replace_to(fuse_node.step, target: self, partial: 'anamnesis_questions/anamnesis_question',
                                    locals: { anamnesis_question: self })
    broadcast_replace_to(fuse_node.step, target: fuse_node, partial: 'steps/step', locals: { step: fuse_node.step })
  end

  after_destroy_commit do
    broadcast_remove_to(fuse_node.step, target: self)
    broadcast_replace_to(fuse_node.step, target: fuse_node, partial: 'steps/step', locals: { step: fuse_node.step })
  end

  after_update :touch_fuse_node
  after_touch :touch_fuse_node

  def touch_fuse_node
    fuse_node.touch
  end
end
