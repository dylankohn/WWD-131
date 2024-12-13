document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("resumeData"));

    if (data) {
        // Populate header
        document.getElementById("name").textContent = data.name;
        document.getElementById("contact-info").innerHTML = `
            Mobile: ${data.phone} | <a href="mailto:${data.email}">${data.email}</a>`;
        document.getElementById("linkedin").innerHTML = `
            <a href="${data.linkedin}" target="_blank">${data.linkedin}</a>`;

        // Populate summary
        document.getElementById("summary").innerHTML = `<p>${data.summary}</p>`;

        // Populate skills
        const skillsList = data.skills.split(",").map(skill => `<li>${skill.trim()}</li>`).join("");
        document.getElementById("skills").innerHTML = `<ul>${skillsList}</ul>`;

        // Handle education
        if (data.education && data.education.length > 0) {
            const educationContent = data.education.map(entry => {
                return `<h3>${entry[0]}</h3><ul>${entry.slice(1).map(line => `<li>${line}</li>`).join("")}</ul>`;
            }).join("");
            document.getElementById("education").innerHTML = educationContent;
        } else {
            document.getElementById("education").innerHTML = "<p>No education details provided.</p>";
        }

        // Handle work experience
        if (data.experience && data.experience.length > 0) {
            const experienceContent = data.experience.map(entry => {
                return `<h3>${entry[0]}</h3><ul>${entry.slice(1).map(line => `<li>${line}</li>`).join("")}</ul>`;
            }).join("");
            document.getElementById("experience").innerHTML = experienceContent;
        } else {
            document.getElementById("experience").innerHTML = "<p>No work experience provided.</p>";
        }

        // Handle volunteer work
        if (data.volunteer && data.volunteer.length > 0) {
            const volunteerContent = data.volunteer.map(entry => {
                return `<h3>${entry[0]}</h3><ul>${entry.slice(1).map(line => `<li>${line}</li>`).join("")}</ul>`;
            }).join("");
            document.getElementById("volunteer").innerHTML = volunteerContent;
        } else {
            document.getElementById("volunteer").innerHTML = "<p>No volunteer work provided.</p>";
        }
    }

    // Enable drag-and-drop for the sections
    const sections = document.getElementById("sections");
    new Sortable(sections, {
        animation: 150, // Smooth drag animation
        handle: '.section', // Make each section draggable
        onEnd: (evt) => {
            console.log(`Moved item from index ${evt.oldIndex} to index ${evt.newIndex}`);
        }
    });
});
