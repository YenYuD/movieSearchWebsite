export async function getComments(movieID: number) {
    const res = await fetch("http://localhost:3000/api/comments/" + movieID, {
        method: "GET",
    });
    const data = await res.json();

    return data;
}
