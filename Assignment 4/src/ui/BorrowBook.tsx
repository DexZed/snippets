import { useNavigate, useParams } from "react-router";
import {
  bookApi,
  useCreateBorrowMutation,
  useGetSingleBookQuery,
} from "../services/books";
import type { ApiSingleBookResponse, Borrow } from "../utils/Customtypes";
import { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../utils/utilityFunctions";
import { useAppDispatch } from "../app/hooks";

type Props = {};

function BorrowBook({}: Props) {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [borrowField, setBorrowField] = useState<Borrow>({
    book: "",
    quantity: 0,
    dueDate: "",
  });
  const [borrow] = useCreateBorrowMutation();
  const { data: response } = useGetSingleBookQuery(id!, {
    skip: !id,
  }) as unknown as {
    data: ApiSingleBookResponse;
  };
  const navigator = useNavigate();
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    
    setBorrowField((prev) => ({
      ...prev,
      book:id!,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //console.log(borrowField);
    
    try {
      if (response?.data?.copies <  borrowField.quantity) {
      showErrorAlert("Error", "Quantity exceeds available copies.")
      return;
    }
        borrow(borrowField).unwrap();
      showSuccessAlert("Success", "Book borrowed successfully!");
      dispatch(bookApi.util.invalidateTags(["Borrow"]));
      navigator("/borrow-summary");
    } catch (error) {
        console.error("Borrow failed:",error);
      showErrorAlert("Error", "Failed to borrow the book.");
    }
  }

  return (
    <>
      
      <div className="hero bg-base-200 min-h-screen">
        <form onSubmit={handleSubmit} className="w-[400px]" action="">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <div className="text-center text-3xl font-bold m-5">
                Borrow: <em>{response?.data?.title}</em>
              </div>
              <fieldset className="fieldset">
                <label className="label">Quantity</label>
                
                <input
                  onChange={handleInputChange}
                  name="quantity"
                  type="number"
                  className="input"
                  placeholder="10"
                  min="1"
                />
                <label className="label">Due Date</label>
                <input
                  onChange={handleInputChange}
                  name="dueDate"
                  type="date"
                  className="input"
                  placeholder=""
                  min={new Date().toISOString().split("T")[0]}
                />

                <button
                  className="btn btn-outline btn-accent mt-4"
                  type="submit"
                  disabled={!response?.data?.available}
                >
                  Borrow
                </button>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BorrowBook;
