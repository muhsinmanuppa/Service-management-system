import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@mui/material'; // Ensure correct imports
import { useAuth } from '@/hooks/useAuth'; // Ensure correct path
import { useServices } from '@/hooks/useServices'; // Ensure correct path

const Requests = () => {
  const { user } = useAuth();
  const { fetchServices } = useServices();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('pending'); // pending, accepted, rejected

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchServices({ status: filter });
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    loadRequests();
  }, [filter, fetchServices]);

  const handleRequestAction = async (requestId, status) => {
    try {
      // API call to update request status
      const response = await updateRequestStatus(requestId, status);
      // Update local state
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status } : req
      ));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Service Requests</h1>

      <div className="flex gap-4 mb-6">
        <Button
          variant={filter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'accepted' ? 'contained' : 'outlined'}
          onClick={() => setFilter('accepted')}
        >
          Accepted
        </Button>
        <Button
          variant={filter === 'rejected' ? 'contained' : 'outlined'}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </Button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{request.serviceName}</h3>
                <p className="text-gray-600">Client: {request.clientName}</p>
                <p className="text-sm text-gray-600">
                  Requested for: {request.scheduledDate}
                </p>
              </div>
              <div className="space-x-2">
                {request.status === 'pending' && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => handleRequestAction(request.id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleRequestAction(request.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {request.status !== 'pending' && (
                  <Badge>{request.status}</Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Requests;