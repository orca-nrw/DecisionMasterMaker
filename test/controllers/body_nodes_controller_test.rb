require "test_helper"

class BodyNodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @body_node = body_nodes(:one)
  end

  test "should get index" do
    get body_nodes_url
    assert_response :success
  end

  test "should get new" do
    get new_body_node_url
    assert_response :success
  end

  test "should create body_node" do
    assert_difference("BodyNode.count") do
      post body_nodes_url, params: { body_node: {  } }
    end

    assert_redirected_to body_node_url(BodyNode.last)
  end

  test "should show body_node" do
    get body_node_url(@body_node)
    assert_response :success
  end

  test "should get edit" do
    get edit_body_node_url(@body_node)
    assert_response :success
  end

  test "should update body_node" do
    patch body_node_url(@body_node), params: { body_node: {  } }
    assert_redirected_to body_node_url(@body_node)
  end

  test "should destroy body_node" do
    assert_difference("BodyNode.count", -1) do
      delete body_node_url(@body_node)
    end

    assert_redirected_to body_nodes_url
  end
end
