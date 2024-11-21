class Patient < ApplicationRecord
  extend ActiveModel::Callbacks

  has_many :steps, -> { order(position: :asc) }, dependent: :destroy
  has_many :attachments, as: :attachable

  has_and_belongs_to_many :content_bundles

  accepts_nested_attributes_for :attachments

  validates :title, presence: true

  after_create_commit do
    broadcast_append_to('patients', target: 'patients', partial: 'patients/patient', locals: { patient: self })
  end

  after_update_commit do
    broadcast_replace_to('patients', target: self, partial: 'patients/patient', locals: { patient: self })
  end

  after_destroy_commit do
    broadcast_remove_to('patients', target: self)
  end

  enum status: %i[todo doing done]
  enum gender: %i[boy girl]

  after_commit on: :update do
    broadcast_replace_to self
  end

  def graphic_prefix
    {boy: 'b', girl: 'g'}[gender.to_sym]
  end

  def max_score
    steps.map { |step| step.max_score }.reduce(:+) || 0
  end

  after_update :touch_content_bundles
  after_touch :touch_content_bundles

  def touch_content_bundles
    content_bundles.each(&:touch)
  end
end
