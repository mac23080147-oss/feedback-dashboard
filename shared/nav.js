// Renders the shared top navigation bar into #nav-container.
// `active` is 'submit' or 'admin' and highlights the matching link.
function renderNav(active) {
  const links = [
    { id: 'submit', href: 'submit.html', label: 'Submit Feedback' },
    { id: 'admin', href: 'admin.html', label: 'Admin View' },
  ];

  const linksHtml = links
    .map((link) => {
      const classes =
        link.id === active
          ? 'text-blue-600 font-semibold'
          : 'text-gray-600 hover:text-blue-600';
      return `<a href="${link.href}" class="text-sm ${classes}">${link.label}</a>`;
    })
    .join('');

  const container = document.getElementById('nav-container');
  container.innerHTML = `
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-3xl mx-auto px-4 py-3 flex items-center gap-6">
        <span class="font-semibold text-gray-800">Feedback Dashboard</span>
        ${linksHtml}
      </div>
    </nav>
  `;
}
