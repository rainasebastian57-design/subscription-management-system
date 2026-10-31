import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl text-center">
        <h1 className="text-2xl font-bold mb-4">Subscription Management System</h1>
        <p className="text-gray-600 mb-6">Select an entry point to continue:</p>
        <div className="flex flex-col gap-3">
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Login Portal
          </Link>
          <Link href="/admin" className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}