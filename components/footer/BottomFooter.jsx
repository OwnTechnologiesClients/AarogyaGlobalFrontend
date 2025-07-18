import React from 'react';
import Link from 'next/link';
import footerData from '../../data/footer.json';

const BottomFooter = () => {
  const privacyPolicy = footerData?.bottomFooter?.privacyPolicy;
  const terms = footerData?.bottomFooter?.terms;
  return (
    <div className="w-full bg-white py-4 border-t border-gray-200">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-[#18004b]">
        {privacyPolicy && (
          <Link href={privacyPolicy} className="hover:underline">Privacy Policy</Link>
        )}
        {privacyPolicy && terms && (
          <span className="mx-2 text-lg text-blue-600">•</span>
        )}
        {terms && (
          <Link href={terms} className="hover:underline">Terms & Conditions</Link>
        )}
      </div>
    </div>
  );
};

export default BottomFooter;