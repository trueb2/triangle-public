class ImageSerializer < ActiveModel::Serializer
  attributes :id, :path, :image_purpose
  belongs_to :brother
  belongs_to :event
end
