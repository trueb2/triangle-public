class CensoredBrotherSerializer < ActiveModel::Serializer
  attributes :id, :first, :last
  has_many :semesters
  has_many :jobs
end
