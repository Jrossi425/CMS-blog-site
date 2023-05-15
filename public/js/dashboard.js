const $title = document.getElementById("title");
const $body = document.getElementById("body");
const $submitBtn = document.getElementById("submitBtn");

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
