defmodule BackendWeb.CategoryController do
  use BackendWeb, :controller
  alias Backend.Categories

  def index(conn, _params) do
    conn
    |> put_status(:ok)
    |> render("index.json", categories: Categories.all())
  end

  def create(conn, %{"category" => category}) do
    {:ok, category} = Categories.create(category)

    conn
    |> put_status(:created)
    |> put_resp_header("location", Routes.category_path(conn, :show, category))
    |> render("show.json", category: category)
  end

  def show(conn, %{"id" => id}) do
    render(conn, "show.json", category: Categories.show(id))
  end
end
