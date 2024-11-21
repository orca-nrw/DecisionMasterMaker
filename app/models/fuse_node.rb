class FuseNode < ApplicationRecord
  has_one :step, as: :interactable, inverse_of: :interactable
  has_many :anamnesis_questions, dependent: :destroy

  def props
    {
      caption: self.question || 'Stellen Sie eine Frage',
      content: self.anamnesis_questions.map { |q|
        {
          id: q.id,
          frage: q.question,
          antwort: q.answer,
          grund: q.reasoning,
          tags: q.tags,
          punkte: q.points
        }
      },
      messages: {
        history: 'Gestellte Fragen',
        repeat: 'Diese Frage wurde bereits gewählt'
      },
      number: tries
    }
  end
  
  def max_score
    anamnesis_questions.map { |q| q.points }.filter { |p| p != nil }.sort.reverse[0...tries].reduce(:+)
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
