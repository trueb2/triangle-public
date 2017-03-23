class AddImagePurposeToImage < ActiveRecord::Migration[5.0]
  def change
    add_column :images, :image_purpose, :integer
  end
end
