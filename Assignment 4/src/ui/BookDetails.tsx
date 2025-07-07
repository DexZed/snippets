import { Link, useParams } from "react-router";
import { useGetSingleBookQuery } from "../services/books";
import type { ApiSingleBookResponse } from "../utils/Customtypes";

type Props = {};

function BookDetails({}: Props) {
  const { id } = useParams<{ id: string }>();
  const { data: response } = useGetSingleBookQuery(id!, {
    skip: !id,
  }) as unknown as {
    data: ApiSingleBookResponse;
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="card w-96 bg-base-100 shadow-sm outline-2 outline-blue-500/50">
          <div className="card-body">
            <span>
              {response?.data?.available ? (
                <div className="badge badge-xs badge-soft badge-accent">
                  Available
                </div>
              ) : (
                <div className="badge badge-xs badge-soft badge-secondary">
                  Unavailable
                </div>
              )}
            </span>

            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">{response?.data?.title}</h2>
              <span>{response?.data?.available ? <><span className="text-md place-self-center">
                Copies: {response?.data?.copies}
              </span></>:<><span className="text-md place-self-center">
                Copies: N/A
              </span></>}</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                <span>
                  {" "}
                  <em>{response?.data?.author}</em>
                </span>
              </li>
              <li>
                <span className="badge badge-xs badge-secondary badge-outline">
                  {response?.data?.genre}
                </span>
              </li>
              <li>
                <span className="text-xl font-light">
                  Description: {response?.data?.description}
                </span>
              </li>
              <li>
                <span className="text-sm font-light">
                  ISBN: {response?.data?.isbn}
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to={"/"} className="btn btn-primary btn-block">Go Back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
