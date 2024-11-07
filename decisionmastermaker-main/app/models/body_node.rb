class BodyNode < ApplicationRecord
  belongs_to :step
  has_many :body_examinations, dependent: :destroy

  def props
    {
      model: ActionController::Base.helpers.asset_path('female_base_mesh'),
      location_labels: BodyExamination.locations.keys.map { |l| {
        location: l,
        location_label: I18n.t(l)
      }},
      examination_type_labels: BodyExamination.examination_types.keys.map { |x| {
        examination_type: x,
        examination_type_label: I18n.t(x)
      }},
      examinations: self.body_examinations.map { |q|
        {
          id: q.id,
          location: q.location,
          location_details: q.location_details,
          examination_type: q.examination_type,
          examination_type_details: q.examination_type_details,
          examination_type_comment: q.examination_type_comment.body,
          results: q.results.body,
          results_comment: q.results_comment.body,
          points: q.points
        }
      },
      messages: {
      },
      tries: tries
    }
  end

  def max_score
    body_examinations.map { |x| x.points }.filter { |p| p != nil }.sort.reverse[0...tries].reduce(:+)
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
