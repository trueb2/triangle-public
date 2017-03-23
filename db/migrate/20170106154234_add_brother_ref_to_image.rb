class AddBrotherRefToImage < ActiveRecord::Migration[5.0]
  def change
    add_reference :images, :brother, foreign_key: true
  end
end
