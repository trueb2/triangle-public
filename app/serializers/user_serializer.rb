class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :authentication_token, :approved, :role_name
end
