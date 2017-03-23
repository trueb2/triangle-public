class CreateBrothersSemesters < ActiveRecord::Migration[5.0]
  def change
    create_table :brothers_semesters do |t|
      t.references :brother, foreign_key: true
      t.references :semester, foreign_key: true
    end
  end
end
