class CreateAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table :attachments do |t|
      t.string :title
      t.references :attachable, polymorphic: true

      t.timestamps
    end
  end
end
