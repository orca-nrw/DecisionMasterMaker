# this view helper wraps around the stimulus wrapper for embedding react
# components
module ReactComponentsHelper
  def component(name, props = {})
    data = {
      controller: 'react',
      react_component_value: name,
      react_props_value: props
    }
    content_tag :div, nil, class: %w[h-full], data: data
  end
end
