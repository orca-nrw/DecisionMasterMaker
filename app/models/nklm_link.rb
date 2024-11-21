class NklmLink < ApplicationRecord
  before_validation :smart_add_url_protocol
  belongs_to :step, touch: true
  
  after_create_commit do
    broadcast_append_to(step, target: 'nklm-links',
                        partial: 'nklm_links/nklm_link',
                        locals: { nklm_link: self })
    broadcast_replace_to(step, target: step, partial: 'steps/step',
                         locals: { step: step })
  end

  after_update_commit do
    broadcast_replace_to(step, target: self, partial: 'nklm_links/nklm_link',
                         locals: { nklm_link: self })
    broadcast_replace_to(step, target: step, partial: 'steps/step',
                         locals: { step: step })
  end

  after_destroy_commit do
    broadcast_remove_to(step, target: self)
    broadcast_replace_to(step, target: step, partial: 'steps/step',
                         locals: { step: step })
  end

  after_update :touch_step
  after_touch :touch_step

  def touch_step
    step.touch
  end

  protected

  def smart_add_url_protocol
    unless nklm_url[/\Ahttp:\/\//] || nklm_url[/\Ahttps:\/\//]
      self.nklm_url = "https://#{nklm_url}"
    end
  end

end
