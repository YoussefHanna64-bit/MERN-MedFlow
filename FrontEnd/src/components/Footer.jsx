import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
	return (
		<>
			<footer className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 min-h-113.5 sm:pb-10 bg-primary">
				<div className="lg:col-span-1 p-24">
					<img src="./Healthcare-Logo-variant.svg" alt="healthcare-logo" />
					<p className="text-white p-5">
						Copyright © 2026 BRIX Templates | All Rights Reserved
					</p>
				</div>
				<div className="grid lg:grid-cols-4 md:grid-cols-2 pt-28 lg:col-span-2 sm:col-span-1 sm:justify-center text-white">
					<div>
						<p className="text-xl font-bold">Product</p>
						<div className="grid grid-rows-5 gap-3 pt-10">
                            <p>Features</p>
                            <p>Pricing</p>
                            <p>Case Studies</p>
                            <p>Reviews</p>
                            <p>Updates</p>
                        </div>
					</div>
					<div className="md:pt-0 sm:pt-10">
						<p className="text-xl font-bold">Company</p>
                        <div className="grid grid-rows-5 gap-3 pt-10">
                            <p>About</p>
                            <p>Contuct Us</p>
                            <p>Careers</p>
                            <p>Culture</p>
                            <p>Blogs</p>
                        </div>
					</div>
					<div className="lg:pt-0 sm:pt-10">
						<p className="text-xl font-bold">Support</p>
                        <div className="grid grid-rows-5 gap-3 pt-10">
                            <p>Getting started</p>
                            <p>Help center</p>
                            <p>Server status</p>
                            <p>Report a bug</p>
                            <p>Chat support</p>
                        </div>
					</div>
					<div className="lg:pt-0 sm:pt-10">
						<p className="text-xl font-bold">Follow Us</p>
                        <div className="grid grid-rows-5 gap-3 pt-10">
                            <div className="flex gap-2 items-center"><FaSquareFacebook size={16}/><p>Facebook</p></div>
                            <div className="flex gap-2 items-center"><FaSquareXTwitter size={16}/><p>Twitter</p></div>
                            <div className="flex gap-2 items-center"><FaInstagram size={16}/><p>Instagram</p></div>
                            <div className="flex gap-2 items-center"><FaLinkedin size={16}/><p>LinkedIn</p></div>
                            <div className="flex gap-2 items-center"><FaYoutube size={16}/><p>Youtube</p></div>
                        </div>
					</div>
				</div>
			</footer>
		</>
	);
}
