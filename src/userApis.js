export function fetchUser() {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: [{ name: "Rahul Parikh", hobbies: [{ passion: "High", title: "React Test", date: "2018-09-09" }] }] }), 1000)
    );
}
