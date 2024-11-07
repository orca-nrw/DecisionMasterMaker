class Attachment < ApplicationRecord
  has_rich_text :content
  has_many_attached :files

  belongs_to :attachable, polymorphic: true

  after_create_commit do
    broadcast_append_to(attachable, target: 'attachments', partial: 'attachments/attachment', locals: { attachment: self })
  end

  after_update_commit do
    broadcast_replace_to(attachable, target: self, partial: 'attachments/attachment', locals: { attachment: self })
  end

  after_destroy_commit do
    broadcast_remove_to(attachable, target: self)
  end

  after_update :touch_attachable
  after_touch :touch_attachable

  def touch_attachable
    attachable.touch
  end
end
