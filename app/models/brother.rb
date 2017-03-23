class Brother < ApplicationRecord
  has_and_belongs_to_many :semesters
  has_many :jobs
  has_one :image
  belongs_to :user, optional: true
end
