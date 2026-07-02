import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-100 py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Behind Payal Fabrics
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Payal Ladies Tailor
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Gulshan Tailor
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Payal Tailor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Created By
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link
                  href="https://github.com/sumit-77-dev"
                  className="hover:text-white transition"
                >
                  Sumit Gola
                </Link>
              </li>

              <li>
                <Link
                  href="https://github.com/RajendraKumar08"
                  className="hover:text-white transition"
                >
                  Rajendra Kumar
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-5 text-center text-slate-400 text-sm">
          © 2026 Payal Fabrics. All rights reserved.
        </div>
      </footer>
    )


}

export default Footer;