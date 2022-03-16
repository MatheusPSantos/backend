defmodule Backend.Categories.Category do
  use Ecto.Schema
  import Ecto.Changeset

  @field ~w/name description/a
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreing_key_type :binary_id
  schema "categories" do
    field :description, :string
    field :name, :string

    timestamps()
  end

  def changeset(attrs) do
    changeset(%__MODULE__{}, attrs)
  end

  def changeset(module, attrs) do
    module
    |> cast(attrs, @field)
    |> validate_required(@field)
  end
end
