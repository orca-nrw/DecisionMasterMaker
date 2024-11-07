class ContentBundle < ApplicationRecord
  has_and_belongs_to_many :patients
  has_one :tutorial, class_name: 'Patient', :foreign_key => 'tutorial_id'
  validates :title, presence: true
  validates :contact, presence: true
end
