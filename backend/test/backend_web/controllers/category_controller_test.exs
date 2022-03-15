defmodule BackendWeb.CategoryControllerTest do
  use BackendWeb.ConnCase

  describe "list" do
    test "list all categories", %{conn: conn} do
      conn = get(conn, "/api/categories")
      assert json_response(conn, 200) == %{"hi" => "hello"}
    end
  end
end
