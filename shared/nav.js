function renderNav(activePage) {
  const nav = document.getElementById('nav-container');

  if (!nav) {
    return;
  }

  nav.innerHTML = `
    <nav class="bg-white border-b border-gray-200 px-4 py-3">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <div class="font-semibold text-gray-800">
          Feedback Dashboard
        </div>

        <div class="flex gap-4">
          <a 
            href="/index.html" 
            class="${activePage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600"
          >
            Home
          </a>

          <a 
            href="/pages/submit.html" 
            class="${activePage === 'submit' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600"
          >
            Submit
          </a>

          <a
            href="/pages/admin.html"
            class="${activePage === 'admin' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600"
          >
            Admin
          </a>

          <a
            href="/pages/dashboard.html"
            class="${activePage === 'dashboard' ? 'text-blue-600 font-semibold' : 'text-gray-700'} hover:text-blue-600"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  `;
}