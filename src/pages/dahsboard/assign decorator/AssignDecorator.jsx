import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDecorator = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const decoratorModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { data: bookings = [],refetch:bookingRefetch } = useQuery({
    queryKey: ["bookings", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?deliveryStatus=pending-pickup`,
      );
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators", "available"],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators?status=approve&workStatus=available`,
      );

      return res.data;
    },
  });
  console.log(decorators);
  const OpenAssignModalRef = (booking) => {
    setSelectedBooking(booking);
    decoratorModalRef.current.showModal();
  };

  const handleAssignDecorator = (decorator) => {
    const decoratorAssignInfo = {
      decoratorId: decorator._id,
      decoratorName: decorator.name,
      decoratorEmail: decorator.email,
      bookingId: selectedBooking._id,
    };
    axiosSecure
      .patch(`/bookings/${selectedBooking._id}`, decoratorAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          bookingRefetch()
          decoratorModalRef.current.close()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h1>{bookings.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>cost</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{booking.serviceName}</td>
                <td>{booking.cost}</td>
                <td>{booking.createdAt}</td>
                <td>
                  <button
                    onClick={() => OpenAssignModalRef(booking)}
                    className="btn btn-primary text-black"
                  >
                    Assign Decorator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={decoratorModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{decorators.length}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {decorators.map((decorator, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{decorator.displayName}</td>
                    <td>{decorator.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignDecorator(decorator)}
                        className="btn btn-primary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}

                {/* row 2 */}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDecorator;
