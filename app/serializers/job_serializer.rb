class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :email, :execb
  belongs_to :semester
  belongs_to :brother
end
