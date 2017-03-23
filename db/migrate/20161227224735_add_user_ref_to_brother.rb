class AddUserRefToBrother < ActiveRecord::Migration[5.0]
  def change
    add_reference :brothers, :user, foreign_key: true
  end
end
