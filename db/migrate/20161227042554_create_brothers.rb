class CreateBrothers < ActiveRecord::Migration[5.0]
  def change
    create_table :brothers do |t|
      t.string :first
      t.string :middle
      t.string :last
      t.string :major
      t.string :pledge_class
      t.string :city
      t.string :state
      t.string :phone
      t.string :email

      t.timestamps
    end
  end
end
