class SemesterSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :brothers
  has_many :events
end
