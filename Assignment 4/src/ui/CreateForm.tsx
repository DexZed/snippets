
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateBookForm } from "../features/bookUISlice";
import { useCreateBookMutation } from "../services/books";
import type { BookForm } from "../utils/Customtypes";
import Error from "./Error";
import { showErrorAlert, showSuccessAlert } from "../utils/utilityFunctions";

type Props = {
};

function CreateForm({}: Props) {
  const selector = useAppSelector((state) => state.bookUi.form);
  const dispatch = useAppDispatch();
  const [createBook, { error }] = useCreateBookMutation();
  const navigate = useNavigate();
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.target;
    dispatch(
      updateBookForm({
        field: name as keyof BookForm,
        value:
          type === "number"
            ? Number(value)
            : type === "checkbox"
            ? checked
            : value,
      })
    );
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
     await createBook(selector).unwrap();
     showSuccessAlert("Success", "Book created successfully!");
      navigate("/");
    } catch (err) {
      showErrorAlert("Error", "Failed to create the book.");
      console.error("Error occurred in creation:", err);
    }
  }

  return (
    <>
      {error ? (
        <>
          <Error></Error>
        </>
      ) : (
        <>
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold m-5">Add Book</h1>
                <blockquote className="text-lg italic text-gray-500">
                  The First Cause of Absurd Conclusions I Ascribe to the Want of
                  Method
                </blockquote>
                <figcaption className="mt-3 text-right text-sm text-gray-500">
                  — Thomas Hobbes, <cite className="italic">Leviathan</cite>
                </figcaption>
              </div>
              <form
                onSubmit={handleSubmit}
                className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
              >
                <div className="card-body">
                  <fieldset className="fieldset">
                    <label className="label">Title</label>
                    <input
                      onChange={handleInputChange}
                      name="title"
                      type="text"
                      className="input"
                      placeholder="Beyond Good and Evil"
                      required
                    />

                    <label className="label">Author</label>
                    <input
                      onChange={handleInputChange}
                      name="author"
                      type="text"
                      className="input"
                      placeholder="Friedrich Nietzsche"
                      required
                    />

                    <label className="label">Genre</label>
                    <input
                      onChange={handleInputChange}
                      name="genre"
                      type="text"
                      className="input"
                      placeholder="Philosophy"
                      required
                    />

                    <label className="label">ISBN</label>
                    <input
                      onChange={handleInputChange}
                      name="isbn"
                      type="text"
                      className="input"
                      placeholder="9780306000000"
                      required
                      pattern="[0-9]{13}"
                      title="ISBN must be 13 digits"
                      maxLength={13}
                      minLength={10}
                    />

                    <label className="label">Description</label>
                    <input
                      onChange={handleInputChange}
                      name="description"
                      type="text"
                      className="input"
                      placeholder=" A philosophical novel that explores the nature of truth and morality"
                      required
                    />

                    <label className="label">Copies</label>
                    <input
                      onChange={handleInputChange}
                      name="copies"
                      type="number"
                      className="input"
                      placeholder="10"
                      required
                      min="1"
                    />
                    <label className="label">Available</label>
                    <input
                      onChange={handleInputChange}
                      name="available"
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-xl"
                    />
                    <button className="btn btn-neutral mt-4" type="submit">
                      Create
                    </button>
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default CreateForm;
