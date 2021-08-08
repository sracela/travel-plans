import React from "react";
import { useField } from "../../hooks";

const TripForm = ({ submit, defaultValues }) => {
  const { reset: resetDestination, ...destination } = useField(
    "text",
    defaultValues.destination
  );
  const { reset: resetStartDate, ...startDate } = useField(
    "text",
    defaultValues.startDate
  );
  const { reset: resetEndDate, ...endDate } = useField(
    "text",
    defaultValues.endDate
  );
  const { reset: resetComment, ...comment } = useField(
    "text",
    defaultValues.comment
  );

  const handleReset = () =>
    resetDestination(resetStartDate(resetEndDate(resetComment())));

  const onSubmit = (event) => {
    event.preventDefault();
    const tripObject = {
      destination: destination.value,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      comment: comment.value,
      createdBy: 1,
    };
    submit(tripObject);
    handleReset();
  };

    // useEffect(() => {
  //   handleReset();
  // }, [handleReset]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Destination: <input {...destination} />
        </div>
        <div>
          Start Date: <input {...startDate} />
        </div>
        <div>
          End Date: <input {...endDate} />
        </div>
        <div>
          Comment: <input {...comment} />
        </div>
        <button type="submit">SAVE</button>
      </form>
      <br />
    </div>
  );
};

export default TripForm;
