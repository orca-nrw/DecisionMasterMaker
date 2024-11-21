require "test_helper"

class BodyExaminationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @body_examination = body_examinations(:one)
  end

  test "should get index" do
    get body_examinations_url
    assert_response :success
  end

  test "should get new" do
    get new_body_examination_url
    assert_response :success
  end

  test "should create body_examination" do
    assert_difference("BodyExamination.count") do
      post body_examinations_url, params: { body_examination: {  } }
    end

    assert_redirected_to body_examination_url(BodyExamination.last)
  end

  test "should show body_examination" do
    get body_examination_url(@body_examination)
    assert_response :success
  end

  test "should get edit" do
    get edit_body_examination_url(@body_examination)
    assert_response :success
  end

  test "should update body_examination" do
    patch body_examination_url(@body_examination), params: { body_examination: {  } }
    assert_redirected_to body_examination_url(@body_examination)
  end

  test "should destroy body_examination" do
    assert_difference("BodyExamination.count", -1) do
      delete body_examination_url(@body_examination)
    end

    assert_redirected_to body_examinations_url
  end
end
