require "test_helper"

class AnamnesisQuestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @anamnesis_question = anamnesis_questions(:one)
  end

  test "should get index" do
    get anamnesis_questions_url
    assert_response :success
  end

  test "should get new" do
    get new_anamnesis_question_url
    assert_response :success
  end

  test "should create anamnesis_question" do
    assert_difference("AnamnesisQuestion.count") do
      post anamnesis_questions_url, params: { anamnesis_question: {  } }
    end

    assert_redirected_to anamnesis_question_url(AnamnesisQuestion.last)
  end

  test "should show anamnesis_question" do
    get anamnesis_question_url(@anamnesis_question)
    assert_response :success
  end

  test "should get edit" do
    get edit_anamnesis_question_url(@anamnesis_question)
    assert_response :success
  end

  test "should update anamnesis_question" do
    patch anamnesis_question_url(@anamnesis_question), params: { anamnesis_question: {  } }
    assert_redirected_to anamnesis_question_url(@anamnesis_question)
  end

  test "should destroy anamnesis_question" do
    assert_difference("AnamnesisQuestion.count", -1) do
      delete anamnesis_question_url(@anamnesis_question)
    end

    assert_redirected_to anamnesis_questions_url
  end
end
