class Semester < ApplicationRecord
  has_and_belongs_to_many :brothers
  has_and_belongs_to_many :events
  has_many :jobs
end
