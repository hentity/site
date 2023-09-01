export default function Navbar() {
  return (
    <>
      <nav class="flex px-4 border-b items-center relative">
        <div class="text-lg font-bold md:py-0 py-4">Logo</div>
        <ul class="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
          <li>
            <a
              href="#"
              class="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span>Products</span>
            </a>
          </li>
          <li class="relative parent">
            <a
              href="#"
              class="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-50 space-x-2"
            >
              <span>Service</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span>About us</span>
            </a>
          </li>
        </ul>
        <div class="ml-auto md:hidden text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
      </nav>
    </>
  );
}
