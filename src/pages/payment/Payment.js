import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Button from "../../components/ui/Button";
import DownloadButton from "../../components/ui/DownloadButton";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <p>Payment gateway only applicable for Production build.</p>
        <Link to="/">
          <Button variant="primary"
          className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </Button>
        </Link>
        <DownloadButton />
      </div>
    </div>
  );
};

export default Payment;
