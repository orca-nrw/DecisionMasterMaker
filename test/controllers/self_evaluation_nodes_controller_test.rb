require "test_helper"

class SelfEvaluationNodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @self_evaluation_node = self_evaluation_nodes(:one)
  end

  test "should get index" do
    get self_evaluation_nodes_url
    assert_response :success
  end

  test "should get new" do
    get new_self_evaluation_node_url
    assert_response :success
  end

  test "should create self_evaluation_node" do
    assert_difference("SelfEvaluationNode.count") do
      post self_evaluation_nodes_url, params: { self_evaluation_node: { score: @self_evaluation_node.score, step_id: @self_evaluation_node.step_id } }
    end

    assert_redirected_to self_evaluation_node_url(SelfEvaluationNode.last)
  end

  test "should show self_evaluation_node" do
    get self_evaluation_node_url(@self_evaluation_node)
    assert_response :success
  end

  test "should get edit" do
    get edit_self_evaluation_node_url(@self_evaluation_node)
    assert_response :success
  end

  test "should update self_evaluation_node" do
    patch self_evaluation_node_url(@self_evaluation_node), params: { self_evaluation_node: { score: @self_evaluation_node.score, step_id: @self_evaluation_node.step_id } }
    assert_redirected_to self_evaluation_node_url(@self_evaluation_node)
  end

  test "should destroy self_evaluation_node" do
    assert_difference("SelfEvaluationNode.count", -1) do
      delete self_evaluation_node_url(@self_evaluation_node)
    end

    assert_redirected_to self_evaluation_nodes_url
  end
end
