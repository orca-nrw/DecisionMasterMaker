require "test_helper"

class QuizNodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @quiz_node = quiz_nodes(:one)
  end

  test "should get index" do
    get quiz_nodes_url
    assert_response :success
  end

  test "should get new" do
    get new_quiz_node_url
    assert_response :success
  end

  test "should create quiz_node" do
    assert_difference("QuizNode.count") do
      post quiz_nodes_url, params: { quiz_node: {  } }
    end

    assert_redirected_to quiz_node_url(QuizNode.last)
  end

  test "should show quiz_node" do
    get quiz_node_url(@quiz_node)
    assert_response :success
  end

  test "should get edit" do
    get edit_quiz_node_url(@quiz_node)
    assert_response :success
  end

  test "should update quiz_node" do
    patch quiz_node_url(@quiz_node), params: { quiz_node: {  } }
    assert_redirected_to quiz_node_url(@quiz_node)
  end

  test "should destroy quiz_node" do
    assert_difference("QuizNode.count", -1) do
      delete quiz_node_url(@quiz_node)
    end

    assert_redirected_to quiz_nodes_url
  end
end
