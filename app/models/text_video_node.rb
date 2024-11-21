class TextVideoNode < ApplicationRecord
  has_one :step, as: :interactable, inverse_of: :interactable
  has_rich_text :content

  def props
    {
      content: content.body,
      video: video
    }
  end

  def max_score
    0
  end

  after_update_commit do
    broadcast_replace_to(step, target: self, partial: 'steps/step', locals: { step: step })
  end

  after_update :touch_step
  after_touch :touch_step

  def touch_step
    step.touch
  end
end
