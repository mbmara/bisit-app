require 'test_helper'

class Api::V1::UserControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_user_index_url
    assert_response :success
  end

end
