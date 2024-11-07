module PagesHelper
    def proseify(&block)
        words = capture(&block).strip.split(' ')
        raw(words.slice(..-2).join(' ') + '&nbsp;' + words.last)
    end
end
