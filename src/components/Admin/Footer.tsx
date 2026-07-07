export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Background diubah jadi transparan/blend dengan body, text-center
    <footer className="py-6 px-6 lg:px-8 text-center bg-[#F1EFE7] mt-auto">
      <p className="text-xs font-semibold text-[#B08D63]">
        &copy; {currentYear} A.M.Y. All rights reserved.
      </p>
    </footer>
  );
}