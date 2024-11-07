class AddTriesToFuseNodes < ActiveRecord::Migration[7.0]
  def change
    add_column :fuse_nodes, :tries, :integer, default: 5
  end
end
