require "test_helper"

class FuseNodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fuse_node = fuse_nodes(:one)
  end

  test "should get index" do
    get fuse_nodes_url
    assert_response :success
  end

  test "should get new" do
    get new_fuse_node_url
    assert_response :success
  end

  test "should create fuse_node" do
    assert_difference("FuseNode.count") do
      post fuse_nodes_url, params: { fuse_node: {  } }
    end

    assert_redirected_to fuse_node_url(FuseNode.last)
  end

  test "should show fuse_node" do
    get fuse_node_url(@fuse_node)
    assert_response :success
  end

  test "should get edit" do
    get edit_fuse_node_url(@fuse_node)
    assert_response :success
  end

  test "should update fuse_node" do
    patch fuse_node_url(@fuse_node), params: { fuse_node: {  } }
    assert_redirected_to fuse_node_url(@fuse_node)
  end

  test "should destroy fuse_node" do
    assert_difference("FuseNode.count", -1) do
      delete fuse_node_url(@fuse_node)
    end

    assert_redirected_to fuse_nodes_url
  end
end
