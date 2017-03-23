class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|
      t.references :brother, foreign_key: true
      t.references :semester, foreign_key: true
      t.string :title
      t.string :email
      t.integer :execb

      t.timestamps
    end
  end
end
