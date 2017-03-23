class RemoveUserForeignKeyFromImages < ActiveRecord::Migration[5.0]
  def change
    remove_column :images, :user_id
  end
end
