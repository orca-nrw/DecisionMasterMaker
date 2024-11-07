require "test_helper"

class QuizAnswersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @quiz_answer = quiz_answers(:one)
  end

  test "should get index" do
    get quiz_answers_url
    assert_response :success
  end

  test "should get new" do
    get new_quiz_answer_url
    assert_response :success
  end

  test "should create quiz_answer" do
    assert_difference("QuizAnswer.count") do
      post quiz_answers_url, params: { quiz_answer: {  } }
    end

    assert_redirected_to quiz_answer_url(QuizAnswer.last)
  end

  test "should show quiz_answer" do
    get quiz_answer_url(@quiz_answer)
    assert_response :success
  end

  test "should get edit" do
    get edit_quiz_answer_url(@quiz_answer)
    assert_response :success
  end

  test "should update quiz_answer" do
    patch quiz_answer_url(@quiz_answer), params: { quiz_answer: {  } }
    assert_redirected_to quiz_answer_url(@quiz_answer)
  end

  test "should destroy quiz_answer" do
    assert_difference("QuizAnswer.count", -1) do
      delete quiz_answer_url(@quiz_answer)
    end

    assert_redirected_to quiz_answers_url
  end
end
