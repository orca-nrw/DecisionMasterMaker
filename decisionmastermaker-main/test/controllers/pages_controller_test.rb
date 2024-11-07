require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_path
    assert_response :success
  end
  test "should get component overview" do
    get components_url
    assert_response :success
  end
end
