const $title = document.getElementById("title");
const $body = document.getElementById("body");
const $submitBtn = document.getElementById("submitBtn");
const $editBtn = document.getElementById("editBtn");
const $deleteBtn = document.getElementById("deleteBtn");

$submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const title = $title.value.trim();
  const content = $body.value.trim();

  if (title && content) {
    const response = await fetch("/api/blogposts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
});


const editBtns = document.querySelectorAll('.editBtn');
editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const id = editBtn.getAttribute('data-id');
    window.location.href = `/edit/${id}`;
  });
});

const deleteBtns = document.querySelectorAll('.deleteBtn');
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = deleteBtn.getAttribute('data-id');
    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    }
  });
});