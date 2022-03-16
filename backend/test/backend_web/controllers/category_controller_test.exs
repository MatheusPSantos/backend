defmodule BackendWeb.CategoryControllerTest do
  use BackendWeb.ConnCase

  describe "list" do
    test "list all categories", %{conn: conn} do
      conn = get(conn, Routes.category_path(conn, :index))

      assert json_response(conn, 200) == [
               %{
                 id: 123,
                 name: "some_name_1",
                 description: "some_description_1"
               },
               %{
                 id: 1234,
                 name: "some_name_2",
                 description: "some_description_2"
               }
             ]
    end
  end
end
