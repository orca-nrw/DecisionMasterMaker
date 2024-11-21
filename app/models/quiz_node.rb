class QuizNode < ApplicationRecord
  has_one :step, as: :interactable, inverse_of: :interactable
  has_many :quiz_answers, dependent: :destroy
  has_rich_text :question

  def props
    {
      question: self.question.body,
      answers: self.quiz_answers.map { |a|
        {
          id: a.id,
          text: a.text,
          explanation: a.explanation.body,
          points: a.points
        }
      },
      messages: {
        noAnswersSelected: I18n.t('quizNodeNoneSelected')
      },
      multipleChoice: self.multiple_choice
    }
  end

  def max_score
    scores = self.quiz_answers.map{ |a| a.points }.filter { |p| p != nil }.filter{ |a| a >= 0 }
    return self.multiple_choice ? scores.reduce(:+) : scores.max
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
