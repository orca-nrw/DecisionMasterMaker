class StepwiseDiagnosticNode < ApplicationRecord
  has_one :step, as: :interactable, inverse_of: :interactable
  has_many :diagnostic_types, dependent: :destroy

  def props
    {
      prompt: self.prompt,
      button_prompt: self.button_prompt,
      step_count: self.step_count,
      types: self.diagnostic_types.order(:title).map { |t|
        {
          id: t.id,
          title: t.title,
          result: t.result.to_s,
          score: t.points
        }
      }
    }
  end

  def max_score
    scores = self.diagnostic_types
               .map { |type| type.points.filter { |p| p != nil }.max } # map diagnostic types to their highest score
               .filter { |score| score != nil } # filter out types that don't have a score
               .filter { |score| score > 0 } # filter out types that are strictly incorrect
               .reduce(:+) # add up collected highest scores
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
