const $submitBtn = document.getElementById("submitBtn");
const id = document.querySelector("input[name='post-id']").value;

$submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // update a blogpost
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("body").value.trim();
    // const id = document.getElementById("submitBtn").getAttribute(req.params.id);
    console.log(title, content, id);
    if (title && content) {
        const response = await fetch(`/api/blogposts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to update post");
        }
    }
});