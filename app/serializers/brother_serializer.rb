class BrotherSerializer < ActiveModel::Serializer
  attributes :id, :first, :middle, :last, :major, :pledge_class, :city, :state, :phone, :email
  has_many :semesters
  has_many :jobs
end
