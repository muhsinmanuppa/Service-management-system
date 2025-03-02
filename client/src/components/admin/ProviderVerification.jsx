const ProviderVerification = () => {
    const [providers, setProviders] = useState([]);
    
    const handleVerification = async (providerId, status) => {
      try {
        // API call to update verification status
        // Update local state
      } catch (error) {
        console.error('Error updating verification status:', error);
      }
    };
  
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Provider Verification</h2>
        
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service Type</th>
              <th>Documents</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.name}</td>
                <td>{provider.serviceType}</td>
                <td>
                  <Button variant="link">View Documents</Button>
                </td>
                <td>{provider.verificationStatus}</td>
                <td className="space-x-2">
                  <Button
                    variant="success"
                    onClick={() => handleVerification(provider.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleVerification(provider.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  export default ProviderVerification;