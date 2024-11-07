class CreateFuseNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :fuse_nodes do |t|
      t.references :step, null: false, foreign_key: true

      t.timestamps
    end
  end
end
