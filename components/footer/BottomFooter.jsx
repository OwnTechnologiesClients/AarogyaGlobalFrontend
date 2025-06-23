import React from 'react';
import Link from 'next/link';
import footerData from '../../data/footer.json';

const BottomFooter = () => {
  return (
    <div className="w-full bg-white py-4 border-t border-gray-200">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-[#18004b]">
        <Link href={footerData.bottomFooter.privacyPolicy} className="hover:underline">Privacy Policy</Link>
        <span className="mx-2 text-lg text-blue-600">•</span>
        <Link href={footerData.bottomFooter.terms} className="hover:underline">Terms & Conditions</Link>
      </div>
    </div>
  );
};

export default BottomFooter;