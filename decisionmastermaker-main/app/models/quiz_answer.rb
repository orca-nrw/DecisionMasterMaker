class QuizAnswer < ApplicationRecord
  belongs_to :quiz_node
  has_rich_text :explanation

  after_create_commit do
    broadcast_append_to(quiz_node.step, target: 'quiz-answers', partial: 'quiz_answers/quiz_answer',
                                   locals: { quiz_answer: self })
    broadcast_replace_to(quiz_node.step, target: quiz_node, partial: 'steps/step', locals: { step: quiz_node.step })
  end

  after_update_commit do
    broadcast_replace_to(quiz_node.step, target: self, partial: 'quiz_answers/quiz_answer',
                                    locals: { quiz_answer: self })
    broadcast_replace_to(quiz_node.step, target: quiz_node, partial: 'steps/step', locals: { step: quiz_node.step })
  end

  after_destroy_commit do
    broadcast_remove_to(quiz_node.step, target: self)
    broadcast_replace_to(quiz_node.step, target: quiz_node, partial: 'steps/step', locals: { step: quiz_node.step })
  end

  after_update :touch_quiz_node
  after_touch :touch_quiz_node

  def touch_quiz_node
    quiz_node.touch
  end
end
