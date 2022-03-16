defmodule Backend.Categories.Category do
  use Ecto.Schema
  import Ecto.Changeset
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreing_key_type :binary_id
end
