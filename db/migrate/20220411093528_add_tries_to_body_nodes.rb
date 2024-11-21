class AddTriesToBodyNodes < ActiveRecord::Migration[7.0]
  def change
    add_column :body_nodes, :tries, :integer, default: 5
  end
end
