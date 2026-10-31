import './globals.css';

export const metadata = {
  title: 'Brightloop Billing',
  description:
    'Plans, subscriptions, invoices and payments for Brightloop Software, in one place.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 antialiased">
        {children}
      </body>
    </html>
  );
}