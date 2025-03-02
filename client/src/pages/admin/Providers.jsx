import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, verified, pending

  const handleVerification = async (providerId, status) => {
    try {
      // API call to update verification status
      await updateProviderVerification(providerId, status);
      // Update local state
      setProviders(providers.map(provider =>
        provider.id === providerId ? { ...provider, verificationStatus: status } : provider
      ));
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Service Providers</h1>

      <div className="flex gap-4 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Providers
        </Button>
        <Button
          variant={filter === 'verified' ? 'default' : 'outline'}
          onClick={() => setFilter('verified')}
        >
          Verified
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Pending Verification
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Services</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.services.length} services</td>
              <td>{new Date(provider.joinedDate).toLocaleDateString()}</td>
              <td>
                <Badge variant={provider.verificationStatus === 'verified' ? 'success' : 'warning'}>
                  {provider.verificationStatus}
                </Badge>
              </td>
              <td className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProvider(provider);
                    setIsDialogOpen(true);
                  }}
                >
                  View Details
                </Button>
                {provider.verificationStatus === 'pending' && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleVerification(provider.id, 'verified')}
                    >
                      Verify
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleVerification(provider.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Provider Details</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Personal Information</h3>
                <p>Name: {selectedProvider.name}</p>
                <p>Email: {selectedProvider.email}</p>
                <p>Phone: {selectedProvider.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Services Offered</h3>
                <ul className="list-disc pl-4">
                  {selectedProvider.services.map(service => (
                    <li key={service.id}>{service.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Verification Documents</h3>
                {/* Document preview/download links */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Providers;
