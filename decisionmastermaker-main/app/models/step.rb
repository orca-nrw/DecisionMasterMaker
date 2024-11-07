class Step < ApplicationRecord
  belongs_to :patient
  belongs_to :interactable, polymorphic: true, optional: true
  acts_as_list scope: :patient
  has_many :nklm_links
  has_many :attachments, as: :attachable

  enum status: %i[todo doing done]

  accepts_nested_attributes_for :interactable

  after_create_commit do
    broadcast_append_to(patient, target: 'steps', partial: 'patients/step', locals: { step: self })
  end

  after_update_commit do
    broadcast_replace_to(patient, target: 'steps', partial: 'patients/steps', locals: { patient: self.patient })
  end

  after_destroy_commit do
    broadcast_remove_to(patient, target: self)
  end

  before_destroy :obliterate_interactable
  after_destroy :touch_patient
  after_update :touch_patient
  after_touch :touch_patient

  def self.node_types
    %w[TextVideoNode FuseNode QuizNode BodyNode StepwiseDiagnosticNode SelfEvaluationNode]
  end
  
  def max_score
    interactable ? interactable.max_score || 0 : 0
  end

  private

  def obliterate_interactable
    interactable&.destroy
  end

  def touch_patient
    patient.touch
  end
end
