class CreateCalculations < ActiveRecord::Migration[6.0]
  def change
    create_table :calculations do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :a, null: false
      t.string :b, null: false

      t.timestamps
    end
  end
end
