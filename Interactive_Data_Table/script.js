// Sample data
const data = [
	{ id: 1, name: "John", age: 30, country: "USA" },
	{ id: 2, name: "Emma", age: 25, country: "Canada" },
	{ id: 3, name: "James", age: 35, country: "UK" },
	// Add more data as needed
  ];
  
  const tableBody = document.getElementById("dataBody");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
  
  let currentPage = 1;
  const rowsPerPage = 5;
  
  // Render table rows
  function renderTable(page) {
	tableBody.innerHTML = "";
	const startIndex = (page - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const paginatedData = data.slice(startIndex, endIndex);
  
	paginatedData.forEach(item => {
	  const row = document.createElement("tr");
	  row.innerHTML = `
		<td>${item.id}</td>
		<td>${item.name}</td>
		<td>${item.age}</td>
		<td>${item.country}</td>
	  `;
	  tableBody.appendChild(row);
	});
  }
  
  // Render pagination buttons
  function renderPagination() {
	pagination.innerHTML = "";
	const totalPages = Math.ceil(data.length / rowsPerPage);
  
	for (let i = 1; i <= totalPages; i++) {
	  const button = document.createElement("button");
	  button.innerText = i;
	  button.addEventListener("click", () => {
		currentPage = i;
		renderTable(currentPage);
	  });
	  pagination.appendChild(button);
	}
  }
  
  // Sort table by column index
  function sortTable(colIndex) {
	data.sort((a, b) => {
	  const valA = a[Object.keys(a)[colIndex]];
	  const valB = b[Object.keys(b)[colIndex]];
	  if (typeof valA === "string") {
		return valA.localeCompare(valB);
	  } else {
		return valA - valB;
	  }
	});
	renderTable(currentPage);
  }
  
  // Filter table based on search input
  searchInput.addEventListener("input", () => {
	const searchText = searchInput.value.toLowerCase();
	const filteredData = data.filter(item => {
	  return Object.values(item).some(val => {
		return val.toString().toLowerCase().includes(searchText);
	  });
	});
	renderTable(1);
	renderPagination();
  });
  
  // Initial rendering
  renderTable(currentPage);
  renderPagination();
  