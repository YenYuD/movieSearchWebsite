export async function getComments(movieID: number) {
    const res = await fetch("/api/comments/" + movieID, {
        method: "GET",
    });
    const data = await res.json();

    return data;
}
