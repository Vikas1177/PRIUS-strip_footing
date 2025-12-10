export default function OutputCard({ output }) {
  const renderContent = () => {
    if (output === null) {
      return <p className="text-gray-500 text-sm">No calculation yet.</p>;
    }

    if (typeof output === 'number') {
      return (
        <div className="bg-white p-3 rounded shadow-sm">
          <p className="text-sm text-gray-500">Required Width (B)</p>
          <div className="text-xl font-bold text-blue-600">
            {output.toFixed(3)} m
          </div>
        </div>
      );
    }

    return (
      <div className="bg-red-50 p-3 rounded border border-red-100 text-red-600 text-sm font-medium">
        {output}
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h4 className="font-semibold mb-2">Output</h4>
      {renderContent()}
    </div>
  );
}