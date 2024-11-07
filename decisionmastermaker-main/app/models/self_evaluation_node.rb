class SelfEvaluationNode < ApplicationRecord
  belongs_to :step
  has_rich_text :prompt
  has_rich_text :sampleSolution

  def props
    {
      prompt: prompt.body,
      score: score,
      solution: sampleSolution.body
    }
  end

  def max_score
    score || 0
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
