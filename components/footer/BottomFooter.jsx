import React from 'react';
import Link from 'next/link';
import footerData from '../../data/footer.json';

const BottomFooter = () => {
  const privacyPolicy = footerData?.bottomFooter?.privacyPolicy;
  const terms = footerData?.bottomFooter?.terms;
  return (
    <div className="w-full bg-white py-4 border-t border-gray-200">
      <div className="w-full flex flex-col items-center justify-center gap-4 text-sm text-[#18004b]">
        <div className="flex flex-col md:flex-row items-center gap-2">
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

        {/* Owntechnologies Watermark */}
        <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
          <span className="text-xs font-medium">Crafted with ❤️ by</span>
          <Link
            href="https://owntechnologies.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1F5FFF] hover:text-[#04CE78] transition-colors duration-300 hover:underline text-sm"
          >
            Owntechnologies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;