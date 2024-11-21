class BodyExamination < ApplicationRecord
  belongs_to :body_node
  has_rich_text :results
  has_rich_text :results_comment
  has_rich_text :examination_type_comment

  enum examination_type: %i[
    auscultation complex inspection light_reaction meningitis otoscopy palpation
    percussion smell
  ]

  enum location: %i[
    after ears eyes fingers genital head heart lungs miscellaneous mouth
    pulse throat visceral_abdominal
  ]

  after_create_commit do
    broadcast_replace_to(
      body_node.step,
      target: 'body-examinations',
      partial: 'body_examinations/index',
      locals: {
        body_examinations: body_node.body_examinations
      }
    )
    broadcast_replace_to(
      body_node.step,
      target: body_node,
      partial: 'steps/step',
      locals: {
        step: body_node.step
      }
    )
  end

  after_update_commit do
    broadcast_replace_to(
      body_node.step,
      target: 'body-examinations',
      partial: 'body_examinations/index',
      locals: {
        body_examinations: body_node.body_examinations
      }
    )
    broadcast_replace_to(
      body_node.step,
      target: body_node,
      partial: 'steps/step',
      locals: {
        step: body_node.step
      }
    )
  end

  after_destroy_commit do
    broadcast_replace_to(
      body_node.step,
      target: 'body-examinations',
      partial: 'body_examinations/index',
      locals: {
        body_examinations: body_node.body_examinations
      }
    )
    broadcast_replace_to(
      body_node.step,
      target: body_node,
      partial: 'steps/step',
      locals: {
        step: body_node.step
      }
    )
  end

  after_update :touch_body_node
  after_touch :touch_body_node

  def touch_body_node
    body_node.touch
  end
end
