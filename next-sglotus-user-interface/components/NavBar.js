import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";
import { IoRestaurant } from "react-icons/io5";
export default function NavBar() {
  const router = useRouter();
  let token = readToken();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    removeToken();
    router.push("/login");
  };
  return (
    <>
      {token ? (
        <>
          <nav className="bg-gradient-to-b from-amber-300">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>

                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>

                    <svg
                      className="hidden h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" passHref legacyBehavior>
                      <button>
                        <IoRestaurant size="2em" />
                      </button>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link href="/registerEmployee" passHref legacyBehavior>
                        <span className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Add Employee
                        </span>
                      </Link>
                      <Link href="/employee" passHref legacyBehavior>
                        <span className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Personal Details
                        </span>
                      </Link>
                      <Link href="/employeeList" passHref legacyBehavior>
                        <span className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          All Employees
                        </span>
                      </Link>
                      <Link href="/biweekly-hours" passHref legacyBehavior>
                        <span className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Hours by Date
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={toggleUserMenu}
                      >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <span className="text-white px-3 py-2 text-xl font-medium bg-amber-500 rounded-md">
                          {token.username}
                        </span>
                      </button>
                    </div>
                    {isUserMenuOpen && (
                      <>
                        <div
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                        >
                          <Link href="/" passHref legacyBehavior>
                            <button
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                              onClick={logout}
                            >
                              Sign out
                            </button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isMobileMenuOpen && (
              <>
                <div className="sm:hidden" id="mobile-menu">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link href="/registerEmployee" passHref legacyBehavior>
                      <span className="block text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Add Employee
                      </span>
                    </Link>
                    <Link href="/employee" passHref legacyBehavior>
                      <span className="block text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Personal Details
                      </span>
                    </Link>
                    <Link href="/employeeList" passHref legacyBehavior>
                      <span className="block text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        All Employees
                      </span>
                    </Link>
                    <Link href="/biweekly-hours" passHref legacyBehavior>
                      <span className="block text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Hours by Date
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </nav>
        </>
      ) : (
        <>
          <nav className="bg-gradient-to-b from-amber-300">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>

                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>

                    <svg
                      className="hidden h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" passHref legacyBehavior>
                      <button>
                        <IoRestaurant size="2em" />
                      </button>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link href="/employee" passHref legacyBehavior>
                        <span className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Personal Details
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-7 sm:pr-0">
                  <div className="relative ml-3">
                    <Link href="/login" passHref legacyBehavior>
                      <button
                        type="button"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Sign in
                      </button>
                    </Link>
                  </div>
                  <div className="relative ml-3">
                    <Link href="/register" passHref legacyBehavior>
                      <button
                        type="button"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        className="text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Sign up
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {isMobileMenuOpen && (
              <>
                <div className="sm:hidden" id="mobile-menu">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link href="/employee" passHref legacyBehavior>
                      <span className="block text-gray-900 hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Personal Details
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </nav>
        </>
      )}
    </>
  );
}
