import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';




const ApproveDecorator = () => {
    const axiosSecure = useAxiosSecure()
      const { data: decorators = [], refetch  } = useQuery({
    queryKey: ["decorator", "panding"],
    queryFn: async () => {
      const res = await axiosSecure.get('/decorators');
      return res.data;
    },
  });

  const updateDecoratorStatus = (decorator,status) =>{
    const updateInfo = {
      status:status,
      email:decorator.email
    }
    axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo)
    .then(res =>{
      if(res.data.modifiedCount){
        refetch()
         Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });

      }
    })
  
}

  const handleApprove  = (decorator) =>{
    updateDecoratorStatus(decorator,'approve')

  }
  const handleReject = (decorator) =>{
    updateDecoratorStatus(decorator,'rejected')
  }

    return (
         <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Decorator Applications
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Experience</th>
              
              <th>Work Status</th>
              <th>Application Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {decorators.map((decorator, index) => (
              <tr key={decorator._id}>
                <td>{index + 1}</td>
                <td>{decorator.name}</td>
                <td>{decorator.email}</td>
                <td>{decorator.experience} yrs</td>
                <td>{decorator.workStatus}</td>

                <td>
                  <span className={`${decorator.status==='approve'? "badge badge-success": 'badge badge-warning'}`}>
                    {decorator.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(decorator)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(decorator)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ApproveDecorator;