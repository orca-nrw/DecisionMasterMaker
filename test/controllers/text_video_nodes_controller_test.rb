require "test_helper"

class TextVideoNodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @text_video_node = text_video_nodes(:one)
  end

  test "should get index" do
    get text_video_nodes_url
    assert_response :success
  end

  test "should get new" do
    get new_text_video_node_url
    assert_response :success
  end

  test "should create text_video_node" do
    assert_difference("TextVideoNode.count") do
      post text_video_nodes_url, params: { text_video_node: {  } }
    end

    assert_redirected_to text_video_node_url(TextVideoNode.last)
  end

  test "should show text_video_node" do
    get text_video_node_url(@text_video_node)
    assert_response :success
  end

  test "should get edit" do
    get edit_text_video_node_url(@text_video_node)
    assert_response :success
  end

  test "should update text_video_node" do
    patch text_video_node_url(@text_video_node), params: { text_video_node: {  } }
    assert_redirected_to text_video_node_url(@text_video_node)
  end

  test "should destroy text_video_node" do
    assert_difference("TextVideoNode.count", -1) do
      delete text_video_node_url(@text_video_node)
    end

    assert_redirected_to text_video_nodes_url
  end
end
